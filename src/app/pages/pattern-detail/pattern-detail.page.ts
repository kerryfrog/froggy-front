import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-pattern-detail',
  templateUrl: './pattern-detail.page.html',
  styleUrls: ['./pattern-detail.page.scss'],
})
export class PatternDetailPage implements OnInit {

  constructor(
    public navController: NavController,
  ) { }

  ngOnInit() {
  }
  goBack() {  
    this.navController.navigateBack('tabs/pattern');
  }

}
