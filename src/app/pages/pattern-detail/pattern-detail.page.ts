import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ModalController,
  LoadingController,
} from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { PatternService } from "src/app/api/pattern.service";

@Component({
  selector: "app-pattern-detail",
  templateUrl: "./pattern-detail.page.html",
  styleUrls: ["./pattern-detail.page.scss"],
})
export class PatternDetailPage implements OnInit {
  public patternId;
  public pattern: any = {};
  public patternImg = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public navController: NavController,
    public patternService: PatternService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.pattern = this.router.getCurrentNavigation().extras.state.pattern;
      }
      this.patternId = params.patternId;
    });
  }

  async ionViewDidEnter() {
    await this.getPatternDetail();
  }

  async getPatternDetail() {
    const {data} = await this.patternService.getPatternDetail(this.patternId);
  
    if (data.status === 'Y') {
      this.pattern = data.pattern
      console.log("pattern response", data.pattern); 
    }
    else {
      this.failtoFetchYarnDetail();
    }
  }

  failtoFetchYarnDetail() {
    //this.navController.navigateBack('tabs/yarn');
  }

  goBack() {
    this.navController.navigateBack("tabs/pattern");
  }
}
