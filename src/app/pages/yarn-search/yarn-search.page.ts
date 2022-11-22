import { Component, OnInit } from "@angular/core";
import { YarnService } from "src/app/api/yarn.service";
import { NavController } from "@ionic/angular";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
@Component({
  selector: "app-yarn-search",
  templateUrl: "./yarn-search.page.html",
  styleUrls: ["./yarn-search.page.scss"],
})
export class YarnSearchPage implements OnInit {
  public yarnList = [];
  public value;
  public isWaiting = false;
  constructor(
    public yarnService: YarnService,
    public navController: NavController
  ) {}

  ngOnInit() {}

  async handleChange(event) {
    this.value = event.target.value;
  }

  async search(event) {
    this.yarnList = [];
    const value = this.value.replace(/(\s*)/g, "");
    if (value.length > 0) {
      this.isWaiting = true;
      const { data } = await this.yarnService.getYarnSearchList(this.value);
      this.yarnList = data["searchList"];
      this.isWaiting = false;
    }
  }

  async goPatternDetailPage(yarn) {
    const props: NavigationExtras = {
      state: {
        yarn,
      },
    };
    this.navController.navigateForward(`/tabs/yarn/${yarn.id}`, props);
  }
}
