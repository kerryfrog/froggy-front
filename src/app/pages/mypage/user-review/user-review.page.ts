import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ModalController,
  AlertController,
} from "@ionic/angular";

import { PatternService } from "src/app/api/pattern.service";
import { YarnService } from "src/app/api/yarn.service";
@Component({
  selector: "app-user-review",
  templateUrl: "./user-review.page.html",
  styleUrls: ["./user-review.page.scss"],
})
export class UserReviewPage implements OnInit {
  public patternReviewList = [];
  public yarnReviewList = [];

  constructor(
    public navController: NavController,
    public patternService: PatternService,
    public yarnService: YarnService
  ) {}

  ngOnInit() {}

  async ionViewDidEnter() {
    await this.getPatternReview();
    await this.getYarnReview();
  }
  async getPatternReview() {
    const { data } = await this.patternService.getPatternReviewByUser();
    // console.log(data);

    if (data.status === "Y") {
      this.patternReviewList = data.reviewList;
    }
  }

  async getYarnReview() {
    const { data } = await this.yarnService.getYarnReviewByUser();
    // console.log(data);

    if (data.status === "Y") {
      this.yarnReviewList = data.reviewList;
    }
  }

  goBack() {
    this.navController.navigateBack("mypage");
  }
  goPatternDetailPage(review) {
    this.navController.navigateForward(`/pattern/${review.patternId}`);
  }
}
