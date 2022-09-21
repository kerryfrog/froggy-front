import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarComponent } from './toolbar.component';

@NgModule({
  imports: [IonicModule, CommonModule],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
  entryComponents: [],
})
export class ToolbarComponentModule {}
