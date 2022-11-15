import { Component } from "@angular/core";
import { DataService } from "src/app/api/data.service";
import { PatternService } from "src/app/api/pattern.service";
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
} from "@ionic/angular";
// import { LocalStorageService } from '../../common/local-storage.service';
import {
  ActivatedRoute,
  NavigationExtras,
  Router,
  NavigationEnd,
} from "@angular/router";

import { filter } from "rxjs/operators";
// const testList = [763264, 763263, 17, 20, 766149];
const famousList = [760196, 761594, 763023, 763263, 763264, 766149];

@Component({
  selector: "app-pattern",
  templateUrl: "pattern.page.html",
  styleUrls: ["pattern.page.scss"],
})
export class PatternPage {
  public min;
  public max;
  public nowIndex = -1;
  public patternList = [];
  public results;

  previousUrl: string = null;
  currentUrl: string = null;
  constructor(
    public navController: NavController,
    public dataService: DataService,
    public router: Router,
    public alertController: AlertController,
    public patternService: PatternService,
    public modalController: ModalController
  ) {}
  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
        console.log("mainpage", this.previousUrl);
      });
  }
  async ionViewDidEnter() {
    await this.getPatternPageView();
    this.setFavoriteFalse(this.patternList);
  }

  async handleChange(event) {
    this.results = event.target.value;
    const { data } = await this.patternService.getPatternSearchList(
      this.results
    );
    console.log(data);
  }

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

  async getRecommendYarnData() {
    for (let i of famousList) {
      const response = await this.dataService.getPatternDataFromRaverly(i);
      console.log("for i =", i, response);
      const postResult = await this.dataService.postPatternData(response);
      this.nowIndex = i;
    }
  }

  async getAndFetchPatternData() {
    const { data } = await this.dataService.getEmptyImageIndex();
    console.log(data.indexList);
    if (data.status === "Y") {
      const { indexList } = data;
      for (let index of indexList) {
        const response = await this.dataService.getPatternDataFromRaverly(
          index
        );
        console.log("for i =", index, response);
        const postResult = await this.dataService.postPatternData(response);
      }
    }
  }

  setFavoriteFalse(newPatternList) {
    for (let pattern of newPatternList) {
      pattern["isFavorite"] = false;
    }
    return newPatternList;
  }

  async getPatternPageView() {
    //getTmpPatternList()
    const { data } = await this.patternService.getRecommendPatternList();
    // const { data } = await this.patternService.getTmpPatternList();
    console.log(data);

    if (data.status === "Y") {
      const newPatternListWithIsFavorite = this.setFavoriteFalse(
        data.patternList
      );
      this.patternList = [...this.patternList, ...newPatternListWithIsFavorite];
    }
  }

  checkIsPatternFavorite(favoritePatternList) {
    if (!favoritePatternList) return;
    this.patternList = this.patternList.map((pattern) => {
      const patterns = { ...pattern };
      const isFavorite = favoritePatternList.includes(pattern.id);
      if (isFavorite) {
        patterns.isFavorite = true;
      } else {
        patterns.isFavorite = false;
      }
      return patterns;
    });
  }

  loadData(event) {
    setTimeout(async () => {
      await this.getPatternPageView();
      event.target.complete();
      // if (this.paging.curPage === this.paging.totalPage) {
      //   event.target.disabled = true;
      // }
    }, 500);
  }

  async goSearchPatternPage() {
    this.navController.navigateForward(`/tabs/pattern/search`);
  }
  goMypage() {
    this.navController.navigateForward("mypage");
  }
}
