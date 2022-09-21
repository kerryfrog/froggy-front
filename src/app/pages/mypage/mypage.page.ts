import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

import { SignupComponent } from 'src/app/components/signup/signup.component';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.page.html',
  styleUrls: ['./mypage.page.scss'],
})
export class MypagePage implements OnInit {

  constructor(
    public modalController: ModalController,
  ) { }

  ngOnInit() {

  }
  async signup() {
    const modal = await this.modalController.create({
      component: SignupComponent,
      cssClass: 'modal-fullscreen',
    });
    await modal.present();
  }
}
