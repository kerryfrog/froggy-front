import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ModalController,
  AlertController,
} from "@ionic/angular";

import { PatternService } from "src/app/api/pattern.service";

@Component({
  selector: "app-favorite-pattern",
  templateUrl: "./favorite-pattern.page.html",
  styleUrls: ["./favorite-pattern.page.scss"],
})
export class FavoritePatternPage implements OnInit {
  public patternList = [];
  constructor(
    public navController: NavController,
    public patternService: PatternService
  ) {}

  ngOnInit() {}

  async ionViewDidEnter() {
    await this.getFavoritePatternList();
  }

  async getFavoritePatternList() {
    const { data } = await this.patternService.getFavoritePatternList();
    console.log(data);
    if (data.status === "Y") {
      const newPatternListWithIsFavorite = this.setFavoriteTrue(
        data.patternList
      );
      this.patternList = [...this.patternList, ...newPatternListWithIsFavorite];
    }
  }
  setFavoriteTrue(newPatternList) {
    for (let pattern of newPatternList) {
      pattern["isFavorite"] = true;
    }
    return newPatternList;
  }
  goBack() {
    this.navController.navigateBack("mypage");
  }
}
