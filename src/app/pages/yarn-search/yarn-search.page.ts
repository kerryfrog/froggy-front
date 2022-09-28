import { Component, OnInit } from '@angular/core';
import { YarnService } from "src/app/api/yarn.service";

@Component({
  selector: 'app-yarn-search',
  templateUrl: './yarn-search.page.html',
  styleUrls: ['./yarn-search.page.scss'],
})
export class YarnSearchPage implements OnInit {
  public yarnList = [];
  public results;
  constructor(
    public yarnService: YarnService,
  ) { }

  ngOnInit() {
  }

    async handleChange(event) {
    this.results = event.target.value;
    const { data } = await this.yarnService.getYarnSearchList(this.results);
    this.yarnList = data['searchList'];
    console.log(this.yarnList);
    }
  
  
  
}
