import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { YarnService } from 'src/app/api/yarn.service';
import {
  AlertController,
  LoadingController, 
  ModalController,
} from '@ionic/angular';

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
  }

  async getYarnPageView() {
    const { data } = await this.yarnService.getRecommendYarnList();
    console.log("data", data);
    
    if (data.status === 'Y') {
      this.yarnList = data.randYarn;
      console.log(data);
      
    }
    
  }

  openYarnDetailModal(yarn) {
    
  }
  enrollFavoriteYarn(e, yarn) {
    
  }
  deleteFavoriteYarn(e, yarn) {
    
  }

  onImageError(e) {
    
  }
}
