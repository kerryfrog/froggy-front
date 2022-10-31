import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/api/auth/auth.service';

import { NavController, ModalController } from "@ionic/angular";

import { ProfileService } from 'src/app/api/profile.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  public user;
  public nickname;

  public isChangeNickName = false;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    public modalController: ModalController,
    public profileService:ProfileService,
  ) { }

  ngOnInit() { }

  async ionViewDidEnter() {
    await this.getUser();
  }

  async getUser() {
    const userInfoStr = await this.userService.getUser();
    this.user = JSON.parse(userInfoStr);
    this.nickname = this.user.nick;
  }

  async logout() {
    await this.userService.deleteUser();
    const logoutResult = await this.authService.logout();
    
    console.log("logoutResult", logoutResult);
         
    if (logoutResult.data.status === 'Y') {
      this.goBackWithLogout();
    } 
    else {
      alert('다시 로그아웃 해주세요');
    }
  }
  

  async saveChangeNickName() {
    if (this.nickname !== this.user.nick && this.nickname !== "") {
      await this.profileService.changeNickname({ newNickName:this.nickname });
    }
  }

  goBackWithLogout() {
     this.modalController.dismiss({
      isLoggedOut: true,
    });
  }
  changeNickName() {
    this.isChangeNickName = true;
  }
  goBack() {
    this.modalController.dismiss({
      dismissed: false,
    });
  }

}