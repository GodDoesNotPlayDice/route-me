import { CommonModule } from '@angular/common'
import {
  Component,
  Input,
  OnInit
} from '@angular/core'
import {
  IonicModule,
  ModalController
} from '@ionic/angular'
import { DividerComponent } from 'src/app/shared/components/divider/divider.component'
import { PreferencesSelectorItemComponent } from 'src/app/shared/components/preferences-selector-item/preferences-selector-item.component'
import {
  newPreferenceItem,
  PreferenceItem
} from 'src/app/shared/models/preference-item'
import { Preference } from 'src/package/preference/domain/models/preference'


@Component( {
  standalone : true,
  selector   : 'app-user-preferences-selector',
  templateUrl: './preferences-selector.component.html',
  styleUrls  : [ './preferences-selector.component.scss' ],
  imports    : [
    IonicModule,
    CommonModule,
    PreferencesSelectorItemComponent,
    DividerComponent
  ]
} )
export class PreferencesSelectorComponent implements OnInit {

  constructor( private modalCtrl: ModalController ) {
  }

  ngOnInit(): void {
    this.preferencesList = Array.from( this.preferencesData.values() )
                                .map( ( data ) => {
                                  const isSelected = this.selectedPreferences.get( data.name.value)
                                  if ( isSelected !== undefined ) {
                                    return newPreferenceItem( {
                                      ...data,
                                      selected: true
                                    } )
                                  }
                                  else {
                                    return newPreferenceItem( {
                                      ...data,
                                      selected: false
                                    } )
                                  }
                                } )
  }

  preferencesList: PreferenceItem[] = []


  @Input( { required: true } )
  preferencesData = new Map<string, Preference>()

  @Input( { required: true } )
  selectedPreferences = new Map<string, Preference>()

  cancel() {
    return this.modalCtrl.dismiss( [], 'cancel' )
  }

  confirm() {
    return this.modalCtrl.dismiss(
      Array.from( this.selectedPreferences.values() ), 'confirm'
    )
  }

  public onSelectItem( $event: string ): void {

    const pref = this.preferencesData.get( $event )

    if ( pref !== undefined ) {
      this.selectedPreferences.set( $event, pref )
    }
  }

  public onDeselectItem( $event: string ): void {
    const pref = this.preferencesData.get( $event )

    if ( pref !== undefined ) {
      this.selectedPreferences.delete( $event )
    }
  }
}

