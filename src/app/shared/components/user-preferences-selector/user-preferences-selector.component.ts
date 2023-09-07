import { Component } from '@angular/core'
import { ModalController } from '@ionic/angular'


@Component( {
  selector   : 'app-user-preferences-selector',
  templateUrl: './user-preferences-selector.component.html',
  styleUrls  : [ './user-preferences-selector.component.scss' ]
} )
export class UserPreferencesSelectorComponent {
  name!: string

  preferencesList: Map<string, PreferenceItem> = defaultPreferenceList
  selectedPreferencesList = new Map<string, PreferenceItem>

  constructor( private modalCtrl: ModalController ) {
  }

  cancel() {
    return this.modalCtrl.dismiss( null, 'cancel' )
  }

  confirm() {
    return this.modalCtrl.dismiss( this.name, 'confirm' )
  }

  public onSelectItem( $event: string ): void {

    const pref = this.preferencesList.get($event)

    if ( pref !== undefined ){
      this.selectedPreferencesList.set($event, pref)
    }
  }

  public onDeselectItem( $event: string ): void {
    const pref = this.selectedPreferencesList.get($event)

    if ( pref !== undefined ){
      this.selectedPreferencesList.delete($event)
    }
  }
}

const defaultPreferenceList = new Map<string, PreferenceItem>( [
  [ 'Con Musica', {
    icon: 'musical-notes-outline',
    name: 'Con Musica'
  } ],
  [ 'Sin Fumar', {
    icon: 'logo-no-smoking',
    name: 'Sin Fumar'
  } ]
] )

export interface PreferenceItem {
  icon: string,
  name: string,
}
