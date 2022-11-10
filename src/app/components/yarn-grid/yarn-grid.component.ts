import { Component, OnInit, Input } from "@angular/core";
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
} from "@ionic/angular";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";

import { YarnService } from "src/app/api/yarn.service";

@Component({
  selector: "app-yarn-grid",
  templateUrl: "./yarn-grid.component.html",
  styleUrls: ["./yarn-grid.component.scss"],
})
export class YarnGridComponent implements OnInit {
  @Input() yarnList;
  constructor(
    public yarnService: YarnService,
    public navController: NavController,
    public modalController: ModalController,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public location: Location
  ) {}

  ngOnInit() {}

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

    if (yarnResult["isFavorite"]) {
      yarnResult["isFavorite"] = false;
    } else {
      yarnResult["isFavorite"] = true;
    }
    console.log(yarnResult);
  }

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

  setFavoriteFalse() {
    for (let yarn of this.yarnList) {
      yarn["isFavorite"] = false;
    }
  }
}
