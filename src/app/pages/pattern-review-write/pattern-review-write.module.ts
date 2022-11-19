import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PatternReviewWritePageRoutingModule } from "./pattern-review-write-routing.module";

import { PatternReviewWritePage } from "./pattern-review-write.page";
import { StarRatingComponentModule } from "src/app/components/star-rating/star-rating.module";
import { PhotoMultiComponentModule } from "src/app/components/photo-multi/photo-multi.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatternReviewWritePageRoutingModule,
    StarRatingComponentModule,
    PhotoMultiComponentModule,
  ],
  declarations: [PatternReviewWritePage],
})
export class PatternReviewWritePageModule {}
