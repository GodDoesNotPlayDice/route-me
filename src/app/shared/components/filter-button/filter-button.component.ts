import {Component, Input, OnInit} from '@angular/core';
import {FilterButtonData} from "../../../tabs/home/home.page";

@Component({
  selector: 'app-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.scss'],
})
export class FilterButtonComponent  implements OnInit {
  @Input() data! : FilterButtonData;
  constructor() { }

  ngOnInit() {}

}
