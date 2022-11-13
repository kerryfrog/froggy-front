import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { UserReviewPageRoutingModule } from "./user-review-routing.module";

import { UserReviewPage } from "./user-review.page";
import { ReviewListComponentModule } from "src/app/components/review-list/review-list.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserReviewPageRoutingModule,
    ReviewListComponentModule,
  ],
  declarations: [UserReviewPage],
})
export class UserReviewPageModule {}
