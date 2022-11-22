import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ModalController,
  AlertController,
} from "@ionic/angular";

import { CommunityService } from "src/app/api/community.service";
@Component({
  selector: "app-user-post",
  templateUrl: "./user-post.page.html",
  styleUrls: ["./user-post.page.scss"],
})
export class UserPostPage implements OnInit {
  public userPostList = [];

  constructor(
    public navController: NavController,
    public communityService: CommunityService
  ) {}

  ngOnInit() {}

  async ionViewDidEnter() {
    await this.getUserPosts();
  }
  async getUserPosts() {
    const { data } = await this.communityService.getPostsByUser();
    console.log(data);

    if (data.status === "Y") {
      this.userPostList = data.postList;
    }
  }
  goBack() {
    this.navController.navigateBack("mypage");
  }
  goPostDetailPage(review) {
    // this.navController.navigateForward(`/pattern/${review.patternId}`);
  }
}
