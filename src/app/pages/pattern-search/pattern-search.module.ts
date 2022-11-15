import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PatternSearchPageRoutingModule } from "./pattern-search-routing.module";

import { PatternSearchPage } from "./pattern-search.page";
import { ToolbarComponentModule } from "../../components/toolbar/toolbar.module";
import { PatternGridComponentModule } from "src/app/components/pattern-grid/pattern-grid.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatternSearchPageRoutingModule,
    ToolbarComponentModule,
    PatternGridComponentModule,
  ],
  declarations: [PatternSearchPage],
})
export class PatternSearchPageModule {}
