import { Component } from "@angular/core";
import { PatternService } from "src/app/api/pattern.service";
import { ModalController, NavController } from "@ionic/angular";

import { WriteComponent } from "src/app/components/write/write.component";
import { CommunityService } from "src/app/api/community.service";

@Component({
  selector: "app-community",
  templateUrl: "community.page.html",
  styleUrls: ["community.page.scss"],
})
export class CommunityPage {
  public result = "";
  public flag = false;
  public postList;


  constructor(
    public patternService: PatternService,
    public modalController: ModalController,
    public communityService:CommunityService,
  ) { }
  
  async ionViewDidEnter() {
    const result = await this.communityService.getMainPosts();

    console.log("getMainPost result", result.data.postList);
    if (result.data.status === 'Y') {
      this.postList = result.data.postList;
    }
  }


  async getRecommendPatternList() {
    const aiPatternResult = await this.patternService.getAiPattern();
    
    if (aiPatternResult.data.status === 'Y') {
      this.result = aiPatternResult.data.patternList['test'];
      this.flag = true;
    }
    
  }

  async write() {
    const modal = await this.modalController.create({
      component: WriteComponent,
      cssClass: "modal-fullscreen",
    });
    await modal.present();  
  }


}
