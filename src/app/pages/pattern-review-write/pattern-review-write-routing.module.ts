import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatternReviewWritePage } from './pattern-review-write.page';

const routes: Routes = [
  {
    path: '',
    component: PatternReviewWritePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatternReviewWritePageRoutingModule {}
