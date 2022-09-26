import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { YarnService } from 'src/app/api/yarn.service';

@Component({
  selector: 'app-yarn-detail',
  templateUrl: './yarn-detail.page.html',
  styleUrls: ['./yarn-detail.page.scss'],
})
export class YarnDetailPage implements OnInit {
  
  public yarnId;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public navController: NavController,
    public yarnService: YarnService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.yarnId = params.yarnId;
    });
  }

  async ionViewDidEnter() {
    await this.getYarnDetail();
    
  }

  async getYarnDetail() {
    const yarnDetailResult = await this.yarnService.getYarnDetail(this.yarnId);
    if (yarnDetailResult.status === 'Y') {
      console.log("about yanr detail",yarnDetailResult);
      
    }
    else {
      this.failtoFetchYarnDetail();
    }
  }

  failtoFetchYarnDetail() {
    //this.navController.navigateBack('tabs/yarn');
  }

  goBack() {  
    this.navController.navigateBack('tabs/yarn');
  }
}
