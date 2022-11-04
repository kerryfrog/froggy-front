import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"],
})
export class TabsPage {
  @ViewChild("tabs", { static: false }) tabs: any;
  constructor() {}

  public isMainIconSelected = false;
  public isYarnIconSelected = false;
  public isPatternIconSelected = false;
  public isCommunityIconSelected = false;

  async ngOnInit() {
    //console.log(this.tabs.getSelected());
  }

  handleTabsChange(event) {
    console.log(event.tab);
    this.clearAll();
    if (event.tab === "main") {
      this.isMainIconSelected = true;
    } else if (event.tab === "yarn") {
      this.isYarnIconSelected = true;
    } else if (event.tab === "pattern") {
      this.isPatternIconSelected = true;
    } else if (event.tab === "community") {
      this.isCommunityIconSelected = true;
    }
  }

  clearAll() {
    this.isMainIconSelected = false;
    this.isYarnIconSelected = false;
    this.isPatternIconSelected = false;
    this.isCommunityIconSelected = false;
  }
}
