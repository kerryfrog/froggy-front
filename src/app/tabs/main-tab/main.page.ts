import { Component } from "@angular/core";

import { DataService } from "src/app/api/data.service";
import { UserService } from "src/app/services/user.service";
import {
  AlertController,
  LoadingController,
  NavController,
} from "@ionic/angular";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";

import { YarnService } from "src/app/api/yarn.service";
import { PatternService } from "src/app/api/pattern.service";
import { CommunityService } from "src/app/api/community.service";

@Component({
  selector: "app-main",
  templateUrl: "main.page.html",
  styleUrls: ["main.page.scss"],
})
export class MainPage {
  public min;
  public max;
  public nowIndex = -1;

  public yarnList = [];
  public patternList = [];
  public postList = [];
  public user;

  //추천 html위한
  public patternList6 = [];
  constructor(
    public dataService: DataService,
    public alertController: AlertController,
    public patternService: PatternService,
    public yarnService: YarnService,
    public navController: NavController,
    public activatedRoute: ActivatedRoute,
    public communityService: CommunityService,
    public userService: UserService
  ) {}

  async ionViewDidEnter() {
    await this.getUser();
    await this.getPostList();
    await this.getPatternPageView();
    await this.getYarnPageView();
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }

  async getRaverlyApi() {
    if (!this.min || !this.max) {
      const alert = await this.alertController.create({
        header: "에러",
        message: "범위를 입력해 주세요",
        buttons: ["확인"],
      });
      await alert.present();
      return;
    }
    const subHeader = `index 가 ${this.min} ~ ${this.max}인 `;
    const message = "api 를 호출하시겠습니까?";
    let flag = false;
    const alert = await this.alertController.create({
      subHeader,
      message,
      buttons: [
        {
          text: "취소",
          handler: async () => {
            this.alertController.dismiss();
          },
        },
        {
          text: "확인",
          handler: async () => {
            await this.getAndFetchYarnData();
            flag = true;
          },
        },
      ],
    });
    await alert.present();
  }

  async getPatternPageView() {
    const { data } = await this.patternService.getRecommendPatternList();
    console.log(data);

    if (data.status === "Y") {
      this.patternList = [...this.patternList, ...data.patternList];
      this.patternList6 = this.patternList.slice(0, 6);
    }
    console.log(this.patternList6);
  }

  async getYarnPageView() {
    const { data } = await this.yarnService.getRecommendYarnList();

    if (data.status === "Y") {
      this.yarnList = [...this.yarnList, ...data.randYarn];
    }
  }

  async getPostList() {
    const result = await this.communityService.getMainPosts();

    if (result.data.status === "Y") {
      this.postList = result.data.postList.slice(0, 2);
    }
  }

  async getAndFetchYarnData() {
    for (let i = this.min; i <= this.max; i++) {
      const response = await this.dataService.getYarnDataFromRaverly(i);
      console.log("for i =", i, response);
      const postResult = await this.dataService.postYarnData(response);

      this.nowIndex = i;
    }
  }

  async goYarnDetailPage(yarn) {
    const props: NavigationExtras = {
      state: {
        yarn,
      },
    };
    this.navController.navigateForward(`/tabs/yarn/${yarn.id}`, props);
  }
  async goPatternDetailPage(pattern) {
    const props: NavigationExtras = {
      state: {
        pattern,
      },
    };
    this.navController.navigateForward(`/tabs/pattern/${pattern.id}`, props);
  }
  enrollFavoriteYarn(e, yarn) {
    e.stopPropagation();
    let yarnResult = this.yarnList.filter((ya) => ya.id === yarn.id)[0];
    if (yarnResult["isFavorite"]) {
      yarnResult["isFavorite"] = false;
    } else {
      yarnResult["isFavorite"] = true;
    }
    console.log(yarnResult);
  }

  async enrollFavoritePattern(e, pattern) {
    e.stopPropagation();
    let patternResult = this.patternList.filter(
      (pa) => pa.id === pattern.id
    )[0];

    if (patternResult["isFavorite"]) {
      this.fetchEnrollFavoritePattern(pattern.id);
      patternResult["isFavorite"] = false;
    } else {
      this.fetchEnrollFavoritePattern(pattern.id);
      patternResult["isFavorite"] = true;
    }
    console.log(patternResult);
  }

  fetchEnrollFavoritePattern(patternId) {
    const postPatternLikeResult =
      this.patternService.postPatternLike(patternId);
    console.log(postPatternLikeResult);
  }

  async getUser() {
    const userInfo = await this.userService.getUser();
    this.user = userInfo;
    console.log(this.user.isSetProfile);
  }
}
