import { CommonModule } from '@angular/common'
import {Component, ElementRef, ViewChild} from '@angular/core';
import { IonicModule } from '@ionic/angular'

@Component({
  standalone: true,
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class SearchInputComponent{

  constructor() { }

  @ViewChild('search') inputSearch!: ElementRef<HTMLInputElement>
}
