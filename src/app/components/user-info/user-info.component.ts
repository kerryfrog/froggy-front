import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NavController, ModalController } from "@ionic/angular";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  public user;

  constructor(
    public userService: UserService,
    public modalController: ModalController,
  ) { }

  ngOnInit() { }

  async ionViewDidEnter() {
    await this.getUser();
  }

  async getUser() {
    const userInfoStr = await this.userService.getUser();
    this.user = JSON.parse(userInfoStr);

    console.log("this.user", this.user);
    
  }
  goBack() {
    this.modalController.dismiss({
      dismissed: false,
    });

  }
}