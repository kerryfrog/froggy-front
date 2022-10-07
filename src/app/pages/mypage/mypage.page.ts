import { Component, OnInit } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";

import { SignupComponent } from "src/app/components/signup/signup.component";
import { SigninComponent } from "src/app/components/signin/signin.component";
import { Storage } from '@ionic/storage-angular';
//import { StorageService } from "src/app/services/storage.service";
@Component({
  selector: "app-mypage",
  templateUrl: "./mypage.page.html",
  styleUrls: ["./mypage.page.scss"],
})
export class MypagePage implements OnInit {
  constructor(
    public modalController: ModalController,
    public storage: Storage
  ) { }

  ngOnInit() { }
  
  async ionViewDidEnter() {
      
    const keyVal = await this.storage.get('user');
    console.log('Key is', keyVal);

    if (!keyVal) {
      this.signup();
    }
  }

  async signup() {
    const modal = await this.modalController.create({
      component: SignupComponent,
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
