import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecommendPatternPageRoutingModule } from './recommend-pattern-routing.module';

import { RecommendPatternPage } from './recommend-pattern.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommendPatternPageRoutingModule
  ],
  declarations: [RecommendPatternPage]
})
export class RecommendPatternPageModule {}
