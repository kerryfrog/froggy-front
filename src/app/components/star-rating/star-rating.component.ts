import { Component, OnInit,Input, Output,EventEmitter, } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent implements OnInit {
  @Input()
  public set rating(val: number) {
    this._rating = val;
    if (this.onChange) {
      this.onChange(val);
    }
  }
  @Output()
  ratingChanged: EventEmitter<number> = new EventEmitter<number>();
  @Input()
  readonly: string = 'false';
  @Input()
  activeColor: string = '#488aff';
  @Input()
  defaultColor: string = '#aaaaaa';
  @Input()
  activeIcon: string = 'star';
  @Input()
  defaultIcon: string = 'star-outline';
  @Input()
  halfIcon: string = 'star-half';
  @Input()
  halfStar: string = 'false';
  @Input()
  maxRating: number = 5;
  @Input()
  fontSize: string = '28px';

  private _rating: number;
  private onChange: any;
  private onTouched: any;
  public disabled: boolean;
  Math: any;
  parseFloat: any;
  iconsArray: number[] = [];  

  constructor() { }

  ngOnInit() {
    this.rating = this.rating || 3; //default after input`s initialization
    for (let i = 0; i < this.maxRating; i++) {
      this.iconsArray.push(i);
    }
  }

  changeRating(event) {
    if (this.readonly && this.readonly === 'true') return;
    // event is different for firefox and chrome
    let id = event.target.id ? parseInt(event.target.id) : parseInt(event.target.parentElement.id);
    if (this.halfStar && this.halfStar === 'true') {
      this.rating = ((this.rating - id > 0) && (this.rating - id <= 0.5)) ? id + 1 : id + .5;
    } else {
      this.rating = id + 1;
    }
    // subscribe this event to get the changed value in your parent compoanent
    // this.ionicRatingService.publishStartRatingChanged(this.rating);
    // this.ionicRatingService.publishTopic(this.eventInfo.topic, this.rating);
    // unique event
    this.ratingChanged.emit(this.rating);
  }
}
