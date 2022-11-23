import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
@Component({
  selector: "app-lottery",
  templateUrl: "./lottery.page.html",
  styleUrls: ["./lottery.page.scss"],
})
export class LotteryPage implements OnInit {
  constructor(public userService: UserService) {}
  public user;
  ngOnInit() {}
  async ionViewDidEnter() {
    await this.getUser();
  }

  async getUser() {
    this.user = await this.userService.getUser();
    console.log(this.user);
  }
}
