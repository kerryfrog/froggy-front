import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
  },
  {
    path: "mypage",
    loadChildren: () =>
      import("./pages/mypage/mypage.module").then((m) => m.MypagePageModule),
  },
  {
    path: "pattern-detail",
    loadChildren: () =>
      import("./pages/pattern-detail/pattern-detail.module").then(
        (m) => m.PatternDetailPageModule
      ),
  },
  {
    path: "yarn-detail",
    loadChildren: () =>
      import("./pages/yarn-detail/yarn-detail.module").then(
        (m) => m.YarnDetailPageModule
      ),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
