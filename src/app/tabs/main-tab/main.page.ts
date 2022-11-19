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

  // 개인화 추천을 위한 변수들 ..
  public patternListForUser = [];
  public viewState = 0;

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
    await this.getMainRecommendViewByState();
  }
  async refreshMain(event) {
    await this.getUser();
    this.clear();
    this.changeViewState();
    await this.getMainRecommendViewByState();
    event.target.disabled = true;
    event.target.complete();
    setTimeout(() => {
      event.target.disabled = false;
    }, 100);
  }
  clear() {
    this.patternListForUser = [];
    this.patternList = [];
    this.yarnList = [];
  }

  async getMainRecommendViewByState() {
    if (this.user && this.user.isSetProfile === "Y") {
      await this.getRecommendPatternByUserProfile();
    } else {
      await this.getPatternPageView();
      await this.getYarnPageView();
    }
  }
  async getRecommendPatternByUserProfile() {
    if (this.viewState === 0) {
      await this.getRecommendPatternByDifficulty();
    } else if (this.viewState === 1) {
      if (this.user.crochet === 0) {
        this.changeViewState();
        await this.getRecommendPatternByUserProfile();
        return;
      }
      await this.getRecommendPatternByCrochet();
    } else if (this.viewState === 2) {
      if (this.user.knitting === 0) {
        this.changeViewState();
        await this.getRecommendPatternByUserProfile();
        return;
      }
      await this.getRecommendPatternByKnitting();
    }
  }
  async getPatternPageView() {
    const { data } = await this.patternService.getRandomPatternList();
    if (data.status === "Y") {
      this.patternList = [...this.patternList, ...data.patternList];
    }
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

      this.patternListForUser = patternResult.data.patternList.slice(0, 6);
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
      this.patternListForUser = patternResult.data.patternList.slice(0, 6);
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
      this.patternListForUser = patternResult.data.patternList.slice(0, 6);
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
        previous: "/tabs/main",
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
  }

  fetchEnrollFavoritePattern(patternId) {
    const postPatternLikeResult =
      this.patternService.postPatternLike(patternId);
  }

  async setUserSyncWithServer() {
    this.user = false;
    await this.userService.deleteUser();
    alert("다시 로그인 해 주세요");
    await this.getMainRecommendViewByState();
  }

  changeViewState() {
    this.viewState = (this.viewState += 1) % 3;
    console.log("view state", this.viewState);
  }

  async getUser() {
    const userInfo = await this.userService.getUser();
    this.user = userInfo;
  }

  // get yarn from raverly

  // async getRaverlyApi() {
  //   if (!this.min || !this.max) {
  //     const alert = await this.alertController.create({
  //       header: "에러",
  //       message: "범위를 입력해 주세요",
  //       buttons: ["확인"],
  //     });
  //     await alert.present();
  //     return;
  //   }
  //   const subHeader = `index 가 ${this.min} ~ ${this.max}인 `;
  //   const message = "api 를 호출하시겠습니까?";
  //   let flag = false;
  //   const alert = await this.alertController.create({
  //     subHeader,
  //     message,
  //     buttons: [
  //       {
  //         text: "취소",
  //         handler: async () => {
  //           this.alertController.dismiss();
  //         },
  //       },
  //       {
  //         text: "확인",
  //         handler: async () => {
  //           await this.getAndFetchYarnData();
  //           flag = true;
  //         },
  //       },
  //     ],
  //   });
  //   await alert.present();
  // }

  // async getAndFetchYarnData() {
  //   for (let i = this.min; i <= this.max; i++) {
  //     const response = await this.dataService.getYarnDataFromRaverly(i);
  //     // console.log("for i =", i, response);
  //     const postResult = await this.dataService.postYarnData(response);

  //     this.nowIndex = i;
  //   }
  // }

  // getRandomInt(min, max) {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  //   return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  // }
}
