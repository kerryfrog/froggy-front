import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SigninComponent } from "./signin.component";

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [SigninComponent],
  exports: [SigninComponent],
  entryComponents: [],
})
export class SigninComponentModule {}
