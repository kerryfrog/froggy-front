import { Component } from '@angular/core';
import { DataService } from 'src/app/api/data.service';
import { PatternService } from 'src/app/api/pattern.service';
import {
  AlertController,
  LoadingController, 
  ModalController,
} from '@ionic/angular';

import { PatternDetailComponent } from 'src/app/components/pattern-detail/pattern-detail.component';


@Component({
  selector: 'app-pattern',
  templateUrl: 'pattern.page.html',
  styleUrls: ['pattern.page.scss']
})
export class PatternPage {
  public min;
  public max;
  public nowIndex =-1;
  public patternList = [];

  constructor(
    public dataService: DataService,
    public alertController: AlertController,
    public patternService: PatternService,
    public modalController: ModalController,
  ) {}


  async ionViewDidEnter() {
    console.log("pattern page enter");
    await this.getPatternPageView();
  }

  async getRaverlyApi() {
    if (
      !this.min ||
      !this.max
    ) {
      const alert = await this.alertController.create({
        header: '에러',
        message: '범위를 입력해 주세요',
        buttons: ['확인'],
      });
      await alert.present();
      return;
    }
    const subHeader = `index 가 ${this.min} ~ ${this.max}인 `;
    const message = 'api 를 호출하시겠습니까?';
    let flag = false;
    const alert = await this.alertController.create({
          subHeader,
          message,
          buttons: [ 
          {
            text: '취소',
              handler: async () => {
                this.alertController.dismiss();
              }
          },
            {
              text: '확인',
              handler: async () => { 
                await this.getAndFetchYarnData();
                flag = true;
              },
            },
          ],
    }); 
    await alert.present();
  }
  async getAndFetchYarnData() {
    for (let i = this.min; i <= this.max; i++){
      const response = await this.dataService.getPatternDataFromRaverly(i);
      console.log("for i =", i , response);
      const postResult = await this.dataService.postPatternData(response);
      
      this.nowIndex = i;
    }
  }

  async getPatternPageView() {
    const { data } = await this.patternService.getRecommendPatternList();
    console.log(data);
    
    if (data.status === 'Y') {
      this.patternList = data.patternList;
      console.log(data);
      console.log(this.patternList);
    }
   
  }

  async openPatternDetailModal(pattern) {
    const modal = await this.modalController.create({
      component: PatternDetailComponent,
      cssClass: 'modal-fullscreen',
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

  }
  enrollFavoritePattern(e, pattern) {
    
  }
  deleteFavoritePattern(e, pattern) {
    
  }

  onImageError(e) {
    
  }


}
