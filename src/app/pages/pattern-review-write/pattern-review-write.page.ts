import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ModalController,
  LoadingController,
} from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
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
    public patternService: PatternService,
    public userService: UserService
  ) {}

  async saveReview() {
    console.log("this.review is ", this.review);

    const postPatternReviewResult = await this.patternService.postPatternReview(
      {
        data: this.review,
        patternId: this.patternId,
      }
    );
    console.log(postPatternReviewResult);
    if (postPatternReviewResult.data.isUserLogin === "N") {
      this.setUserSyncWithServer();
    }
    if (postPatternReviewResult.data.status === "Y") {
      alert("리뷰 작성 성공!");
    }
  }
  onChangeRating(event) {
    this.review.rating = event;
  }
  onChangeTextarea(event) {
    this.review.contents = event.detail.value;
  }

  async setUserSyncWithServer() {
    await this.userService.deleteUser();
    alert("다시 로그인 해 주세요");
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
