import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YarnDetailPage } from './yarn-detail.page';

const routes: Routes = [
  {
    path: '',
    component: YarnDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YarnDetailPageRoutingModule {}
