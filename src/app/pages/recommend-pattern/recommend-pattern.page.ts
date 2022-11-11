import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ModalController,
  LoadingController,
} from "@ionic/angular";
@Component({
  selector: "app-recommend-pattern",
  templateUrl: "./recommend-pattern.page.html",
  styleUrls: ["./recommend-pattern.page.scss"],
})
export class RecommendPatternPage implements OnInit {
  constructor(public navController: NavController) {}

  ngOnInit() {}
  goBack() {
    this.navController.navigateBack("tabs/main");
  }
}
