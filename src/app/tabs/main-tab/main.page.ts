import { Component } from '@angular/core';
import { DataService } from 'src/app/api/data.service';
import {
  AlertController,
  LoadingController,
} from '@ionic/angular';


@Component({
  selector: 'app-main',
  templateUrl: 'main.page.html',
  styleUrls: ['main.page.scss']
})
export class MainPage {
  public min;
  public max;
  public nowIndex = -1;
  constructor(
    public dataService: DataService,
    public alertController: AlertController,
  ) {}

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
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
      const response = await this.dataService.getYarnDataFromRaverly(i);
      console.log("for i =", i , response);
      const postResult = await this.dataService.postYarnData(response);
      
      this.nowIndex = i;
    }
  }
}
