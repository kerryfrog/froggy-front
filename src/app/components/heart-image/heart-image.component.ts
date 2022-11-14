import { Component, OnInit, Input } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";

import { UserService } from "src/app/services/user.service";
import { SigninComponent } from "../signin/signin.component";
import { PatternService } from "src/app/api/pattern.service";
@Component({
  selector: "app-heart-image",
  templateUrl: "./heart-image.component.html",
  styleUrls: ["./heart-image.component.scss"],
})
export class HeartImageComponent implements OnInit {
  @Input() product;
  // @Input() isUser;
  @Input() type: string;

  public user;
  constructor(
    public userService: UserService,
    public modalController: ModalController,
    public patternService: PatternService
  ) {}

  async ngOnInit() {}

  async enrollFavorite(event, product) {
    this.user = await this.userService.getUser();
    console.log("favoirte user info", this.user);

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
