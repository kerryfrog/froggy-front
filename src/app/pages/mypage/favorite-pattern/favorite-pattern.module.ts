import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritePatternPageRoutingModule } from './favorite-pattern-routing.module';

import { FavoritePatternPage } from './favorite-pattern.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritePatternPageRoutingModule
  ],
  declarations: [FavoritePatternPage]
})
export class FavoritePatternPageModule {}
