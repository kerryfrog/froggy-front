import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ModalController,
  LoadingController,
} from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { YarnService } from "src/app/api/yarn.service";
import { UserService } from "src/app/services/user.service";
import { SigninComponent } from "src/app/components/signin/signin.component";
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
  public user;
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public navController: NavController,
    public modalController: ModalController,
    public yarnService: YarnService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.yarn = this.router.getCurrentNavigation().extras.state.yarn;
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
  async enrollFavorite(event, product) {
    this.user = await this.userService.getUser();
    if (this.user === undefined || this.user === null) {
      await this.openSignInModal();
      return;
    }
    event.stopPropagation();
    if (product["isFavorite"]) {
      product["isFavorite"] = false;
    } else {
      product["isFavorite"] = true;
    }
    await this.fetchEnrollFavorite(product.id);
  }

  async fetchEnrollFavorite(id) {
    const postYarnLikeResult = this.yarnService.postYarnLike(id);
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
    // console.log(user);
    // console.log(this.reviewList);

    for (let review of this.reviewList) {
      if (user.id === review.userId) {
        review["isWriter"] = true;
      } else {
        review["isWriter"] = false;
      }
    }
  }

  async openSignInModal() {
    const modal = await this.modalController.create({
      component: SigninComponent,
      cssClass: "modal-fullscreen",
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    this.user = await this.userService.getUser();
  }
  async writeReview() {
    this.navController.navigateForward(`yarn/${this.yarnId}/review`);
  }
}
