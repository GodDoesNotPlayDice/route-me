import {Component, Input, OnInit} from '@angular/core'
import { ModalController } from '@ionic/angular'
import { CountryPhoneCodeService } from 'src/app/services/country-phone-code/country-phone-code.service'

@Component( {
  selector   : 'app-phone-selector',
  templateUrl: './country-selector.component.html',
  styleUrls  : [ './country-selector.component.scss' ]
} )
export class CountrySelectorComponent implements OnInit{

  constructor( private modalCtrl: ModalController,
    private countryPhoneCode: CountryPhoneCodeService ) {}

  @Input() lastSelected : CountryItem | undefined
  countriesList = new Map<string, CountryItem>()

  ngOnInit() {
    const list : CountryItem[] = this.countryPhoneCode.countriesList.map((data)=>
    {
        const notSelected ={
          image: data.flags.png,
          name: data.name.common,
          cca: data.cca2,
          selected: false
        }

        if(this.lastSelected === undefined){
          return notSelected
        }

        if (this.lastSelected.name !== data.name.common){
          return notSelected
        }
        else {
          return {
            image: data.flags.png,
            cca: data.cca2,
            name: data.name.common,
            selected: true
          }
        }
    })

    this.countriesList = new Map<string, CountryItem>(
      list.map( ( item ) => [ item.name, item ] ) )
  }

  cancel() {
    return this.modalCtrl.dismiss( undefined, 'cancel' )
  }

  confirm() {
    return this.modalCtrl.dismiss( this.lastSelected, 'confirm' )
  }

  public selectCountry( name: string ): void {
    if (this.lastSelected !== undefined){
      const countryEntry = this.countriesList.get(this.lastSelected.name)
      if (countryEntry !== undefined){
        countryEntry.selected = false
      }
    }

    const countrySelected = this.countriesList.get(name)
    if (countrySelected !== undefined){

      countrySelected.selected = true
      this.lastSelected = countrySelected
    }
  }
}

export interface CountryItem {
  image : string,
  name: string,
  cca: string
  selected : boolean
}
