import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { YarnPage } from "./yarn.page";

import { YarnPageRoutingModule } from "./yarn-routing.module";
import { ToolbarComponentModule } from "../../components/toolbar/toolbar.module";
import { YarnGridComponentModule } from "src/app/components/yarn-grid/yarn-grid.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: "", component: YarnPage }]),
    YarnPageRoutingModule,
    ToolbarComponentModule,
    YarnGridComponentModule,
  ],
  declarations: [YarnPage],
})
export class YarnPageModule {}
