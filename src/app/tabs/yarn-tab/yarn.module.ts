import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YarnPage } from './yarn.page';

import { YarnPageRoutingModule } from './yarn-routing.module';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { ToolbarComponentModule } from '../../components/toolbar/toolbar.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    YarnPageRoutingModule,
    ToolbarComponentModule,
  ],
  declarations: [YarnPage]
})
export class YarnPageModule {}
