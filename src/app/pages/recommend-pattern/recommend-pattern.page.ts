import { Component, OnInit } from "@angular/core";
import {
  NavController,
  AlertController,
  ModalController,
  LoadingController,
} from "@ionic/angular";
import { UserService } from "src/app/services/user.service";
import { PatternService } from "src/app/api/pattern.service";
@Component({
  selector: "app-recommend-pattern",
  templateUrl: "./recommend-pattern.page.html",
  styleUrls: ["./recommend-pattern.page.scss"],
})
export class RecommendPatternPage implements OnInit {
  constructor(
    public navController: NavController,
    public patternService: PatternService,
    public userService: UserService,
    public alertController: AlertController
  ) {}
  public user;
  public knitPatternList = [];
  public crochetPatternList = [];
  public difficultyPatternList = [];

  ngOnInit() {}

  async ionViewDidEnter() {
    await this.getUser();
    await this.getRecommendPatterns();
  }

  async getRecommendPatterns() {
    if (this.user.proficiency !== 0) {
      await this.getRecommendPatternByDifficulty();
    }
    if (this.user.crochet === 1) {
      await this.getRecommendPatternByCrochet();
    }
    if (this.user.knitting === 1) {
      await this.getRecommendPatternByKnitting();
    }
  }
  async getRecommendPatternByDifficulty() {
    const patternResult = await this.patternService.getRecommendByDifficulty();
    if (
      patternResult.data.status === "N" &&
      patternResult.data.isUserLogin === "N"
    ) {
      this.setUserSyncWithServer();
    }
    if (patternResult.data.status === "Y") {
      console.log("get by difficulty", patternResult.data);

      this.difficultyPatternList = patternResult.data.patternList.slice(0, 6);
    }
  }

  async getRecommendPatternByCrochet() {
    const patternResult = await this.patternService.getRecommendByCrochet();
    if (
      patternResult.data.status === "N" &&
      patternResult.data.isUserLogin === "N"
    ) {
      this.setUserSyncWithServer();
    }
    if (patternResult.data.status === "Y") {
      this.crochetPatternList = patternResult.data.patternList.slice(0, 6);
    }
  }
  async getRecommendPatternByKnitting() {
    const patternResult = await this.patternService.getRecommendByKnitting();
    if (
      patternResult.data.status === "N" &&
      patternResult.data.isUserLogin === "N"
    ) {
      this.setUserSyncWithServer();
    }
    if (patternResult.data.status === "Y") {
      this.knitPatternList = patternResult.data.patternList.slice(0, 6);
    }
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

  async getUser() {
    const userInfo = await this.userService.getUser();
    console.log(userInfo);

    this.user = userInfo;
  }

  goBack() {
    this.navController.navigateBack("tabs/main");
  }
}
