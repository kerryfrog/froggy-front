import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PatternDetailPage } from "./pattern-detail.page";

const routes: Routes = [
  {
    path: "",
    component: PatternDetailPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatternDetailPageRoutingModule {}
