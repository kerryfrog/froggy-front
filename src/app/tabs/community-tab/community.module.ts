import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunityPage } from './community.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { CommunityPageRoutingModule } from './community-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: CommunityPage }]),
    CommunityPageRoutingModule,
  ],
  declarations: [CommunityPage]
})
export class CommunityPageModule {}
