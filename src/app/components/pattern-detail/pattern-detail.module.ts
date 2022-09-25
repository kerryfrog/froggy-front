import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatternDetailComponent } from './pattern-detail.component';
import { ToolbarComponentModule } from '../../components/toolbar/toolbar.module';

@NgModule({
  imports: [IonicModule, CommonModule,ToolbarComponentModule],
  declarations: [PatternDetailComponent],
  exports: [PatternDetailComponent],
  entryComponents: [],
})
export class PatternDetailComponenttModule {}
