import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { YarnService } from "src/app/api/yarn.service";
// import { LocalStorageService } from '../../common/local-storage.service';
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
} from "@ionic/angular";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-yarn",
  templateUrl: "yarn.page.html",
  styleUrls: ["yarn.page.scss"],
})
export class YarnPage implements OnInit {
  public yarnList = [];
  public results;

  constructor(
    public yarnService: YarnService,
    public navController: NavController,
    public modalController: ModalController,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public location: Location
  ) {}

  async handleChange(event) {
    this.results = event.target.value;
    const { data } = await this.yarnService.getYarnSearchList(this.results);
    // console.log(data);
  }

  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {});
  }

  async ionViewDidEnter() {
    await this.getYarnPageView();
    this.setFavoriteFalse();
  }

  async getYarnPageView() {
    const { data } = await this.yarnService.getRecommendYarnList();
    // console.log("data", data);

    if (data.status === "Y") {
      this.yarnList = [...this.yarnList, ...data.randYarn];
      // console.log(data);
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
  enrollFavoriteYarn(e, yarn) {
    e.stopPropagation();
    let yarnResult = this.yarnList.filter((ya) => ya.id === yarn.id)[0];
    // console.log("enrool favoaite yanr", yarnResult);

    if (yarnResult["isFavorite"]) {
      yarnResult["isFavorite"] = false;
    } else {
      yarnResult["isFavorite"] = true;
    }
    // console.log(yarnResult);
  }
  deleteFavoriteYarn(e, yarn) {}

  // fetch favorite item
  async fetchEnrollFavoriteItem(yarn) {
    const payload = this.genPayload(yarn);
    const response = await this.yarnService.enrollFavoriteYarn(payload);
    if (response.status !== 200) return false;
    return true;
  }

  genPayload(yarn) {
    const payload = {
      yarnId: yarn.id,
    };
    return payload;
  }

  checkIsYarnFavorite(favoriteYarnList) {
    if (!favoriteYarnList) return;
    this.yarnList = this.yarnList.map((yarn) => {
      const isFavorite = favoriteYarnList.includes(yarn.id);
      if (isFavorite) {
        yarn.isFavorite = true;
      } else {
        yarn.isFavorite = false;
      }
      return yarn;
    });
  }

  onImageError(e) {}

  setFavoriteFalse() {
    for (let yarn of this.yarnList) {
      yarn["isFavorite"] = false;
    }
  }

  loadData(event) {
    setTimeout(async () => {
      await this.getYarnPageView();
      event.target.complete();
      // if (this.paging.curPage === this.paging.totalPage) {
      //   event.target.disabled = true;
      // }
    }, 500);
  }
  async goSearchYarnPage() {
    this.navController.navigateForward(`/tabs/yarn/search`);
  }
}
