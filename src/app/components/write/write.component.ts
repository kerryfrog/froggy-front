import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from "@ionic/angular";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

import { Post } from "../../models/server-request";

import { UserService } from 'src/app/services/user.service';
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
    public communityService: CommunityService,
    public userService: UserService,
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
   
    if (savePostResult.data.isUserLogin === 'N') {
      this.setUserSyncWithServer()
    }

    if (savePostResult.data.status === 'Y') {
      this.goBack();
    }

  }

  async setUserSyncWithServer() {
    await this.userService.deleteUser();
    alert('다시 로그인 해 주세요');
  }

  goBack() {
    this.modalController.dismiss({
      dismissed: false,
    });
  }
  

}
