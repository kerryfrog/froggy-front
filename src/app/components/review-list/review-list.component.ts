import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-review-list",
  templateUrl: "./review-list.component.html",
  styleUrls: ["./review-list.component.scss"],
})
export class ReviewListComponent implements OnInit {
  @Input() reviewList;

  iconsArray: number[] = [];
  defaultIcon: string = "star-outline";
  halfIcon: string = "star-half";
  activeIcon: string = "star";

  activeColor: string = "#95c8a5";
  defaultColor: string = "#aaaaaa";
  constructor() {}

  ngOnInit() {
    for (let i = 0; i < 5; i++) {
      this.iconsArray.push(i);
    }
  }
  round(num) {
    return Math.round(num);
  }
  parseFloat(num) {
    return parseFloat(num);
  }
}
