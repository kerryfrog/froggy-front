import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ModalController,
  AlertController,
} from "@ionic/angular";

import { PatternService } from "src/app/api/pattern.service";
import { Paging } from "../../../models/server-request";

@Component({
  selector: "app-favorite-pattern",
  templateUrl: "./favorite-pattern.page.html",
  styleUrls: ["./favorite-pattern.page.scss"],
})
export class FavoritePatternPage implements OnInit {
  public patternList = [];

  // for paging
  public paging: Paging;
  public pageNum = 1;
  public isFirstInit = false;
  constructor(
    public navController: NavController,
    public patternService: PatternService
  ) {}

  ngOnInit() {}

  async ionViewDidEnter() {
    await this.getFavoritePatternList();
    await this.getFavoritePatternPageView();
  }
  async getFavoritePatternPageView() {
    const { data } = await this.patternService.getFavoritePatternList(
      this.pageNum
    );
    if (this.pageNum === 1) {
      this.patternList = [...data.patternList];
    } else {
      this.patternList = [...this.patternList, ...data.patternList];
    }
    this.paging = data.mainPaging;
    this.pageNum += 1;
  }

  async getFavoritePatternList() {
    const { data } = await this.patternService.getFavoritePatternList();
    console.log(data);
    if (data.status === "Y") {
      const newPatternListWithIsFavorite = data.patternList;
      this.patternList = [...this.patternList, ...newPatternListWithIsFavorite];
    }
  }

  goBack() {
    this.navController.navigateBack("mypage");
  }
}
