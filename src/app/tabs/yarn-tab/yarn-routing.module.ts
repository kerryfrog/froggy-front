import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YarnPage } from './yarn.page';

const routes: Routes = [
  {
    path: '',
    component: YarnPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YarnPageRoutingModule {}
