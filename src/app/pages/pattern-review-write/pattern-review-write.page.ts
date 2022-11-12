import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ModalController,
  LoadingController,
} from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";

import { PatternService } from "src/app/api/pattern.service";
import { Review } from "../../models/server-request";
@Component({
  selector: "app-pattern-review-write",
  templateUrl: "./pattern-review-write.page.html",
  styleUrls: ["./pattern-review-write.page.scss"],
})
export class PatternReviewWritePage implements OnInit {
  public patternId;
  public rating;

  public review: Review = {
    rating: 0,
    contents: "",
  };
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public navController: NavController,
    public patternService: PatternService
  ) {}

  async saveReview() {
    const postPatternReviewResult = await this.patternService.postPatternReview(
      this.review
    );
    console.log(postPatternReviewResult);

    if (postPatternReviewResult.data.status === "Y") {
      alert("리뷰 작성 성공!");
    }
  }
  onChangeTextarea(event) {
    this.review.contents = event.detail.value;
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.patternId = params.patternId;
    });
  }
  goBack() {
    this.navController.navigateBack(`tabs/pattern/${this.patternId}`);
  }
}
