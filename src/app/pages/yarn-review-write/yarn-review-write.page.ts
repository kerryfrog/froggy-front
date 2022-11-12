import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ModalController,
  LoadingController,
} from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { StarRatingComponent } from "src/app/components/star-rating/star-rating.component";

@Component({
  selector: "app-yarn-review-write",
  templateUrl: "./yarn-review-write.page.html",
  styleUrls: ["./yarn-review-write.page.scss"],
})
export class YarnReviewWritePage implements OnInit {
  public yarnId;
  public rating;
  public yarn: any = {};

  public fontSize: string = "28px";
  public maxRating: number = 5;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public navController: NavController
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.yarn = this.router.getCurrentNavigation().extras.state.yarn;
      }
      this.yarnId = params.yarnId;
    });
  }
  async ionViewDidEnter() {
    // await this.getYarnDetail();
    // await this.getYarnReview();
  }
  goBack() {
    this.navController.navigateBack(`tabs/yarn/${this.yarnId}`);
  }
}
