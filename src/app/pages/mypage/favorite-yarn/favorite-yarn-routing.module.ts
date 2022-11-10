import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoriteYarnPage } from './favorite-yarn.page';

const routes: Routes = [
  {
    path: '',
    component: FavoriteYarnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoriteYarnPageRoutingModule {}
