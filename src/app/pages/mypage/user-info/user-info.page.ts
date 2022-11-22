import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import {
  NavController,
  ModalController,
  AlertController,
} from "@ionic/angular";

import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/api/auth/auth.service";
import { UserPrefer } from "../../../models/server-request";
import { ProfileService } from "src/app/api/profile.service";
import { PatternService } from "src/app/api/pattern.service";
import { SelectAttributeComponent } from "src/app/components/select-attribute/select-attribute.component";
@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.page.html",
  styleUrls: ["./user-info.page.scss"],
})
export class UserInfoPage implements OnInit {
  public user;
  public patternAttributeListForShow = [];
  public userPreferChange: UserPrefer = {
    proficiency: -1,
    crochet: -1,
    knitting: -1,
  };
  public isChangeNickName = false;
  public userPreferForShow: UserPrefer = {
    proficiency: -1,
    crochet: -1,
    knitting: -1,
  };
  public proficiency;
  constructor(
    public userService: UserService,
    public authService: AuthService,
    public modalController: ModalController,
    public navController: NavController,
    public profileService: ProfileService,
    public alertController: AlertController,
    public patternService: PatternService,
    public changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {}
  async ionViewDidEnter() {
    await this.getUser();
    await this.getPatternAttributeList();
  }

  async getUser() {
    const userInfo = await this.userService.getUser();
    console.log(userInfo);

    this.user = userInfo;
    this.userPreferForShow.proficiency = userInfo.proficiency.toString();
    this.userPreferForShow.crochet = userInfo.crochet;
    this.userPreferForShow.knitting = userInfo.knitting;
  }
  async getPatternAttributeList() {
    const patternAttributeListResult =
      await this.patternService.getPatternAttributeList();
    if (!this.user.favoritePatternAttributeIdArr) {
      console.log("user does not set favorite pattern attirbute");
      return;
    }
    if (patternAttributeListResult.data.status === "Y") {
      const patternAttributeList =
        patternAttributeListResult.data.patternAttributeList;
      this.patternAttributeListForShow = patternAttributeList.filter(
        (attribute) =>
          this.user.favoritePatternAttributeIdArr.includes(attribute.id)
      );
      console.log(this.patternAttributeListForShow);
    }
  }
  async logout() {
    await this.userService.deleteUser();
    const logoutResult = await this.authService.logout();
    this.goBackWithLogout();
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
        this.setUserNick(newNickname);
      }
    }
  }

  async setUserNick(newNickName) {
    this.user.nick = newNickName;
    await this.userService.saveUser(this.user);
  }

  async saveUserInfo() {
    const changeProfileResult = await this.profileService.changeProfile({
      newPrefer: this.userPreferChange,
    });

    if (changeProfileResult.data.isUserLogin == "N") {
      this.setUserSyncWithServer();
    }
    if (changeProfileResult.data.status === "Y") {
      this.setUserProfile(changeProfileResult.data.isSetProfileChanged);
      const alert = await this.alertController.create({
        header: "변경 완료",
        subHeader: "",
        message: "상세 정보가 변경되었습니다.",
        buttons: [{ text: "확인" }],
      });
      await alert.present();
    }
  }
  async selectPatternAttribute() {
    const modal = await this.modalController.create({
      component: SelectAttributeComponent,
      componentProps: { user: this.user },
      cssClass: "modal-fullscreen",
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data.dismissed) {
      await this.getUser();
      await this.getPatternAttributeList();
      this.changeDetectorRef.detectChanges();
    }
    console.log(data);
  }

  async setUserProfile(isSetProfileChanged) {
    if (this.userPreferChange.crochet !== -1)
      this.user.crochet = this.userPreferChange.crochet;
    if (this.userPreferChange.knitting !== -1)
      this.user.knitting = this.userPreferChange.knitting;
    if (this.userPreferChange.proficiency !== -1)
      this.user.proficiency = this.userPreferChange.proficiency;
    if (isSetProfileChanged === "Y") {
      this.user.isSetProfile = "Y";
    }
    await this.userService.saveUser(this.user);
  }

  handleChange(event) {
    this.proficiency = parseInt(event.detail.value);
    this.userPreferChange.proficiency = parseInt(event.detail.value);
  }

  onChangeCrochet(event) {
    if (event.detail.checked) {
      this.userPreferChange.crochet = 1;
    } else {
      this.userPreferChange.crochet = 0;
    }
    console.log(event.detail.value, " ", this.userPreferChange);
  }

  onChangeKnitting(event) {
    if (event.detail.checked) {
      this.userPreferChange.knitting = 1;
    } else {
      this.userPreferChange.knitting = 0;
    }
  }

  goBackWithLogout() {
    this.navController.navigateBack("mypage");
  }
  changeNickName() {
    this.isChangeNickName = true;
  }

  goBack() {
    this.navController.navigateBack("mypage");
  }

  async setUserSyncWithServer() {
    await this.userService.deleteUser();
    alert("다시 로그인 해 주세요");
    this.goBack();
  }
}
