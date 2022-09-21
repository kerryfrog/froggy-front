import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  constructor(
    public navController: NavController,
  ) { }

  ngOnInit() {}
  
  
  goMypage() {
    console.log("test");
    
    this.navController.navigateForward('mypage'); 

  }

}
