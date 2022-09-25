import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pattern-detail',
  templateUrl: './pattern-detail.component.html',
  styleUrls: ['./pattern-detail.component.scss'],
})
export class PatternDetailComponent implements OnInit {

  constructor(
    public modalController: ModalController,
  ) { }

  ngOnInit() {}
  goBack() {  
    this.modalController.dismiss({ dismissed: true });
  }
}
