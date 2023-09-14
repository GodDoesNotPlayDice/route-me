import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent{

  constructor() { }

  @ViewChild('search') inputSearch!: ElementRef<HTMLInputElement>
}
