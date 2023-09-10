import {Component, OnInit} from '@angular/core'
import { CountryPhoneCodeService } from 'src/app/services/country-phone-code/country-phone-code.service'
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

  constructor(private countryPhoneCode : CountryPhoneCodeService) {
  }

  ngOnInit() {
    initTE({ Input });
  }
}
