import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YarnPage } from './yarn.page';

const routes: Routes = [
  {
    path: '',
    component: YarnPage,
  },
  {
    path:'yarn-detail/:yarnId',
      loadChildren: () =>
        import('src/app/pages/yarn-detail/yarn-detail.module').then(
          (m) => m.YarnDetailPageModule
        ),
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YarnPageRoutingModule {}
