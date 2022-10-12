import { Component } from "@angular/core";
import { PatternService } from "src/app/api/pattern.service";

@Component({
  selector: "app-community",
  templateUrl: "community.page.html",
  styleUrls: ["community.page.scss"],
})
export class CommunityPage {
  public result = "";
  public flag = false;
  constructor(
    public patternService: PatternService,
  ) { }
  

  async getRecommendPatternList() {
    const aiPatternResult = await this.patternService.getAiPattern();
    console.log(aiPatternResult.data);
    
    if (aiPatternResult.data.status === 'Y') {
      this.result = aiPatternResult.data.patternList['test'];
      this.flag = true;
    }
    
  }

}
