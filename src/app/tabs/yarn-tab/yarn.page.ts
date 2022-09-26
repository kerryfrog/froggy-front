import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { YarnService } from 'src/app/api/yarn.service';
// import { LocalStorageService } from '../../common/local-storage.service';
import {
  AlertController,
  LoadingController, 
  ModalController,
} from '@ionic/angular';

import { YarnDetailComponent } from 'src/app/components/yarn-detail/yarn-detail.component';

@Component({
  selector: 'app-yarn',
  templateUrl: 'yarn.page.html',
  styleUrls: ['yarn.page.scss']
})
export class YarnPage implements OnInit{
  public yarnList = [];

  constructor(
    public yarnService: YarnService,
    public modalController: ModalController,
  ) {}
  
  async ngOnInit() {

  }

  async ionViewDidEnter() {
    console.log("yarn page enter");
    
    await this.getYarnPageView();
    this.setFavoriteFalse();
    //this.checkIsYarnFavorite(favoriteYarnList);
  }

  async getYarnPageView() {
    const { data } = await this.yarnService.getRecommendYarnList();
    console.log("data", data);
    
    if (data.status === 'Y') {
      this.yarnList = [...this.yarnList, ...data.randYarn];
      console.log(data);
    }
    
  }

  async openYarnDetailModal(yarn) {
    const modal = await this.modalController.create({
      component: YarnDetailComponent,
      cssClass: 'modal-fullscreen',
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
  }
  enrollFavoriteYarn(e, yarn) {
    e.stopPropagation();
    let yarnResult = this.yarnList.filter((ya) => ya.id === yarn.id)[0];
    console.log("enrool favoaite yanr", yarnResult);
    
    if (yarnResult['isFavorite']) {
      yarnResult['isFavorite'] = false;  
    }
    else {
      yarnResult['isFavorite'] = true;
    }
    console.log(yarnResult);
    
  }
  deleteFavoriteYarn(e, yarn) {
    
  }

  // fetch favorite item
  async fetchEnrollFavoriteItem(yarn) {
    const payload = this.genPayload(yarn);
    const response = await this.yarnService.enrollFavoriteYarn(payload);
    if (response.status !== 200) return false;
    return true;
  }

  genPayload(yarn) {
    const payload = {
      yarnId:yarn.id,
    };
    return payload;
  }

  checkIsYarnFavorite(favoriteYarnList) {
    if (!favoriteYarnList) return;
    this.yarnList = this.yarnList.map((yarn) => {
      const isFavorite = favoriteYarnList.includes(yarn.id);
      if (isFavorite) {
        yarn.isFavorite = true;
      } else {
        yarn.isFavorite = false;
      }
      return yarn;
    });
  }

  onImageError(e) {
    
  }


  setFavoriteFalse() {
    for (let yarn of this.yarnList) {
      yarn['isFavorite'] = false;
    }
  }

  loadData(event) {
    setTimeout(async () => {
      await this.getYarnPageView();
      event.target.complete();
      // if (this.paging.curPage === this.paging.totalPage) {
      //   event.target.disabled = true;
      // }
    }, 500);
  }

}
