import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PatternPage } from "./pattern.page";

const routes: Routes = [
  {
    path: "",
    component: PatternPage,
  },
  {
    path: "search",
    loadChildren: () =>
      import("src/app/pages/pattern-search/pattern-search.module").then(
        (m) => m.PatternSearchPageModule
      ),
  },
  {
    path: ":patternId",
    loadChildren: () =>
      import("src/app/pages/pattern-detail/pattern-detail.module").then(
        (m) => m.PatternDetailPageModule
      ),
  },
  {
    path: "review/:patternId",
    loadChildren: () =>
      import(
        "src/app/pages/pattern-review-write/pattern-review-write.module"
      ).then((m) => m.PatternReviewWritePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatternPageRoutingModule {}
