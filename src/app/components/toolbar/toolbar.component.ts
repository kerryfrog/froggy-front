import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  constructor(
    public modalController: ModalController,
    public navController: NavController,
  ) { }

  ngOnInit() {}
  
    
  goMypage() {
    this.navController.navigateForward('mypage'); 
  }


}
