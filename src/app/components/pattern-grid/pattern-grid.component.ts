import { Component, OnInit, Input } from "@angular/core";
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
} from "@ionic/angular";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";

import { PatternService } from "src/app/api/pattern.service";

@Component({
  selector: "app-pattern-grid",
  templateUrl: "./pattern-grid.component.html",
  styleUrls: ["./pattern-grid.component.scss"],
})
export class PatternGridComponent implements OnInit {
  @Input() patternList;
  constructor(
    public navController: NavController,
    public alertController: AlertController,
    public patternService: PatternService,
    public modalController: ModalController
  ) {}

  ngOnInit() {}

  // async goPatternDetailPage(pattern) {
  //   const props: NavigationExtras = {
  //     state: {
  //       pattern,
  //     },
  //   };
  //   this.navController.navigateForward(`/tabs/pattern/${pattern.id}`, props);
  // }

  // async enrollFavoritePattern(e, pattern) {
  //   e.stopPropagation();
  //   let patternResult = this.patternList.filter(
  //     (pa) => pa.id === pattern.id
  //   )[0];

  //   if (patternResult["isFavorite"]) {
  //     this.fetchEnrollFavoritePattern(pattern.id);
  //     patternResult["isFavorite"] = false;
  //   } else {
  //     this.fetchEnrollFavoritePattern(pattern.id);
  //     patternResult["isFavorite"] = true;
  //   }
  //   console.log(patternResult);
  // }

  // fetchEnrollFavoritePattern(patternId) {
  //   const postPatternLikeResult =
  //     this.patternService.postPatternLike(patternId);
  //   console.log(postPatternLikeResult);
  // }
}
