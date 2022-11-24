import { Component, OnInit, Input } from "@angular/core";
import { NavController, ModalController } from "@ionic/angular";

import { UserService } from "src/app/services/user.service";
import { ProfileService } from "src/app/api/profile.service";
import { PatternService } from "src/app/api/pattern.service";
@Component({
  selector: "app-select-attribute",
  templateUrl: "./select-attribute.component.html",
  styleUrls: ["./select-attribute.component.scss"],
})
export class SelectAttributeComponent implements OnInit {
  @Input() user;
  public patternAttributeList = [];
  // public favoriteList = [];

  constructor(
    public modalController: ModalController,
    public patternService: PatternService,
    public profileService: ProfileService,
    public userService: UserService
  ) {}

  ngOnInit() {}

  public selectedStyle = {
    color: "rgb(37, 54, 37, 0.80)",
    background: "var(--ion-color-theme-light)",
  };
  public notSelectedStyle = {
    color: "gray",
    background: "white",
  };

  async ionViewDidEnter() {
    await this.getPatternAttributeList();
  }

  async getPatternAttributeList() {
    let userFavoriteAttribute = this.user.favoritePatternAttributeIdArr;
    if (!userFavoriteAttribute) {
      userFavoriteAttribute = [];
    }
    const patternAttributeListResult =
      await this.patternService.getPatternAttributeList();
    if (patternAttributeListResult.data.status === "Y") {
      for (let el of patternAttributeListResult.data.patternAttributeList) {
        if (userFavoriteAttribute.includes(el.id)) {
          el.isSelected = true;
        } else {
          el.isSelected = false;
        }
        this.patternAttributeList.push(el);
      }
    }
  }
  selectAttribute(attribute, event) {
    // console.log(attribute, event);
    // if (!attribute.isSelected) {
    //   this.favoriteList.push(attribute.id);
    // } else {
    //   this.favoriteList = this.favoriteList.filter((attributeId) => {
    //     return attribute.id !== attributeId;
    //   });
    // }
    attribute.isSelected = !attribute.isSelected;
  }

  async saveFavoriteAttribute() {
    const favoriteList = this.getFavoriteList();
    const saveFavoriteAttributeResult =
      await this.profileService.saveFavoriteAttribute({
        attributeList: favoriteList,
      });
    if (saveFavoriteAttributeResult.data.status === "Y") {
      this.user.favoritePatternAttributeIdArr = favoriteList;
      await this.userService.saveUser(this.user);
      this.goBackWithSuccess();
    }
  }

  getFavoriteList() {
    let favoriteList = [];
    for (let el of this.patternAttributeList) {
      if (el.isSelected) {
        favoriteList.push(el.id);
      }
    }
    favoriteList.sort();
    return favoriteList;
  }

  goBackWithSuccess() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  goBack() {
    this.modalController.dismiss({
      dismissed: false,
    });
  }
}
