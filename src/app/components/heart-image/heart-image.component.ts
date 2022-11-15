import { Component, OnInit, Input } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";

import { UserService } from "src/app/services/user.service";
import { SigninComponent } from "../signin/signin.component";
import { PatternService } from "src/app/api/pattern.service";
import { YarnService } from "src/app/api/yarn.service";
import { NavigationExtras } from "@angular/router";
@Component({
  selector: "app-heart-image",
  templateUrl: "./heart-image.component.html",
  styleUrls: ["./heart-image.component.scss"],
})
export class HeartImageComponent implements OnInit {
  @Input() product;
  // @Input() isUser;
  @Input() type: string;

  @Input() setWidth: string = "";
  @Input() setHeight: string = "";
  @Input() link: boolean = true;
  public user;
  constructor(
    public userService: UserService,
    public modalController: ModalController,
    public navController: NavController,
    public patternService: PatternService,
    public yarnService: YarnService
  ) {}

  async ngOnInit() {}

  async goDetailPage() {
    if (this.type === "pattern" && this.link) {
      const props: NavigationExtras = {
        state: {
          pattern: this.product,
        },
      };
      this.navController.navigateForward(
        `/tabs/pattern/${this.product.id}`,
        props
      );
    }
    if (this.type === "yarn" && this.link) {
      const props: NavigationExtras = {
        state: {
          yarn: this.product,
        },
      };
      this.navController.navigateForward(
        `/tabs/yarn/${this.product.id}`,
        props
      );
    }
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
    if (this.type === "pattern") {
      const postPatternLikeResult = this.patternService.postPatternLike(id);
      console.log(postPatternLikeResult);
    }
    if (this.type === "yarn") {
      const postPatternLikeResult = this.yarnService.postYarnLike(id);
      console.log(postPatternLikeResult);
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
}
