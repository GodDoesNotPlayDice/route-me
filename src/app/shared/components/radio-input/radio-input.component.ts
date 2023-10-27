import { CommonModule } from '@angular/common'
import {
	Component,
	Input
} from '@angular/core'
import {
	FormControl,
	FormsModule
} from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { RadioButtonData } from 'src/package/shared/domain/components/radio-button-data'

@Component( {
	standalone : true,
	selector   : 'app-radio-input',
	templateUrl: './radio-input.component.html',
	styleUrls  : [ './radio-input.component.scss' ],
	imports    : [
		IonicModule,
		CommonModule,
		FormsModule
	]
} )
export class RadioInputComponent {
	@Input( { required: true } ) radioButtons: RadioButtonData[] = []
	@Input( { required: true } ) name: string
	selectedOption: string | null                                = null

	readonly radioControl = new FormControl( '', control => {
			if ( control.value === '' || control.value === null ) {
				return { required: true }
			}
			return null
		}
	)

	onRadioChange( $event: Event ) {
		this.radioControl.patchValue( this.selectedOption )
		this.radioControl.updateValueAndValidity()
	}

	reset(): void {
		this.selectedOption = null
		this.radioControl.reset()
	}
}
