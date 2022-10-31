import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserInfoComponent } from "./user-info.component";
import { FormsModule} from '@angular/forms';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule],
  declarations: [UserInfoComponent],
  exports: [UserInfoComponent],
  entryComponents: [],
})
export class UserInfoComponentModule {}
