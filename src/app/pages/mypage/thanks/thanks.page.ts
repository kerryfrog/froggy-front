import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { UserService } from "src/app/services/user.service";
@Component({
  selector: "app-thanks",
  templateUrl: "./thanks.page.html",
  styleUrls: ["./thanks.page.scss"],
})
export class ThanksPage implements OnInit {
  public user;
  constructor(
    public userService: UserService,
    public navController: NavController
  ) {}

  ngOnInit() {}
  async ionViewDidEnter() {
    await this.getUser();
  }
  async getUser() {
    const userInfo = await this.userService.getUser();
    this.user = userInfo;
  }
  goBack() {
    this.navController.navigateBack("mypage");
  }
}
