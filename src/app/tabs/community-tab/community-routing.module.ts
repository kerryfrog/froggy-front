import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommunityPage } from "./community.page";

const routes: Routes = [
  {
    path: "",
    component: CommunityPage,
  },
  {
    path:':postId',
      loadChildren: () =>
        import('src/app/pages/post-detail/post-detail.module').then(
          (m) => m.PostDetailPageModule
        ),
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityPageRoutingModule {}
