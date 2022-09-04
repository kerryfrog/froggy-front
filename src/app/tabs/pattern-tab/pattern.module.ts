import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatternPage } from './pattern.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { PatternPageRoutingModule } from './pattern-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: PatternPage }]),
    PatternPageRoutingModule,
  ],
  declarations: [PatternPage]
})
export class PatternPageModule {}
