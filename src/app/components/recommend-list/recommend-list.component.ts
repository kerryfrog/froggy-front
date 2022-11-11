import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
} from "@ionic/angular";
import { PatternService } from "src/app/api/pattern.service";
@Component({
  selector: "app-recommend-list",
  templateUrl: "./recommend-list.component.html",
  styleUrls: ["./recommend-list.component.scss"],
})
export class RecommendListComponent implements OnInit {
  @Input() patternList;
  constructor(
    public navController: NavController,
    public patternService: PatternService
  ) {}

  ngOnInit() {}
  async enrollFavoritePattern(e, pattern) {
    e.stopPropagation();
    let patternResult = this.patternList.filter(
      (pa) => pa.id === pattern.id
    )[0];

    if (patternResult["isFavorite"]) {
      this.fetchEnrollFavoritePattern(pattern.id);
      patternResult["isFavorite"] = false;
    } else {
      this.fetchEnrollFavoritePattern(pattern.id);
      patternResult["isFavorite"] = true;
    }
    console.log(patternResult);
  }
  fetchEnrollFavoritePattern(patternId) {
    const postPatternLikeResult =
      this.patternService.postPatternLike(patternId);
    console.log(postPatternLikeResult);
  }

  goRecommendPatternPage() {
    this.navController.navigateForward(`/recommend-pattern`);
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
