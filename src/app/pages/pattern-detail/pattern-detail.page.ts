import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { PatternService } from 'src/app/api/pattern.service';

@Component({
  selector: 'app-pattern-detail',
  templateUrl: './pattern-detail.page.html',
  styleUrls: ['./pattern-detail.page.scss'],
})
export class PatternDetailPage implements OnInit {
  public patternId;
  public pattern :any = {};
  public patternImg = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public navController: NavController,
    public patternService: PatternService,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
       if (this.router.getCurrentNavigation().extras.state) {
        this.pattern = this.router.getCurrentNavigation().extras.state.pattern;
      }
      this.patternId = params.patternId;
    });
    console.log("this pattern", this.pattern);
  }

  async ionViewDidEnter(){
    //await this.getYarnDetail();  
  }

  // async getYarnDetail() {
  //   const yarnDetailResult = await this.patternService.getPatternDetail(this.patternId);
  //   console.log("yarnDetailResult", yarnDetailResult);
    
  //   if (yarnDetailResult.status === 'Y') {
  //     console.log("about yanr detail",yarnDetailResult);
      
  //   }
  //   else {
  //     this.failtoFetchYarnDetail();
  //   }
  // }

  failtoFetchYarnDetail() {
    //this.navController.navigateBack('tabs/yarn');
  }
  
  
  goBack() {  
    this.navController.navigateBack('tabs/pattern');
  }

}
