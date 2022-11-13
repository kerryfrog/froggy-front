import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReviewListComponent } from "./review-list.component";
import { ApplicationPipesModule } from "src/app/commom/pipes/preview/module/application-pipes.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ApplicationPipesModule,
  ],
  declarations: [ReviewListComponent],
  exports: [ReviewListComponent],
  entryComponents: [],
})
export class ReviewListComponentModule {}
