import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ModalController,
  LoadingController,
} from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { YarnService } from "src/app/api/yarn.service";

@Component({
  selector: "app-yarn-detail",
  templateUrl: "./yarn-detail.page.html",
  styleUrls: ["./yarn-detail.page.scss"],
})
export class YarnDetailPage implements OnInit {
  public yarnId;
  public yarn: any = {};
  public yarnImg = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public navController: NavController,
    public yarnService: YarnService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        //this.yarn = this.router.getCurrentNavigation().extras.state.yarn;
      }
      this.yarnId = params.yarnId;
    });
    //console.log("this yarn", this.yarn);
  }

  async ionViewDidEnter() {
 
    await this.getYarnDetail();

  }

  async getYarnDetail() {
    const { data } = await this.yarnService.getYarnDetail(this.yarnId);
    console.log("get yarn detail result", data);
    if (data.status === 'Y') {
      this.yarn = data.yarn;
    }
    else {
      this.failtoFetchYarnDetail();
    }
  }

  failtoFetchYarnDetail() {
    //this.navController.navigateBack('tabs/yarn');
  }

  async writeReview() {
    this.navController.navigateForward(`tabs/yarn/review/${this.yarnId}`);
  }


  goBack() {
    this.navController.navigateBack("tabs/yarn");
  }
}
