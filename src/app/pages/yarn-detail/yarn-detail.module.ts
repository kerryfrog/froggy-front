import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YarnDetailPageRoutingModule } from './yarn-detail-routing.module';

import { YarnDetailPage } from './yarn-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YarnDetailPageRoutingModule
  ],
  declarations: [YarnDetailPage]
})
export class YarnDetailPageModule {}
