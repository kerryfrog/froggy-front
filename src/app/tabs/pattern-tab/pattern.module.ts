import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PatternPage } from "./pattern.page";

import { PatternPageRoutingModule } from "./pattern-routing.module";
import { ToolbarComponentModule } from "../../components/toolbar/toolbar.module";
import { PatternGridComponentModule } from "src/app/components/pattern-grid/pattern-grid.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: "", component: PatternPage }]),
    PatternPageRoutingModule,
    ToolbarComponentModule,
    PatternGridComponentModule,
  ],
  declarations: [PatternPage],
})
export class PatternPageModule {}
