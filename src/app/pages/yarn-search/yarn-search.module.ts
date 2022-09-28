import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YarnSearchPageRoutingModule } from './yarn-search-routing.module';

import { YarnSearchPage } from './yarn-search.page';
import { ToolbarComponentModule } from "../../components/toolbar/toolbar.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YarnSearchPageRoutingModule,
     ToolbarComponentModule,
  ],
  declarations: [YarnSearchPage]
})
export class YarnSearchPageModule {}
