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
  public results;
  constructor(
    public patternService: PatternService,
    public navController: NavController
  ) {}

  ngOnInit() {}

  async handleChange(event) {
    this.results = event.target.value;
    const { data } = await this.patternService.getPatternSearchList(
      this.results
    );

    this.patternList = data["searchList"];
    console.log(this.patternList);
  }

  checkIsPatternFavorite(favoritePatternList) {
    if (!favoritePatternList) return;
    this.patternList = this.patternList.map((pattern) => {
      const patterns = { ...pattern };
      const isFavorite = favoritePatternList.includes(pattern.id);
      if (isFavorite) {
        patterns.isFavorite = true;
      } else {
        patterns.isFavorite = false;
      }
      return patterns;
    });
  }

  async goPatternDetailPage(pattern) {
    const props: NavigationExtras = {
      state: {
        pattern,
        previous: "tabs/pattern/search",
      },
    };
    this.navController.navigateForward(`/tabs/pattern/${pattern.id}`, props);
  }
}
