import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { UserPostPageRoutingModule } from "./user-post-routing.module";
import { PostListComponentModule } from "src/app/components/post-list/post-list.module";
import { UserPostPage } from "./user-post.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPostPageRoutingModule,
    PostListComponentModule,
  ],
  declarations: [UserPostPage],
})
export class UserPostPageModule {}
