import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PostListComponent } from "./post-list.component";
import { ApplicationPipesModule } from "src/app/commom/pipes/preview/module/application-pipes.module";


@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, ApplicationPipesModule ],
  declarations: [PostListComponent],
  exports: [PostListComponent],
  entryComponents: [],
})
export class PostListComponentModule {}
