import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ModalController,
  LoadingController,
} from "@ionic/angular";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { PatternService } from "src/app/api/pattern.service";
import { filter } from "rxjs/operators";
@Component({
  selector: "app-pattern-detail",
  templateUrl: "./pattern-detail.page.html",
  styleUrls: ["./pattern-detail.page.scss"],
})
export class PatternDetailPage implements OnInit {
  public patternId;
  public pattern: any = {};
  public patternImg = [];
  public reviewList = [];

  //for difficulty icon
  iconsArray: number[] = [];
  defaultIcon: string = "ellipse-outline";
  activeIcon: string = "ellipse";

  previousUrl: string = "";

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public navController: NavController,
    public patternService: PatternService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.pattern = this.router.getCurrentNavigation().extras.state.pattern;
        if (this.router.getCurrentNavigation().extras.state.previousUrl) {
          this.previousUrl =
            this.router.getCurrentNavigation().extras.state.previousUrl;
        }
      }
      this.patternId = params.patternId;
    });

    // 난이도  표시를 위한 코드
    for (let i = 0; i < 10; i++) {
      this.iconsArray.push(i);
    }
  }

  async ionViewDidEnter() {
    await this.getPatternDetail();
    await this.getPatternReview();
  }

  async getPatternDetail() {
    const { data } = await this.patternService.getPatternDetail(this.patternId);
    if (data.status === "Y") {
      this.pattern = data.pattern;
    } else {
      this.failtoFetchYarnDetail();
    }
  }
  async getPatternReview() {
    const { data } = await this.patternService.getPatternReview(this.patternId);
    if (data.status === "Y") {
      this.reviewList = data.reviewList;
    }
  }

  failtoFetchYarnDetail() {
    this.navController.navigateBack("tabs/pattern");
  }
  async writeReview() {
    this.navController.navigateForward(`tabs/pattern/review/${this.patternId}`);
  }
}
