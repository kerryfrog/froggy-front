import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MypagePageRoutingModule } from "./mypage-routing.module";

import { MypagePage } from "./mypage.page";
import { SignupComponent } from "src/app/components/signup/signup.component";
import { SignupComponentModule } from "src/app/components/signup/signup.module";
import { SigninComponentModule } from "src/app/components/signin/signin.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MypagePageRoutingModule,
    SignupComponentModule,
    SigninComponentModule,
  ],
  declarations: [MypagePage],
  entryComponents: [SignupComponent],
})
export class MypagePageModule {}
