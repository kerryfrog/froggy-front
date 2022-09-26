import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatternDetailPageRoutingModule } from './pattern-detail-routing.module';

import { PatternDetailPage } from './pattern-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatternDetailPageRoutingModule
  ],
  declarations: [PatternDetailPage]
})
export class PatternDetailPageModule {}