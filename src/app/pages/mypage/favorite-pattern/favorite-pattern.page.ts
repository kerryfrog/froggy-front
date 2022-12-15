import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ModalController,
  AlertController,
} from "@ionic/angular";
import { UserService } from "src/app/services/user.service";
import { PatternService } from "src/app/api/pattern.service";
import { Paging } from "../../../models/server-request";
import { logging } from "protractor";

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
    public patternService: PatternService,
    public userService: UserService,
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  async ionViewDidEnter() {
    // await this.getFavoritePatternList();
    await this.getFavoritePatternPageView();
  }
  async getFavoritePatternPageView() {
    const { data } = await this.patternService.getFavoritePatternList(
      this.pageNum
    );
    // console.log(data);

    if (data.isUserLogin === "N") {
      this.setUserSyncWithServer();
    }

    if (this.pageNum === 1) {
      this.patternList = [...data.patternList];
    } else {
      this.patternList = [...this.patternList, ...data.patternList];
    }
    this.paging = data.mainPaging;
    this.pageNum += 1;
  }

  // async getFavoritePatternList() {
  //   const { data } = await this.patternService.getFavoritePatternList();
  //   console.log(data);
  //   if (data.status === "Y") {
  //     const newPatternListWithIsFavorite = data.patternList;
  //     this.patternList = [...this.patternList, ...newPatternListWithIsFavorite];
  //   }
  // }
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

  loadData(event) {
    setTimeout(async () => {
      await this.getFavoritePatternPageView();
      event.target.complete();
      // if (this.paging.curPage === this.paging.totalPage) {
      //   event.target.disabled = true;
      // }
    }, 500);
  }

  goBack() {
    this.navController.navigateBack("mypage");
  }
}
