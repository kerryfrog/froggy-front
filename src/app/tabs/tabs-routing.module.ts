import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "main",
        loadChildren: () =>
          import("./main-tab/main.module").then((m) => m.MainPageModule),
      },
      {
        path: "yarn",
        loadChildren: () =>
          import("./yarn-tab/yarn.module").then((m) => m.YarnPageModule),
      },
      {
        path: "pattern",
        loadChildren: () =>
          import("./pattern-tab/pattern.module").then(
            (m) => m.PatternPageModule
          ),
      },
      {
        path: "community",
        loadChildren: () =>
          import("./community-tab/community.module").then(
            (m) => m.CommunityPageModule
          ),
      },
      {
        path: "",
        redirectTo: "/tabs/main",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/tabs/main",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
