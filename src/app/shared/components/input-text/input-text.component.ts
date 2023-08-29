import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent  implements OnInit {

  constructor() { }

  favoriteColorControl = new FormControl()

  ngOnInit() {}

  print(){
    console.log(this.favoriteColorControl)
  }
}
