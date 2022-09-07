import { Component } from '@angular/core';
import { DataService } from 'src/app/api/data.service';


@Component({
  selector: 'app-main',
  templateUrl: 'main.page.html',
  styleUrls: ['main.page.scss']
})
export class MainPage {

  constructor(
    public dataService: DataService,
  ) {}

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }

  async getRaverlyApi() {
    const yarnId = this.getRandomInt(1, 10000);
    const response = await this.dataService.getYarnDataFromRaverly(yarnId);
    console.log("response",response);
    const postResult = await this.dataService.postYarnData(response);
  }


}
