import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatternPage } from './pattern.page';

const routes: Routes = [
  {
    path: '',
    component: PatternPage,
  },
  {
    path:':patternId',
      loadChildren: () =>
        import('src/app/pages/pattern-detail/pattern-detail.module').then(
          (m) => m.PatternDetailPageModule
        ),
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatternPageRoutingModule {}
