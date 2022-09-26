import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-yarn-detail',
  templateUrl: './yarn-detail.page.html',
  styleUrls: ['./yarn-detail.page.scss'],
})
export class YarnDetailPage implements OnInit {

  constructor(
    public navController: NavController,
  ) { }

  ngOnInit() {
  }

  goBack() {  
    this.navController.navigateBack('tabs/yarn');
  }
}
