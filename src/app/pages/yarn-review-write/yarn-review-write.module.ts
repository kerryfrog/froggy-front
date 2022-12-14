import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { YarnReviewWritePageRoutingModule } from "./yarn-review-write-routing.module";

import { YarnReviewWritePage } from "./yarn-review-write.page";

import { StarRatingComponentModule } from "src/app/components/star-rating/star-rating.module";
import { PhotoMultiComponentModule } from "src/app/components/photo-multi/photo-multi.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YarnReviewWritePageRoutingModule,
    StarRatingComponentModule,
    PhotoMultiComponentModule,
  ],
  declarations: [YarnReviewWritePage],
})
export class YarnReviewWritePageModule {}
