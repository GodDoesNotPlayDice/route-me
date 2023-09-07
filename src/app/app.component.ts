import {Component, OnInit} from '@angular/core'
import {
  Input,
  initTE,
} from "tw-elements";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  ngOnInit() {
    initTE({ Input });
  }
}
