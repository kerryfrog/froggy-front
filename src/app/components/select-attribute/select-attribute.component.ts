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
  public favoriteList = [];

  constructor(
    public modalController: ModalController,
    public patternService: PatternService,
    public profileService: ProfileService,
    public userService: UserService
  ) {}

  ngOnInit() {}

  public selectedStyle = {
    color: "white",
    background: "#95c597",
  };
  public notSelectedStyle = {
    color: "lightgray",
    background: "white",
  };

  async ionViewDidEnter() {
    await this.getPatternAttributeList();
  }

  async getPatternAttributeList() {
    const patternAttributeListResult =
      await this.patternService.getPatternAttributeList();
    console.log(patternAttributeListResult);
    if (patternAttributeListResult.data.status === "Y") {
      for (let el of patternAttributeListResult.data.patternAttributeList) {
        el.isSelected = false;
        this.patternAttributeList.push(el);
      }
    }
  }
  selectAttribute(attribute, event) {
    console.log(attribute, event);
    if (!attribute.isSelected) {
      this.favoriteList.push(attribute.id);
    } else {
      this.favoriteList = this.favoriteList.filter((attributeId) => {
        return attribute.id !== attributeId;
      });
    }
    attribute.isSelected = !attribute.isSelected;
  }

  async saveFavoriteAttribute() {
    console.log(this.favoriteList);
    this.favoriteList.sort();
    const saveFavoriteAttributeResult =
      await this.profileService.saveFavoriteAttribute({
        attributeList: this.favoriteList,
      });
    console.log(saveFavoriteAttributeResult);
    if (saveFavoriteAttributeResult.data.status === "Y") {
      this.user.favoritePatternAttributeIdArr = this.favoriteList;
      await this.userService.saveUser(this.user);
      this.goBackWithSuccess();
    }
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
