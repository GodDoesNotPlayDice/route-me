import {
  Component, Input, OnInit
} from '@angular/core'
import {
  ModalController
} from '@ionic/angular'
import {PreferenceItem} from "../../models/PreferenceItem";


@Component( {
  selector   : 'app-user-preferences-selector',
  templateUrl: './user-preferences-selector.component.html',
  styleUrls  : [ './user-preferences-selector.component.scss' ]
} )
export class UserPreferencesSelectorComponent {

  constructor( private modalCtrl: ModalController){}

  @Input() preferencesData = new Map<string, PreferenceItem>()
  @Input() selectedPreferences = new Map<string, PreferenceItem>()

  getPreferences() : PreferenceItem[] {
    return Array.from(this.preferencesData.values()).map((data)=>{
      const isSelected = this.selectedPreferences.get(data.name)
      if(isSelected !== undefined){
        return {
          name: isSelected.name,
          icon: isSelected.icon,
          selected: true
        }
      }
      else {
        return {
          name: data.name,
          icon: data.icon,
          selected: false
        }
      }
    })
  }

  cancel() {
    return this.modalCtrl.dismiss( [], 'cancel' )
  }

  confirm() {
    return this.modalCtrl.dismiss( Array.from(
        this.selectedPreferences.values()).map(
          ( item ) => { return { name: item.name, icon: item.icon} }
    ),
      'confirm'
    )
  }

  public onSelectItem( $event: string ): void {

    const pref = this.preferencesData.get( $event )

    if ( pref !== undefined ) {
      this.selectedPreferences.set( $event, pref)
    }
  }

  public onDeselectItem( $event: string ): void {
    const pref = this.preferencesData.get( $event )

    if ( pref !== undefined ) {
      this.selectedPreferences.delete( $event )
    }
  }
}

