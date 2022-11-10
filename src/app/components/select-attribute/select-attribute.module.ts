import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SelectAttributeComponent } from "./select-attribute.component";

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [SelectAttributeComponent],
  exports: [SelectAttributeComponent],
  entryComponents: [],
})
export class SelectAttributeComponentModule {}
