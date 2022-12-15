import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  NavController,
  ModalController,
  LoadingController,
  AlertController,
} from "@ionic/angular";
import { UserService } from "src/app/services/user.service";
import { CommunityService } from "src/app/api/community.service";

@Component({
  selector: "app-post-detail",
  templateUrl: "./post-detail.page.html",
  styleUrls: ["./post-detail.page.scss"],
})
export class PostDetailPage implements OnInit {
  public postId;
  public post;
  public isWriter: boolean = false;
  public commentList = [];
  public comment = "";
  public commentId;

  constructor(
    public activatedRoute: ActivatedRoute,
    public navController: NavController,
    public communityService: CommunityService,
    public userService: UserService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.postId = params.postId;
    });
  }
  async ionViewDidEnter() {
    await this.fetchPostDetail();
    await this.fetchComments();
  }

  async fetchPostDetail() {
    const result = await this.communityService.getPostDetail(this.postId);
    if (result.data.status === "Y") {
      this.post = result.data.postDetail;
    }
    const userInfo = await this.userService.getUser();
    // console.log(this.post, userInfo);
    if (this.post === undefined) {
      this.goBack();
    }
    if (userInfo === null) {
      this.isWriter = false;
      return;
    } else if (this.post.userId === userInfo.id) {
      this.isWriter = true;
    } else {
      this.isWriter = false;
    }
  }

  async fetchComments() {
    const result = await this.communityService.getComments(this.postId);
    // console.log("comment result", result);

    if (result.data.status === "Y") {
      this.commentList = result.data.commentList;
      const userInfo = await this.userService.getUser();

      for (let comment of this.commentList) {
        if (userInfo === null) {
          comment.isWriter = false;
        } else if (comment.userId === userInfo.id) {
          comment.isWriter = true;
        } else {
          comment.isWriter = false;
        }
      }
    }
  }

  async submitComment() {
    // if (this.isEmpty(this.comment)) {
    //   alert("댓글을 입력해주세요");
    //   return;
    // }
    const paramJson = {
      postId: this.postId,
      comment: this.comment,
    };
    const saveCommentResult = await this.communityService.saveNewComment(
      paramJson
    );
    if (saveCommentResult.data.isUserLogin === "N") {
      this.setUserSyncWithServer();
    }
    if (saveCommentResult.data.status === "Y") {
      this.comment = "";
    }
    await this.fetchComments();
  }

  async deletePost() {
    const deleteResult = await this.communityService.deletePost(this.postId);
    // console.log(deleteResult);
    if (deleteResult.data.isUserLogin === "N") {
      this.setUserSyncWithServer();
      return;
    }

    if (deleteResult.data.status === "Y") {
      const alert = await this.alertController.create({
        header: "성공",
        subHeader: "삭제가 완료되었습니다.",
        buttons: ["확인"],
      });
      await alert.present();
      this.goBack();
    } else {
      const alert = await this.alertController.create({
        header: "실패",
        subHeader: "삭제에 실패했습니다.",
        message: "다시 시도해 주세요",
        buttons: ["확인"],
      });
      await alert.present();
    }
  }

  async deleteComment(comment) {
    const deleteResult = await this.communityService.deleteComment(
      this.postId,
      comment["id"]
    );
    // console.log(this.postId, comment["id"]);
    // console.log(deleteResult);
    if (deleteResult.data.isUserLogin === "N") {
      this.setUserSyncWithServer();
      return;
    }

    if (deleteResult.data.status === "Y") {
      const alert = await this.alertController.create({
        header: "성공",
        subHeader: "삭제가 완료되었습니다.",
        buttons: ["확인"],
      });
      await alert.present();
      await this.fetchComments();
    } else {
      const alert = await this.alertController.create({
        header: "실패",
        subHeader: "삭제에 실패했습니다.",
        message: "다시 시도해 주세요",
        buttons: ["확인"],
      });
      await alert.present();
    }
  }

  async setUserSyncWithServer() {
    await this.userService.deleteUser();
    alert("다시 로그인 해 주세요");
  }

  goBack() {
    this.navController.navigateBack("tabs/community");
  }
}
