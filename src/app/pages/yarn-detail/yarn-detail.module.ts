import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { YarnDetailPageRoutingModule } from "./yarn-detail-routing.module";

import { YarnDetailPage } from "./yarn-detail.page";
import { HeartImageComponentModule } from "src/app/components/heart-image/heart-image.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YarnDetailPageRoutingModule,
    HeartImageComponentModule,
  ],
  declarations: [YarnDetailPage],
})
export class YarnDetailPageModule {}
