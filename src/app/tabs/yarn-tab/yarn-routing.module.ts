import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YarnPage } from './yarn.page';

const routes: Routes = [
  {
    path: '',
    component: YarnPage,
  },
  {
    path: "search",
    loadChildren: () =>
      import("src/app/pages/yarn-search/yarn-search.module").then(
        (m) => m.YarnSearchPageModule
      ),
  },
  {
    path:':yarnId',
      loadChildren: () =>
        import('src/app/pages/yarn-detail/yarn-detail.module').then(
          (m) => m.YarnDetailPageModule
        ),
  },
   {
    path:'review/:yarnId',
      loadChildren: () =>
        import('src/app/pages/yarn-review-write/yarn-review-write.module').then(
          (m) => m.YarnReviewWritePageModule
        ),
  },  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YarnPageRoutingModule {}
