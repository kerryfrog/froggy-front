import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { FavoriteYarnPageRoutingModule } from "./favorite-yarn-routing.module";

import { FavoriteYarnPage } from "./favorite-yarn.page";
import { YarnGridComponentModule } from "src/app/components/yarn-grid/yarn-grid.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoriteYarnPageRoutingModule,
    YarnGridComponentModule,
  ],
  declarations: [FavoriteYarnPage],
})
export class FavoriteYarnPageModule {}
