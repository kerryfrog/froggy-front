import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatternSearchPage } from './pattern-search.page';

const routes: Routes = [
  {
    path: '',
    component: PatternSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatternSearchPageRoutingModule {}
