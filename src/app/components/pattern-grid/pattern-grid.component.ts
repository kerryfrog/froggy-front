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
}
