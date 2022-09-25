import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YarnDetailComponent } from './yarn-detail.component';
import { ToolbarComponentModule } from '../../components/toolbar/toolbar.module';

@NgModule({
  imports: [IonicModule, CommonModule,ToolbarComponentModule],
  declarations: [YarnDetailComponent],
  exports: [YarnDetailComponent],
  entryComponents: [],
})
export class YarnDetailComponentModule {}
