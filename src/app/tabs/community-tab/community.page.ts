import { Component } from "@angular/core";
import { PatternService } from "src/app/api/pattern.service";
import { ModalController, NavController } from "@ionic/angular";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";

import { WriteComponent } from "src/app/components/write/write.component";
import { CommunityService } from "src/app/api/community.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-community",
  templateUrl: "community.page.html",
  styleUrls: ["community.page.scss"],
})
export class CommunityPage {
  public result = "";
  public flag = false;
  public postList;
  public user;
  public categories = ["자유", "정보", "홍보", "노래방"];
  constructor(
    public patternService: PatternService,
    public modalController: ModalController,
    public communityService: CommunityService,
    public navController: NavController,
    public activatedRoute: ActivatedRoute,
    public userService: UserService
  ) {}

  async ngOnInit() {}
  async ionViewDidEnter() {
    await this.getMainPostList();
  }

  async getMainPostList() {
    const result = await this.communityService.getMainPosts();

    if (result.data.status === "Y") {
      this.postList = result.data.postList;
    }
  }
  async getRecommendPatternList() {
    const aiPatternResult = await this.patternService.getAiPattern();

    if (aiPatternResult.data.status === "Y") {
      this.result = aiPatternResult.data.patternList["test"];
      this.flag = true;
    }
  }
  async getPostList(category) {
    const postsByCategory = await this.communityService.getPosts(category);
    if (postsByCategory.data.status === "Y") {
      this.postList = postsByCategory.data.postList;
    }
  }

  async write() {
    const user = await this.userService.getUser();
    if (!user) {
      alert("로그인해주세요");
    } else {
      const modal = await this.modalController.create({
        component: WriteComponent,
        cssClass: "modal-fullscreen",
      });
      await modal.present();

      const { data } = await modal.onDidDismiss();
      if (data.dismissed) {
        await this.getMainPostList();
      }
    }
  }
  async refreshCommunity(event) {
    await this.getMainPostList();
    event.target.disabled = true;
    event.target.complete();
    setTimeout(() => {
      event.target.disabled = false;
    }, 100);
  }

  async getUser() {
    const userInfo = await this.userService.getUser();
    this.user = userInfo;
  }
  goPostDetailPage(postId) {
    // const props: NavigationExtras = {
    //   state: {

    //   },
    // };
    this.navController.navigateForward(`/community/${postId}`);
  }
}
