import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { FavoritePatternPageRoutingModule } from "./favorite-pattern-routing.module";

import { FavoritePatternPage } from "./favorite-pattern.page";
import { PatternGridComponentModule } from "src/app/components/pattern-grid/pattern-grid.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritePatternPageRoutingModule,
    PatternGridComponentModule,
  ],
  declarations: [FavoritePatternPage],
})
export class FavoritePatternPageModule {}
