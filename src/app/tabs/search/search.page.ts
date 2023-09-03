import {Component, ViewChild} from '@angular/core';
import {ViewDidEnter} from "@ionic/angular";
import {
  SearchInputComponent
} from "../../shared/components/search-input/search-input.component";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements ViewDidEnter {

  constructor() { }

  @ViewChild('search') searchInput! : SearchInputComponent

  ionViewDidEnter(): void {
    this.searchInput.inputSearch.nativeElement.focus()
  }
}
