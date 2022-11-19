import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { PhotoMultiComponent } from "./photo-multi.component";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  declarations: [PhotoMultiComponent],
  exports: [PhotoMultiComponent],
})
export class PhotoMultiComponentModule {}
