import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainPage } from './main.page';



import { MainPageRoutingModule } from './main-routing.module';

import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { ToolbarComponentModule } from '../../components/toolbar/toolbar.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MainPageRoutingModule,
    ToolbarComponentModule,
  ],
  declarations: [MainPage],
  entryComponents: [
    ToolbarComponent, 
  ],
})
export class MainPageModule {}

