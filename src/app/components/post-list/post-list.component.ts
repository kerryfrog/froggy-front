import { Component, OnInit, Input } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"],
})
export class PostListComponent implements OnInit {
  @Input() postList;

  constructor(public navController: NavController) {}

  ngOnInit() {
    //this.setShortPost();
  }

  goPostDetailPage(postId) {
    this.navController.navigateForward(`/community/${postId}`);
  }
}
