import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/api/auth/auth.service';

import { NavController, ModalController, AlertController } from "@ionic/angular";

import { ProfileService } from 'src/app/api/profile.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  public user;

  public isChangeNickName = false;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    public modalController: ModalController,
    public profileService: ProfileService,
    public alertController: AlertController
  ) { }

  ngOnInit() { }

  async ionViewDidEnter() {
    await this.getUser();
  }

  async getUser() {
    const userInfoStr = await this.userService.getUser();
    this.user = JSON.parse(userInfoStr);
    //this.nickname = this.user.nick;
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
  
  async openChangeNickAlert() {
    const alert = await this.alertController.create({
      header: '닉네임 변경',
      buttons: [
        {
          text: '취소',
          role: 'cancel',
        },
        {
          text: '확인',
          role: 'confirm',
        },
      ],
      inputs: [
        { 
          type:'text',
          placeholder: '새로운 닉네임을 입력하세요',
          attributes: {
            minlength:1,
            maxlength: 10,
          },
        },
      ],
    });
    await alert.present();

  
    const { data, role } = await alert.onDidDismiss();
    console.log(data);
    
    if (role === 'confirm') {
      await this.saveChangeNickName(data.values['0']);
    }
  }


  async saveChangeNickName(newNickname) {
    if ( newNickname !== this.user.nick && newNickname !== '') {
      const changeNicknameResult = await this.profileService.changeNickname({ newNickName:newNickname});
      
      if (changeNicknameResult.data.isUserLogin == 'N') {
        this.setUserSyncWithServer()
      }

      if (changeNicknameResult.data.status === 'Y') {
        this.setUserInfo(newNickname);
      }

    }
  }

  async setUserInfo(newNickName) {
    this.user.nick = newNickName;
    await this.userService.saveUser(this.user);
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

  async setUserSyncWithServer() {
    await this.userService.deleteUser();
    alert('다시 로그인 해 주세요');
  }

}