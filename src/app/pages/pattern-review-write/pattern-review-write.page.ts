import { Component, OnInit } from "@angular/core";
import {
  AlertController,
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
  public rating = 3;
  public certifyImages = [];

  public review: Review = {
    rating: 3,
    contents: "",
  };
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public navController: NavController,
    public alertController: AlertController,
    public patternService: PatternService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.patternId = params.patternId;
    });
  }

  async saveReview() {
    const postPatternReviewResult = await this.patternService.postPatternReview(
      {
        data: this.review,
        patternId: this.patternId,
        images: this.certifyImages,
      }
    );
    if (postPatternReviewResult.data.isUserLogin === "N") {
      this.setUserSyncWithServer();
      return;
    }
    if (postPatternReviewResult.data.status === "N") {
      alert(postPatternReviewResult.data.reason);
    }
    if (postPatternReviewResult.data.status === "Y") {
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
    // console.log(certifyImages);
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
    alert("다시 로그인 해 주세요");
  }

  goBack() {
    this.navController.navigateBack(`pattern/${this.patternId}`);
  }
}
