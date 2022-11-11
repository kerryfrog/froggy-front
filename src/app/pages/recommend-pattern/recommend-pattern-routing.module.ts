import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecommendPatternPage } from './recommend-pattern.page';

const routes: Routes = [
  {
    path: '',
    component: RecommendPatternPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecommendPatternPageRoutingModule {}
