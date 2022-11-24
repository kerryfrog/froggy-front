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

  //작성 가능
  public isValidPost: boolean = false;

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

  onChangeContent(event) {
    //editor, html, text, content, delta, oldDelta, source
    this.contents = event.text;
    this.htmlContents = event.html;
    this.isValidPost = this.checkIsValid();
  }

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
  customImageUpload(image: any) {
    // console.log(image);
    /* Here we trigger a click action on the file input field, this will open a file chooser on a client computer */
    this.quillFileRef.nativeElement.click();
  }

  async quillFileSelected(ev: any) {
    /* After the file is selected from the file chooser, we handle the upload process */
    // let inputList = [];
    this.quillFile = ev.target.files[0];
    this.image = ev.target.files[0];
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

  async setUserSyncWithServer() {
    await this.userService.deleteUser();
    alert("다시 로그인 해 주세요");
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
}
