import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SignupComponent } from "./signup.component";

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [SignupComponent],
  exports: [SignupComponent],
  entryComponents: [],
})
export class SignupComponentModule {}
