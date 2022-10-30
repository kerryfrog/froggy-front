import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CommunityPage } from "./community.page";

import { CommunityPageRoutingModule } from "./community-routing.module";
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";
import { ToolbarComponentModule } from "../../components/toolbar/toolbar.module";
import { WriteComponentModule } from "src/app/components/write/write.module";

import { PostListComponent } from 'src/app/components/post-list/post-list.component';
import { PostListComponentModule } from 'src/app/components/post-list/post-list.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: "", component: CommunityPage }]),
    CommunityPageRoutingModule,
    ToolbarComponentModule,
    WriteComponentModule,
    PostListComponentModule,
  ],
  declarations: [CommunityPage],
})
export class CommunityPageModule {}
