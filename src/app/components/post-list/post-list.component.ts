import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from "@ionic/angular";


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  @Input() postList;
  
  
  constructor(
    public navController: NavController,
  ) { }

  ngOnInit() {
    //this.setShortPost();
  }
  
  setShortPost(){
    for (let post of this.postList) {
      console.log(post.contents.length);
      
      if (post.contents.length >= 100) {
        console.log("longer");
        
        post.contentsForShow = post.contents.substring(0, 100) + "...";
      } else {
        post.contentsForShow = post.contents;
      }

    }
  }


  goPostDetailPage(postId) {
    this.navController.navigateForward(`/tabs/community/${postId}`);
  }
}
