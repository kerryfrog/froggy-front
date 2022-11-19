import { Component, OnInit } from "@angular/core";
import {
  AlertController,
  NavController,
  ModalController,
  LoadingController,
} from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { StarRatingComponent } from "src/app/components/star-rating/star-rating.component";
import { UserService } from "src/app/services/user.service";
import { YarnService } from "src/app/api/yarn.service";
import { Review } from "../../models/server-request";

@Component({
  selector: "app-yarn-review-write",
  templateUrl: "./yarn-review-write.page.html",
  styleUrls: ["./yarn-review-write.page.scss"],
})
export class YarnReviewWritePage implements OnInit {
  public yarnId;
  public rating;
  public yarn: any = {};

  public review: Review = {
    rating: 0,
    contents: "",
  };

  public fontSize: string = "28px";
  public maxRating: number = 5;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public navController: NavController,
    public alertController: AlertController,
    public yarnService: YarnService,
    public userService: UserService
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

  async saveReview() {
    const postYarnReviewResult = await this.yarnService.postYarnReview({
      data: this.review,
      yarnId: this.yarnId,
    });
    if (postYarnReviewResult.data.isUserLogin === "N") {
      this.setUserSyncWithServer();
      return;
    }
    if (postYarnReviewResult.data.status === "N") {
      alert(postYarnReviewResult.data.reason);
    }
    if (postYarnReviewResult.data.status === "Y") {
      await this.successAlert();
    }
  }

  async successAlert() {
    const alert = await this.alertController.create({
      header: "리뷰 작성 완료",
      subHeader: "리뷰가 저장되었습니다.",
      buttons: [
        {
          text: "확인",
          role: "confirm",
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if (role === "confirm") {
      this.goBack();
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

  goBack() {
    this.navController.navigateBack(`tabs/yarn/${this.yarnId}`);
  }
}
