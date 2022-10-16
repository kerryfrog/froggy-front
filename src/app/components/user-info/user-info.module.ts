import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserInfoComponent } from "./user-info.component";


@NgModule({
  imports: [IonicModule, CommonModule],
  declarations: [UserInfoComponent],
  exports: [UserInfoComponent],
  entryComponents: [],
})
export class UserInfoComponentModule {}
