import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoriteYarnPageRoutingModule } from './favorite-yarn-routing.module';

import { FavoriteYarnPage } from './favorite-yarn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoriteYarnPageRoutingModule
  ],
  declarations: [FavoriteYarnPage]
})
export class FavoriteYarnPageModule {}
