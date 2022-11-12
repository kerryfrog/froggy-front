import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-star-rating",
  templateUrl: "./star-rating.component.html",
  styleUrls: ["./star-rating.component.scss"],
})
export class StarRatingComponent implements OnInit {
  @Input()
  public set rating(val: number) {
    this._rating = val;
    if (this.onChange) {
      this.onChange(val);
    }
  }
  public get rating(): number {
    return this._rating;
  }

  @Output()
  ratingChanged: EventEmitter<number> = new EventEmitter<number>();
  @Input()
  readonly: string = "false";
  @Input()
  activeColor: string = "#488aff";
  @Input()
  defaultColor: string = "#aaaaaa";
  @Input()
  activeIcon: string = "star";
  @Input()
  defaultIcon: string = "star-outline";
  @Input()
  halfIcon: string = "star-half";
  @Input()
  halfStar: string = "true";
  @Input()
  maxRating: number = 5;
  @Input()
  fontSize: string = "28px";

  private _rating: number;
  private onChange: any;
  private onTouched: any;
  public disabled: boolean;

  iconsArray: number[] = [];

  constructor() {}

  ngOnInit() {
    this.rating = this.rating || 3; //default after input`s initialization
    for (let i = 0; i < this.maxRating; i++) {
      this.iconsArray.push(i);
    }
  }

  // event is different for firefox and chrome
  changeRating(event) {
    if (this.readonly && this.readonly === "true") return;
    let id = event.target.id
      ? parseInt(event.target.id)
      : parseInt(event.target.parentElement.id);
    if (this.halfStar && this.halfStar === "true") {
      this.rating =
        this.rating - id > 0 && this.rating - id <= 0.5 ? id + 1 : id + 0.5;
    } else {
      this.rating = id + 1;
    }
    // subscribe this event to get the changed value in your parent compoanent
    // this.ionicRatingService.publishStartRatingChanged(this.rating);
    // this.ionicRatingService.publishTopic(this.eventInfo.topic, this.rating);
    // unique event
    console.log(this.rating);

    this.ratingChanged.emit(this.rating);
  }

  round(num) {
    return Math.round(num);
  }

  parseFloat(num) {
    return parseFloat(num);
  }
}
