import { Component, OnInit } from "@angular/core";
import { PatternService } from "src/app/api/pattern.service";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { LoadingController, NavController } from "@ionic/angular";
@Component({
  selector: "app-pattern-search",
  templateUrl: "./pattern-search.page.html",
  styleUrls: ["./pattern-search.page.scss"],
})
export class PatternSearchPage implements OnInit {
  public patternList = [];
  public value;
  public isWaiting = false;
  constructor(
    public patternService: PatternService,
    public navController: NavController
  ) {}

  ngOnInit() {}

  async handleChange(event) {
    this.value = event.target.value;
  }
  async search(event) {
    this.patternList = [];
    const value = this.value.replace(/(\s*)/g, "");
    if (value.length > 0) {
      this.isWaiting = true;
      const { data } = await this.patternService.getPatternSearchList(
        this.value
      );
      this.patternList = data["searchList"];
      this.isWaiting = false;
    }
  }

  async goPatternDetailPage(pattern) {
    const props: NavigationExtras = {
      state: {
        pattern,
      },
    };
    this.navController.navigateForward(`/tabs/pattern/${pattern.id}`, props);
  }
}
