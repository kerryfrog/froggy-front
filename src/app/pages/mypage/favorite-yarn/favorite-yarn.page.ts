import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ModalController,
  AlertController,
} from "@ionic/angular";

import { YarnService } from "src/app/api/yarn.service";
@Component({
  selector: "app-favorite-yarn",
  templateUrl: "./favorite-yarn.page.html",
  styleUrls: ["./favorite-yarn.page.scss"],
})
export class FavoriteYarnPage implements OnInit {
  public yarnList = [];
  constructor(
    public navController: NavController,
    public yarnService: YarnService
  ) {}

  ngOnInit() {}
  async ionViewDidEnter() {
    await this.getFavoriteYarnList();
  }

  async getFavoriteYarnList() {
    const { data } = await this.yarnService.getFavoriteYarnList();
    console.log(data);
    if (data.status === "Y") {
      const newYarnListWithIsFavorite = this.setFavoriteTrue(data.yarnList);
      this.yarnList = [...this.yarnList, ...newYarnListWithIsFavorite];
    }
  }
  setFavoriteTrue(newYarnList) {
    for (let yarn of newYarnList) {
      yarn["isFavorite"] = true;
    }
    return newYarnList;
  }
  goBack() {
    this.navController.navigateBack("mypage");
  }
}
