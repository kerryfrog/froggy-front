import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatternPage } from './pattern.page';

const routes: Routes = [
  {
    path: '',
    component: PatternPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatternPageRoutingModule {}
