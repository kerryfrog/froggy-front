import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-yarn-detail',
  templateUrl: './yarn-detail.component.html',
  styleUrls: ['./yarn-detail.component.scss'],
})
export class YarnDetailComponent implements OnInit {

  constructor(
    public modalController: ModalController,
  ) { }

  ngOnInit() {}

  goBack() {
    this.modalController.dismiss({ dismissed: true });
  }
}
