import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MainPage } from "./main.page";

import { MainPageRoutingModule } from "./main-routing.module";

import { ToolbarComponent } from "../../components/toolbar/toolbar.component";
import { ToolbarComponentModule } from "../../components/toolbar/toolbar.module";
import { PostListComponent } from "src/app/components/post-list/post-list.component";
import { PostListComponentModule } from "src/app/components/post-list/post-list.module";
import { RecommendListComponentModule } from "src/app/components/recommend-list/recommend-list.module";
import { HeartImageComponentModule } from "src/app/components/heart-image/heart-image.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MainPageRoutingModule,
    ToolbarComponentModule,
    PostListComponentModule,
    RecommendListComponentModule,
    HeartImageComponentModule,
  ],
  declarations: [MainPage],
  entryComponents: [ToolbarComponent, PostListComponent],
})
export class MainPageModule {}
