import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YarnPage } from './yarn.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { YarnPageRoutingModule } from './yarn-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    YarnPageRoutingModule
  ],
  declarations: [YarnPage]
})
export class YarnPageModule {}
