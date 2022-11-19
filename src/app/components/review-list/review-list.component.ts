import { Component, OnInit, Input } from "@angular/core";
import {
  NavController,
  ModalController,
  AlertController,
} from "@ionic/angular";
import { UserService } from "src/app/services/user.service";
import { PatternService } from "src/app/api/pattern.service";
import { YarnService } from "src/app/api/yarn.service";
@Component({
  selector: "app-review-list",
  templateUrl: "./review-list.component.html",
  styleUrls: ["./review-list.component.scss"],
})
export class ReviewListComponent implements OnInit {
  @Input() reviewList;
  @Input() isGoDetail: boolean = false;
  halfStar: string = "true";
  iconsArray: number[] = [];
  defaultIcon: string = "star-outline";
  halfIcon: string = "star-half";
  activeIcon: string = "star";

  activeColor: string = "#95c8a5";
  defaultColor: string = "#aaaaaa";
  constructor(
    public navController: NavController,
    public patternService: PatternService,
    public yarnService: YarnService,
    public alertController: AlertController,
    public userService: UserService
  ) {}

  async deleteReview(review) {
    if (review.patternId) {
      const deletePatternReviewResult =
        await this.patternService.deletePatternReview({
          patternId: review.patternId,
        });

      if (deletePatternReviewResult.data.isUserLogin === "N") {
        this.setUserSyncWithServer();
        return;
      }
      if (deletePatternReviewResult.data.status === "N") {
        alert(deletePatternReviewResult.data.reason);
      }
      if (deletePatternReviewResult.data.status === "Y") {
        await this.successAlert();
      }
    } else if (review.yarnId) {
      const deleteYarnReviewResult = await this.yarnService.deleteYarnReview({
        yarnId: review.yarnId,
      });

      if (deleteYarnReviewResult.data.isUserLogin === "N") {
        this.setUserSyncWithServer();
        return;
      }
      if (deleteYarnReviewResult.data.status === "N") {
        alert(deleteYarnReviewResult.data.reason);
      }
      if (deleteYarnReviewResult.data.status === "Y") {
        await this.successAlert();
      }
    }
  }

  async setUserSyncWithServer() {
    await this.userService.deleteUser();
    alert("다시 로그인 해 주세요");
  }
  async successAlert() {
    const alert = await this.alertController.create({
      header: "리뷰 삭제 성공",
      subHeader: "리뷰가 삭제 되었습니다.",
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
      // this.goBack();
    }
  }

  ngOnInit() {
    for (let i = 0; i < 5; i++) {
      this.iconsArray.push(i);
    }
  }
  round(num) {
    return Math.round(num);
  }
  parseFloat(num) {
    return parseFloat(num);
  }
  goDetailPage(review) {
    if (review.patternId) {
      this.navController.navigateForward(`/pattern/${review.patternId}`);
    } else if (review.yarnId) {
      this.navController.navigateForward(`/yarn/${review.yarnId}`);
    }
  }
}
