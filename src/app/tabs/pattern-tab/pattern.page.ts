import { Component } from '@angular/core';
import { DataService } from 'src/app/api/data.service';
import { PatternService } from 'src/app/api/pattern.service';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
// import { LocalStorageService } from '../../common/local-storage.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

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
    public navController: NavController,
    public dataService: DataService,
    public alertController: AlertController,
    public patternService: PatternService,
    public modalController: ModalController,
  ) {}


  async ionViewDidEnter() {
    await this.getPatternPageView();
    this.setFavoriteFalse(this.patternList);
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

  setFavoriteFalse(newPatternList) {
    for (let pattern of newPatternList) {
      pattern['isFavorite'] = false;
    }
    return newPatternList;
  }


  async getPatternPageView() {
    const { data } = await this.patternService.getRecommendPatternList();
    console.log(data);
    
    if (data.status === 'Y') {
      const newPatternListWithIsFavorite = this.setFavoriteFalse(data.patternList);
      this.patternList = [...this.patternList, ...newPatternListWithIsFavorite];
    }
   
  }

  async goPatternDetailPage(pattern) {
    const props: NavigationExtras = {
      state: {
        pattern
      }
    }
    this.navController.navigateForward(
      `/tabs/pattern/${pattern.id}`,
      props
    );
  }
  async enrollFavoritePattern(e, pattern) {
    e.stopPropagation();
    let patternResult = this.patternList.filter((pa) => pa.id === pattern.id)[0];
    
    if (patternResult['isFavorite']) {
      patternResult['isFavorite'] = false;  
    }
    else {
      patternResult['isFavorite'] = true;
    }
    console.log(patternResult);
  }

  checkIsPatternFavorite(favoritePatternList){
    if (!favoritePatternList) return;
    this.patternList = this.patternList.map((pattern) => {
      const patterns = { ...pattern };
      const isFavorite = favoritePatternList.includes(pattern.id);
      if (isFavorite) {
        patterns.isFavorite = true;
      } else {
        patterns.isFavorite = false;
      }
      return patterns;
    });
  }

  fetchEnrollFavoritePattern(pattern) {
    
  }

  deleteFavoritePattern(e, pattern) {
    
  }

  onImageError(e) {
    
  }

  loadData(event) {
    setTimeout(async () => {
      await this.getPatternPageView();
      event.target.complete(); 
      // if (this.paging.curPage === this.paging.totalPage) {
      //   event.target.disabled = true;
      // }
    }, 500);
  }
}
