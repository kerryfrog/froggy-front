import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { WriteComponent } from "./write.component";

import { QuillModule } from "ngx-quill";

@NgModule({
  imports: [IonicModule, FormsModule, CommonModule, QuillModule.forRoot()],
  declarations: [WriteComponent],
  exports: [WriteComponent],
  entryComponents: [],
})
export class WriteComponentModule {}
