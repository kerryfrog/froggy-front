import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoritePatternPage } from './favorite-pattern.page';

const routes: Routes = [
  {
    path: '',
    component: FavoritePatternPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritePatternPageRoutingModule {}
