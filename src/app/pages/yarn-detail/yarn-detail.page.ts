import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ModalController,
  LoadingController,
} from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { YarnService } from "src/app/api/yarn.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-yarn-detail",
  templateUrl: "./yarn-detail.page.html",
  styleUrls: ["./yarn-detail.page.scss"],
})
export class YarnDetailPage implements OnInit {
  public yarnId;
  public yarn: any = {};
  public yarnImg = [];

  public reviewList = [];
  previousUrl: string = "";
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public navController: NavController,
    public yarnService: YarnService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.yarn = this.router.getCurrentNavigation().extras.state.yarn;
        if (this.router.getCurrentNavigation().extras.state.previousUrl) {
          this.previousUrl =
            this.router.getCurrentNavigation().extras.state.previousUrl;
        }
      }
      this.yarnId = params.yarnId;
    });
  }

  async ionViewDidEnter() {
    await this.getYarnDetail();
    await this.getYarnReview();
  }

  async getYarnDetail() {
    const { data } = await this.yarnService.getYarnDetail(this.yarnId);
    if (data.status === "Y") {
      this.yarn = data.yarn;
    } else {
      this.failtoFetchYarnDetail();
    }
  }

  failtoFetchYarnDetail() {
    this.navController.navigateBack("tabs/yarn");
  }
  async getYarnReview() {
    const { data } = await this.yarnService.getYarnReview(this.yarnId);
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
  async writeReview() {
    this.navController.navigateForward(`yarn/${this.yarnId}/review`);
  }
}
