import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { YarnSearchPageRoutingModule } from "./yarn-search-routing.module";

import { YarnSearchPage } from "./yarn-search.page";
import { ToolbarComponentModule } from "../../components/toolbar/toolbar.module";

import { YarnGridComponentModule } from "src/app/components/yarn-grid/yarn-grid.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YarnSearchPageRoutingModule,
    ToolbarComponentModule,
    YarnGridComponentModule,
  ],
  declarations: [YarnSearchPage],
})
export class YarnSearchPageModule {}
