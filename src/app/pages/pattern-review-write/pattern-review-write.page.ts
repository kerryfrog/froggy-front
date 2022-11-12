import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ModalController,
  LoadingController,
} from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-pattern-review-write",
  templateUrl: "./pattern-review-write.page.html",
  styleUrls: ["./pattern-review-write.page.scss"],
})
export class PatternReviewWritePage implements OnInit {
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public navController: NavController
  ) {}
  public patternId;
  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.patternId = params.patternId;
    });
  }
  goBack() {
    this.navController.navigateBack(`tabs/pattern/${this.patternId}`);
  }
}
