import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/api/auth/auth.service";
import { UserPrefer } from "../../models/server-request";

import {
  NavController,
  ModalController,
  AlertController,
} from "@ionic/angular";

import { ProfileService } from "src/app/api/profile.service";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.scss"],
})
export class UserInfoComponent implements OnInit {
  public user;
  public userPreferChange: UserPrefer = {
    proficiency: -1,
    crochet: -1,
    knitting: -1,
  };
  public isChangeNickName = false;
  public proficiency;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    public modalController: ModalController,
    public profileService: ProfileService,
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  async ionViewDidEnter() {
    await this.getUser();
  }

  async getUser() {
    const userInfo = await this.userService.getUser();
    this.user = userInfo;
    this.proficiency = userInfo.proficiency.toString();
    console.log(this.user);
    console.log("this.proficiency", this.proficiency);
  }

  async logout() {
    await this.userService.deleteUser();
    const logoutResult = await this.authService.logout();

    console.log("logoutResult", logoutResult);

    if (logoutResult.data.status === "Y") {
      this.goBackWithLogout();
    } else {
      alert("다시 로그아웃 해주세요");
    }
  }

  async openChangeNickAlert() {
    const alert = await this.alertController.create({
      header: "닉네임 변경",
      buttons: [
        {
          text: "취소",
          role: "cancel",
        },
        {
          text: "확인",
          role: "confirm",
        },
      ],
      inputs: [
        {
          type: "text",
          placeholder: "새로운 닉네임을 입력하세요",
          attributes: {
            minlength: 1,
            maxlength: 10,
          },
        },
      ],
    });
    await alert.present();

    const { data, role } = await alert.onDidDismiss();
    console.log(data);

    if (role === "confirm") {
      await this.saveChangeNickName(data.values["0"]);
    }
  }

  async saveChangeNickName(newNickname) {
    if (newNickname !== this.user.nick && newNickname !== "") {
      const changeNicknameResult = await this.profileService.changeNickname({
        newNickName: newNickname,
      });

      if (changeNicknameResult.data.isUserLogin == "N") {
        this.setUserSyncWithServer();
      }

      if (changeNicknameResult.data.status === "Y") {
        this.setUserInfo(newNickname);
      }
    }
  }

  async setUserInfo(newNickName) {
    this.user.nick = newNickName;
    await this.userService.saveUser(this.user);
  }

  async saveUserInfo() {
    console.log("this.userPerfernceChange", this.userPreferChange);
  }

  handleChange(event) {
    console.log(event);
    this.proficiency = event.detail.value;
    this.userPreferChange.proficiency = event.detail.value;
  }

  onChangeCrochet(event) {
    if (event.detail.value) {
      this.userPreferChange.crochet = 1;
    } else {
      this.userPreferChange.crochet = 0;
    }
  }
  onChangeKnitting(event) {
    if (event.detail.value) {
      this.userPreferChange.knitting = 1;
    } else {
      this.userPreferChange.knitting = 0;
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

  async setUserSyncWithServer() {
    await this.userService.deleteUser();
    alert("다시 로그인 해 주세요");
  }
}
