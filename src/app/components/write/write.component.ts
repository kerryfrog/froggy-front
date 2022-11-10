import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NavController, ModalController } from "@ionic/angular";
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

@Component({
  selector: "app-write",
  templateUrl: "./write.component.html",
  styleUrls: ["./write.component.scss"],
})
export class WriteComponent implements OnInit {
  public ionicForm: FormGroup;
  public isSubmitted;
  public contents;
  public title;
  public image;

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
        image: (image) => {
          this.customImageUpload(image);
        },
      },
    },
  };

  constructor(
    public modalController: ModalController,
    public communityService: CommunityService,
    public userService: UserService,
    public imageService: ImageService
  ) {}

  ngOnInit() {}

  myCallback(event) {
    //editor, html, text, content, delta, oldDelta, source
    //console.log("testing", event.text);
    this.contents = event.text;
  }

  // getEditorInstance(editorInstance: any) {
  //   console.log(editorInstance);
  //   let toolbar = editorInstance.getModule("toolbar");
  //   //toolbar.addHandler("image", customImageUpload);
  // }
  getMeEditorInstance(editorInstance: any) {
    this.meQuillRef = editorInstance;
  }
  customImageUpload(image: any) {
    console.log(image);
    /* Here we trigger a click action on the file input field, this will open a file chooser on a client computer */
    this.quillFileRef.nativeElement.click();
  }

  quillFileSelected(ev: any) {
    /* After the file is selected from the file chooser, we handle the upload process */
    const imageData = {
      fileName: undefined,
      fileFormat: undefined,
      fileBlob: undefined,
    };

    this.quillFile = ev.target.files[0];
    this.image = ev.target.files[0];
    console.log(ev.target.files[0]);

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
    await this.imageService.uploadSingleImage(this.image);
    const payload: Post = {
      title: this.title,
      contents: this.contents,
    };

    const savePostResult = await this.communityService.saveNewPost(payload);
    console.log("savePostResult", savePostResult);

    if (savePostResult.data.isUserLogin === "N") {
      this.setUserSyncWithServer();
    }

    if (savePostResult.data.status === "Y") {
      this.goBack();
    }
  }

  async setUserSyncWithServer() {
    await this.userService.deleteUser();
    alert("다시 로그인 해 주세요");
  }

  goBack() {
    this.modalController.dismiss({
      dismissed: false,
    });
  }

  // base64를 blob으로 변경하는 함수
  base64toBlob(dataURI) {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }
}
