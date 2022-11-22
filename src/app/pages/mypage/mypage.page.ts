import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";

import { SignupComponent } from "src/app/components/signup/signup.component";
import { SigninComponent } from "src/app/components/signin/signin.component";
import { Storage } from "@ionic/storage-angular";

@Component({
  selector: "app-mypage",
  templateUrl: "./mypage.page.html",
  styleUrls: ["./mypage.page.scss"],
})
export class MypagePage implements OnInit {
  public isLoggedIn = false;
  constructor(
    public modalController: ModalController,
    public storage: Storage,
    public changeDetectorRef: ChangeDetectorRef,
    public navController: NavController
  ) {}

  ngOnInit() {}

  async ionViewDidEnter() {
    await this.checkIsUserLogIn();
  }

  async checkIsUserLogIn() {
    const keyVal = await this.storage.get("user");
    console.log(keyVal);

    if (!keyVal) {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
    }
  }

  async signup() {
    const modal = await this.modalController.create({
      component: SignupComponent,
      cssClass: "modal-fullscreen",
    });
    await modal.present();
    const keyVal = await this.storage.get("user");
    console.log("check sign up result", keyVal);
    await this.checkIsUserLogIn();
    this.changeDetectorRef.detectChanges();
  }

  async signin() {
    const modal = await this.modalController.create({
      component: SigninComponent,
      cssClass: "modal-fullscreen",
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data.isSignedIn) {
      await this.checkIsUserLogIn();
    }
    this.changeDetectorRef.detectChanges();
  }

  async userInfo() {
    this.navController.navigateForward(`/mypage/profile`);
  }

  goUserReviewPage() {
    this.navController.navigateForward(`/mypage/user-review`);
  }

  goUserPostPage() {
    this.navController.navigateForward(`/mypage/user-post`);
  }

  goFavoritePatternPage() {
    this.navController.navigateForward(`/mypage/favorite/pattern`);
  }

  goFavoriteYarnPage() {
    this.navController.navigateForward(`/mypage/favorite/yarn`);
  }
}
