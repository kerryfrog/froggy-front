import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from "@ionic/angular";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

import { Post } from "../../models/server-request";

import { CommunityService } from 'src/app/api/community.service';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss'],
})
export class WriteComponent implements OnInit {
  public ionicForm: FormGroup;
  public isSubmitted;
  public contents;

  public post: Post;

  constructor(
    public modalController: ModalController,
    public communityService:CommunityService,
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.modalController.dismiss({
      dismissed: false,
    });
  }

  myCallback(event) {
    //editor, html, text, content, delta, oldDelta, source
    console.log("testing", event.text);
    this.post.contents = event.text;
  }

  async submitPost() {
    await this.communityService.postNewPost(this.post);
    
  }
  
}
