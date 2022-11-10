import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ModalController,
  AlertController,
} from "@ionic/angular";
@Component({
  selector: "app-favorite-yarn",
  templateUrl: "./favorite-yarn.page.html",
  styleUrls: ["./favorite-yarn.page.scss"],
})
export class FavoriteYarnPage implements OnInit {
  constructor(public navController: NavController) {}

  ngOnInit() {}
  goBack() {
    this.navController.navigateBack("mypage");
  }
}
