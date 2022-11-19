import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ModalController,
  LoadingController,
} from "@ionic/angular";
import { UserService } from "src/app/services/user.service";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { PatternService } from "src/app/api/pattern.service";
import { filter } from "rxjs/operators";
import { of } from "rxjs";
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
    public userService: UserService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public navController: NavController,
    public patternService: PatternService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.pattern = this.router.getCurrentNavigation().extras.state.pattern;
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
      await this.setIsWriter();
    }
  }
  async setIsWriter() {
    const user = await this.userService.getUser();
    console.log(user);
    console.log(this.reviewList);

    for (let review of this.reviewList) {
      if (user.id === review.userId) {
        review["isWriter"] = true;
      } else {
        review["isWriter"] = false;
      }
    }
  }
  failtoFetchYarnDetail() {
    this.navController.navigateBack("tabs/pattern");
  }
  async writeReview() {
    this.navController.navigateForward(`pattern/${this.patternId}/review`);
  }
}
