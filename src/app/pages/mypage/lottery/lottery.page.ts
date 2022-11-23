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
  public curIcon = "heart";
  public arr = [1, 2, 2, 3, 3, 3];
  public rating = -1;
  ngOnInit() {}
  // 확률: 1/6, 2/6, 3/6
  async ionViewDidEnter() {
    await this.getUser();
  }
  async onChangeSegment(event) {
    this.curIcon = event.detail.value;
  }
  async onSelectSegment() {
    const shuffledArr = await this.shuffleArray(this.arr);
    console.log(shuffledArr, shuffledArr[this.curIcon]);
    this.rating = shuffledArr[this.curIcon];
  }
  async shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
    //console.log(array);
    return array;
  }

  async getUser() {
    this.user = await this.userService.getUser();
    console.log(this.user);
  }
}
