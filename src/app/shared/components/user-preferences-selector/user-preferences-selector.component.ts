import { CommonModule } from '@angular/common'
import {
  Component,
  Input
} from '@angular/core'
import {
  IonicModule,
  ModalController
} from '@ionic/angular'
import {
  newPreferenceItem,
  PreferenceItem
} from 'src/app/shared/models'
import { DividerComponent, UserPreferencesSelectorItemComponent } from '..'


@Component( {
  standalone : true,
  selector   : 'app-user-preferences-selector',
  templateUrl: './user-preferences-selector.component.html',
  styleUrls  : [ './user-preferences-selector.component.scss' ],
  imports    : [
    IonicModule,
    CommonModule,
    UserPreferencesSelectorItemComponent,
    DividerComponent
  ]
} )
export class UserPreferencesSelectorComponent {

  constructor( private modalCtrl: ModalController ) {}

  @Input() preferencesData     = new Map<string, PreferenceItem>()
  @Input() selectedPreferences = new Map<string, PreferenceItem>()

  getPreferences(): PreferenceItem[] {
    return Array.from( this.preferencesData.values() )
                .map( ( data ) => {
                  const isSelected = this.selectedPreferences.get( data.name )
                  if ( isSelected !== undefined ) {
                    return newPreferenceItem( {
                      name    : isSelected.name,
                      icon    : isSelected.icon,
                      selected: true
                    } )
                  }
                  else {
                    return newPreferenceItem( {
                      name    : data.name,
                      icon    : data.icon,
                      selected: false
                    } )
                  }
                } )
  }

  cancel() {
    return this.modalCtrl.dismiss( [], 'cancel' )
  }

  confirm() {
    return this.modalCtrl.dismiss( Array.from(
        this.selectedPreferences.values() )
                                        .map(
                                          ( item ) => {
                                            return {
                                              name: item.name,
                                              icon: item.icon
                                            }
                                          }
                                        ),
      'confirm'
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

