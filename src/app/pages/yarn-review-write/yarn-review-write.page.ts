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
  public rating = 3;
  public certifyImages = [];

  public review: Review = {
    rating: 3,
    contents: "",
  };

  // public fontSize: string = "28px";
  // public maxRating: number = 5;

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
      images: this.certifyImages,
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

  async certifyImagesChange(certifyImages) {
    console.log(certifyImages);
    this.certifyImages = certifyImages;
  }
  onChangeRating(event) {
    this.review.rating = event;
  }
  onChangeTextarea(event) {
    this.review.contents = event.detail.value;
  }

  async setUserSyncWithServer() {
    await this.userService.deleteUser();
    const alert = await this.alertController.create({
      header: "안내",
      subHeader: "",
      message: "다시 로그인 해주세요",
      buttons: [{ text: "확인" }],
    });
    await alert.present();
    return;
  }

  goBack() {
    this.navController.navigateBack(`tabs/yarn/${this.yarnId}`);
  }
}
