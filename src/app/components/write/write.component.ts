import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  NavController,
  ModalController,
  AlertController,
} from "@ionic/angular";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";

import { Post } from "../../models/server-request";

import { UserService } from "src/app/services/user.service";
import { CommunityService } from "src/app/api/community.service";
import { ImageService } from "src/app/api/image.service";
import { truncate } from "fs";

@Component({
  selector: "app-write",
  templateUrl: "./write.component.html",
  styleUrls: ["./write.component.scss"],
})
export class WriteComponent implements OnInit {
  public ionicForm: FormGroup;
  public isSubmitted;
  public contents = "";
  public htmlContents = "";
  public title = "";
  public category = "";
  public image;
  public imageList = [];

  //tmp
  public isShowFileNames;
  public limitCnt = 10;
  public Images = [];
  public imagesForDisplay = [];
  public limitText = "";
  //작성 가능
  public isValidPost: boolean = false;
  @ViewChild("fileInput", { static: false }) fileInput: any;
  @ViewChild("quillFile") quillFileRef: ElementRef;
  quillFile: any;
  quillEditorRef;
  meQuillRef: any;
  editorModules = {
    toolbar: {
      container: [
        [{ font: [] }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        [{ header: 1 }, { header: 2 }],
        [{ color: [] }, { background: [] }],
        ["link", "image"],
      ],
      handlers: {
        image: async () => {
          const fileInfos = await Promise.all(this.openUserPhotoLibrary());
        },
      },
    },
  };

  constructor(
    public modalController: ModalController,
    public communityService: CommunityService,
    public userService: UserService,
    public imageService: ImageService,
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  onChangeContent(event) {
    //editor, html, text, content, delta, oldDelta, source
    this.contents = event.text;
    this.htmlContents = event.html;
    this.isValidPost = this.checkIsValid();
  }

  // getEditorInstance(editorInstance: any) {
  //   console.log(editorInstance);
  //   let toolbar = editorInstance.getModule("toolbar");
  //   //toolbar.addHandler("image", customImageUpload);
  // }
  onChangeTitle(event) {
    // console.log(event);
    this.title = event.detail.value;
    this.isValidPost = this.checkIsValid();
  }
  onChangeCategory(event) {
    this.category = event.detail.value;
    this.isValidPost = this.checkIsValid();
  }
  getMeEditorInstance(editorInstance: any) {
    // this.meQuillRef = editorInstance;
    this.quillEditorRef = editorInstance;
  }
  // customImageUpload(image: any) {
  //   console.log(image);
  //   /* Here we trigger a click action on the file input field, this will open a file chooser on a client computer */
  //   this.quillFileRef.nativeElement.click();
  // }

  async quillFileSelected(ev: any) {
    /* After the file is selected from the file chooser, we handle the upload process */
    // let inputList = [];
    this.quillFile = ev.target.files[0];
    this.image = ev.target.files[0];
    // this.image["time"] = Date.now();글
    console.log(this.image);

    const imageUploadResult = await this.imageService.uploadSingleImage(
      this.image
    );

    if (imageUploadResult.data.status === "Y") {
      const inputList = imageUploadResult.data.imageUrlList;
      const editor = this.quillEditorRef;
      const range = editor.getSelection();
      editor.insertEmbed(range + 1, "image", inputList[0]);
    } else {
      alert(imageUploadResult.data.reason);
      return;
    }

    //console.log(ev.target.files[0]);

    let imageCount = 0;
    //this.imageList.push(imageUrl);

    // const imageData = {
    //   id:
    //     this.article != null && this.article !== undefined
    //       ? this.article.post_id
    //       : null,
    //   title: this.quillFile.name,
    //   file: this.quillFile,
    // };
    // this.dataService.postImage(imageData).subscribe((response: any) => {
    //   console.log(response);
    //   const filename = response.data.filename;
    //   let range: any;
    //   const img =
    //     '<img class="img-within" src="your_upload_directory_here/' +
    //     filename +
    //     '"></img>';
    //   range = this.meQuillRef.getSelection();
    //   this.meQuillRef.clipboard.dangerouslyPasteHTML(range.index, img);
    // });
  }
  async submitPost() {
    const payload: Post = {
      title: this.title,
      category: this.category,
      contents: this.contents,
      htmlContents: this.htmlContents,
    };

    const savePostResult = await this.communityService.saveNewPost(payload);
    console.log("savePostResult", savePostResult);
    if (savePostResult.data.isUserLogin === "N") {
      this.setUserSyncWithServer();
    }

    if (savePostResult.data.status === "Y") {
      this.goBackWithSuccess();
    }
  }

  /* 이미지 관련 함수 */
  // 이미지 버튼 클릭 핸들러 함수
  setDefault() {
    if (!this.limitCnt) this.limitCnt = 10;
    if (!this.limitText)
      this.limitText = "10개 이상의 사진을 첨부할 수 없습니다.";
    if (!this.isShowFileNames) this.isShowFileNames = false;
  }

  async openUserPhotoLibrary(): Promise<void> {
    this.fileInput.nativeElement.click();
    const fileList = this.fileInput.nativeElement.files;
    await this.getImageWeb(fileList);
    // const imageUploadResult = await this.imageService.uploadSingleImage(
    //   this.image
    // );

    // if (imageUploadResult.data.status === "Y") {
    //   const inputList = imageUploadResult.data.imageUrlList;
    //   const editor = this.quillEditorRef;
    //   const range = editor.getSelection();
    //   editor.insertEmbed(range + 1, "image", inputList[0]);
    // } else {
    //   alert(imageUploadResult.data.reason);
    //   return;
    // }

    // console.log(this.Images);
  }
  async uploadImage(): Promise<void> {
    console.log("promise의 세계");
    return;
    const imageUploadResult = await this.imageService.uploadSingleImage(
      this.image
    );
  }
  insertImageToEditor() {}

  async getImageWeb(files) {
    const fileExtension = /(.*?)\.(webp)$/;
    for (let i = 0; i < files.length; i++) {
      const fileInfo = files.item(i);
      const imageName = fileInfo.name;
      const imageType = fileInfo.type;
      const extension = imageType.split("/")[1];
      if (files.item(i).name.match(fileExtension)) {
        const alert = await this.alertController.create({
          header: "",
          subHeader: "",
          message: ".webp 형식의 이미지 파일은 업로드 할 수 없습니다.",
          buttons: [{ text: "확인" }],
        });
        await alert.present();
        return;
      }

      const reader = new FileReader();

      reader.readAsDataURL(files.item(i));

      reader.onload = async () => {
        const imageData = {
          fileName: undefined,
          fileFormat: undefined,
          fileBlob: undefined,
        };
        const displayImageData = {
          imageName: undefined,
          image: undefined,
        };
        displayImageData.imageName = imageName;
        displayImageData.image = reader.result;
        imageData.fileBlob = fileInfo;
        imageData.fileFormat = extension;
        imageData.fileName = imageName;
        this.Images.push(imageData);
        console.log("end onload");
      };

      reader.onloadend = async () => {
        try {
          alert("image");
          const imageUploadResult =
            await this.imageService.uploadSingleImageFile(this.Images[0]);
        } catch (error) {
          console.log(error);
        }
      };
    }

    this.fileInput.nativeElement.value = "";
  }

  checkIsValid(): boolean {
    const title = this.title.replace(/(\s*)/g, "");
    const category = this.category;
    const contents = this.contents.replace(/(\s*)/g, "");
    if (title.length === 0) {
      return false;
    } else if (category === "") {
      return false;
    } else if (contents.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  // emitImgSrcChange() {
  //   this.imgSrcListChange.emit(this.Images);
  // }

  async setUserSyncWithServer() {
    await this.userService.deleteUser();
    const alert = await this.alertController.create({
      header: "안내",
      subHeader: "",
      message: "다시 로그인 해주세요",
      buttons: [{ text: "확인" }],
    });
    await alert.present();
  }
  goBackWithSuccess() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
  goBack() {
    this.modalController.dismiss({
      dismissed: false,
    });
  }
  b64toBlob = async (b64Data, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });

    return blob;
  };
}
