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
  public title;
  

  constructor(
    public modalController: ModalController,
    public communityService:CommunityService,
  ) { }

  ngOnInit() {
  }

  myCallback(event) {
    //editor, html, text, content, delta, oldDelta, source
    //console.log("testing", event.text);
    this.contents = event.text;
  }

  
  async submitPost() {
    const payload: Post = {
      title: this.title,
      contents : this.contents
    }

    const savePostResult = await this.communityService.saveNewPost(payload);
    console.log("ㅅㄷㄴㅅ",savePostResult);
    
    if (savePostResult.data.status === 'Y') {
      this.goBack();
    }

  }

  goBack() {
    this.modalController.dismiss({
      dismissed: false,
    });
  }
  

}
