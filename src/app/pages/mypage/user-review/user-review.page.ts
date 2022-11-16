import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ModalController,
  AlertController,
} from "@ionic/angular";

import { PatternService } from "src/app/api/pattern.service";
@Component({
  selector: "app-user-review",
  templateUrl: "./user-review.page.html",
  styleUrls: ["./user-review.page.scss"],
})
export class UserReviewPage implements OnInit {
  public patternReviewList = [];

  constructor(
    public navController: NavController,
    public patternService: PatternService
  ) {}

  ngOnInit() {}

  async ionViewDidEnter() {
    await this.getPatternReview();
  }
  async getPatternReview() {
    const { data } = await this.patternService.getPatternReviewByUser();
    console.log(data);

    if (data.status === "Y") {
      this.patternReviewList = data.reviewList;
    }
  }
  goBack() {
    this.navController.navigateBack("mypage");
  }
  goPatternDetailPage(review) {
    this.navController.navigateForward(`/pattern/${review.patternId}`);
  }
}
