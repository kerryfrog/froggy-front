import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StarRatingComponent } from "./star-rating.component";

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [StarRatingComponent],
  exports: [StarRatingComponent],
  entryComponents: [],
})
export class StarRatingComponentModule {}
