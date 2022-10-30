import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PostListComponent } from "./post-list.component";

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [PostListComponent],
  exports: [PostListComponent],
  entryComponents: [],
})
export class PostListComponentModule {}
