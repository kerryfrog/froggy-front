import { Component, OnInit } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";

import { SignupComponent } from "src/app/components/signup/signup.component";
import { SigninComponent } from "src/app/components/signin/signin.component";
import { UserInfoComponent } from "src/app/components/user-info/user-info.component";
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: "app-mypage",
  templateUrl: "./mypage.page.html",
  styleUrls: ["./mypage.page.scss"],
})
export class MypagePage implements OnInit {

  public isLogedin = false;
  constructor(
    public modalController: ModalController,
    public storage: Storage
  ) { }

  ngOnInit() { }
  
  async ionViewDidEnter() {
      
    const keyVal = await this.storage.get('user');
    console.log("keyVal is ", keyVal);
    

    if (!keyVal) {
      this.isLogedin= false;
    }
    else {
      this.isLogedin = true;
    }
  }

  async checkIsUserLogIn() {
    
  }

  async signup() {
    const modal = await this.modalController.create({
      component: SignupComponent,
      cssClass: "modal-fullscreen",
    });
    await modal.present();
  }

  async signin() {
    const modal = await this.modalController.create({
      component: SigninComponent,
      cssClass: "modal-fullscreen",
    });
    await modal.present();
  }
   
  async userInfo() {
    const modal = await this.modalController.create({
      component: UserInfoComponent,
      cssClass: "modal-fullscreen",
    });
    await modal.present();
  }

  async openFavoriteYarn() {
    const modal = await this.modalController.create({
      component: SigninComponent,
      cssClass: "modal-fullscreen",
    });
    await modal.present();
  }
}
