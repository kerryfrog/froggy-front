import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {
  NavController,
  ModalController,
  LoadingController,
} from "@ionic/angular";

import { UserService } from 'src/app/services/user.service';
import { CommunityService } from 'src/app/api/community.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
})
export class PostDetailPage implements OnInit {

  public postId;
  public post;
  public commentList = [];
  public comment = "";

  constructor(
    public activatedRoute: ActivatedRoute,
    public navController: NavController,
    public communityService: CommunityService,
    public userService: UserService,
  ) { }

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

  }

  async fetchComments() {
    const result = await this.communityService.getComments(this.postId);
    console.log("comment result" , result);
    
    if (result.data.status === 'Y') {
      this.commentList =result.data.commentList;
      console.log(this.commentList);
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
    }
    const saveCommentResult = await this.communityService.saveNewComment(paramJson);
    
    if (saveCommentResult.data.isUserLogin === 'N') {
      this.setUserSyncWithServer()
    }
    if (saveCommentResult.data.status === 'Y') {
      this.comment = "";
    }

    await this.fetchComments();

  }

  async setUserSyncWithServer() {
    await this.userService.deleteUser();
    alert('다시 로그인 해 주세요');
  }


  goBack() {
    this.navController.navigateBack("tabs/community");
  }

}
