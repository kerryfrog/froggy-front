import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RecommendListComponent } from "./recommend-list.component";
import { ApplicationPipesModule } from "src/app/commom/pipes/preview/module/application-pipes.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ApplicationPipesModule,
  ],
  declarations: [RecommendListComponent],
  exports: [RecommendListComponent],
  entryComponents: [],
})
export class RecommendListComponentModule {}
