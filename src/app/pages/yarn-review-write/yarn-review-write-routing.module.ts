import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YarnReviewWritePage } from './yarn-review-write.page';

const routes: Routes = [
  {
    path: '',
    component: YarnReviewWritePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YarnReviewWritePageRoutingModule {}
