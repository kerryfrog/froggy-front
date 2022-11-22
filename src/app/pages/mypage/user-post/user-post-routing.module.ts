import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UserPostPage } from "./user-post.page";

const routes: Routes = [
  {
    path: "",
    component: UserPostPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPostPageRoutingModule {}
