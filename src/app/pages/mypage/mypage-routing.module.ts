import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MypagePage } from "./mypage.page";

const routes: Routes = [
  {
    path: "",
    component: MypagePage,
  },
  {
    path: "profile",
    loadChildren: () =>
      import("src/app/pages/mypage/user-info/user-info.module").then(
        (m) => m.UserInfoPageModule
      ),
  },
  {
    path: "favorite/pattern",
    loadChildren: () =>
      import(
        "src/app/pages/mypage/favorite-pattern/favorite-pattern.module"
      ).then((m) => m.FavoritePatternPageModule),
  },
  {
    path: "favorite/yarn",
    loadChildren: () =>
      import("src/app/pages/mypage/favorite-yarn/favorite-yarn.module").then(
        (m) => m.FavoriteYarnPageModule
      ),
  },
  {
    path: "user-review",
    loadChildren: () =>
      import("./user-review/user-review.module").then(
        (m) => m.UserReviewPageModule
      ),
  },
  {
    path: "user-post",
    loadChildren: () =>
      import("./user-post/user-post.module").then((m) => m.UserPostPageModule),
  },
  {
    path: "lottery",
    loadChildren: () =>
      import("./lottery/lottery.module").then((m) => m.LotteryPageModule),
  },
  {
    path: "thanks",
    loadChildren: () =>
      import("./thanks/thanks.module").then((m) => m.ThanksPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MypagePageRoutingModule {}
