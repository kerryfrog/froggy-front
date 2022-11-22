import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { RecommendPatternPageRoutingModule } from "./recommend-pattern-routing.module";

import { RecommendPatternPage } from "./recommend-pattern.page";
import { RecommendListComponentModule } from "src/app/components/recommend-list/recommend-list.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommendPatternPageRoutingModule,
    RecommendListComponentModule,
  ],
  declarations: [RecommendPatternPage],
})
export class RecommendPatternPageModule {}
