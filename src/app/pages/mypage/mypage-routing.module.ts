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
      import("src/app/pages/user-info/user-info.module").then(
        (m) => m.UserInfoPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MypagePageRoutingModule {}
