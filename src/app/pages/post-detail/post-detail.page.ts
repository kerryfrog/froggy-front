import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {
  NavController,
  ModalController,
  LoadingController,
} from "@ionic/angular";

import { CommunityService } from 'src/app/api/community.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
})
export class PostDetailPage implements OnInit {

  public postId;
  public post;

  constructor(
    public activatedRoute: ActivatedRoute,
    public navController: NavController,
    public communityService:CommunityService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.postId = params.postId;
    });    
  }
  async ionViewDidEnter() {
    await this.fetchPostDetail();

  }


  async fetchPostDetail() {
    const result = await this.communityService.getPostDetail(this.postId);
    if (result.data.status === "Y") {
      this.post = result.data.postDetail;
    }

  }

  goBack() {
    this.navController.navigateBack("tabs/community");
  }
}
