import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import {
  ModalController,
  NavController,
  AlertController,
} from "@ionic/angular";
import { ProfileService } from "src/app/api/profile.service";
@Component({
  selector: "app-lottery",
  templateUrl: "./lottery.page.html",
  styleUrls: ["./lottery.page.scss"],
})
export class LotteryPage implements OnInit {
  constructor(
    public userService: UserService,
    public alertController: AlertController,
    public profileService: ProfileService
  ) {}
  public user;
  public curIcon = "heart";
  public arr = [1, 2, 2, 3, 3, 3, 3, 3];
  public rating = -1;
  public isLoading = false;
  public isButton = true;

  ngOnInit() {}
  // 확률: 1/6, 2/6, 3/6
  async ionViewDidEnter() {
    await this.getUser();
  }
  async onChangeSegment(event) {
    this.isButton = false;
    this.curIcon = event.detail.value;
  }
  async onSelectSegment() {
    if (this.user.ticket > 0) {
      this.rating = -1;
      this.isButton = true;
      this.isLoading = true;
      const shuffledArr = await this.shuffleArray(this.arr);
      this.user.ticket = this.user.ticket - 1;
      await this.userService.saveUser(this.user);
      await this.profileService.changeTicket({
        ticket: this.user.ticket,
      });
      setTimeout(() => {
        this.rating = shuffledArr[this.curIcon];
        this.isLoading = false;
      }, 500);
    } else {
      const alert = await this.alertController.create({
        header: "안내",
        subHeader: "",
        message: "티켓을 전부 사용했습니다 ㅠㅠ",
        buttons: [{ text: "확인" }],
      });
      await alert.present();
      return;
    }
  }
  async shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
    //console.log(array);
    return array;
  }

  async getUser() {
    this.user = await this.userService.getUser();
    // console.log(this.user);
  }
}
