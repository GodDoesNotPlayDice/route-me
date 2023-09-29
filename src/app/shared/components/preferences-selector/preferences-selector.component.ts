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
import { PreferenceID } from 'src/package/preference'
import {
  DividerComponent,
  UserPreferencesSelectorItemComponent
} from '..'


@Component( {
	standalone : true,
	selector   : 'app-user-preferences-selector',
	templateUrl: './preferences-selector.component.html',
	styleUrls  : [ './preferences-selector.component.scss' ],
	imports    : [
		IonicModule,
		CommonModule,
		UserPreferencesSelectorItemComponent,
		DividerComponent
	]
} )
export class PreferencesSelectorComponent {

	constructor( private modalCtrl: ModalController ) {}

	@Input() preferencesData     = new Map<string, PreferenceItem>()
	@Input() selectedPreferences = new Map<string, PreferenceID>()

	getPreferences(): PreferenceItem[] {
		return Array.from( this.preferencesData.values() )
      .map( ( data ) => {
        const isSelected = this.selectedPreferences.get( data.id.value )
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

	cancel() {
		return this.modalCtrl.dismiss( [], 'cancel' )
	}

	confirm() {
		return this.modalCtrl.dismiss( Array.from(
				this.selectedPreferences.values() )
          .map(
            ( item ) => {
              return item.value
            }
          ),
			'confirm'
		)
	}

	public onSelectItem( $event: string ): void {

		const pref = this.preferencesData.get( $event )

		if ( pref !== undefined ) {
			this.selectedPreferences.set( $event, pref.id )
		}
	}

	public onDeselectItem( $event: string ): void {
		const pref = this.preferencesData.get( $event )

		if ( pref !== undefined ) {
			this.selectedPreferences.delete( $event )
		}
	}
}

