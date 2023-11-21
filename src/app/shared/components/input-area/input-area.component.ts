import { CommonModule } from '@angular/common'
import {
	Component,
	Input,
	OnInit
} from '@angular/core'
import {
	FormControl,
	ReactiveFormsModule
} from '@angular/forms'
import { IonicModule } from '@ionic/angular'

@Component( {
	standalone : true,
	selector   : 'app-input-area',
	templateUrl: './input-area.component.html',
	styleUrls  : [ './input-area.component.scss' ],
	imports    : [
		IonicModule,
		CommonModule,
		ReactiveFormsModule
	]
} )
export class InputAreaComponent implements OnInit {
	@Input() title: string       = 'Sobre Mi'
	@Input() placeholder: string = ''
	@Input() label: string       = ''
	@Input() value: string       = ''

	readonly textControl = new FormControl( '', control => {
		// control.addValidators( Validators.required )
		// control.addValidators( Validators.minLength( 5 ) )
		return null
	} )

	public ngOnInit(): void {
		this.textControl.patchValue( this.value )
		this.textControl.updateValueAndValidity()
	}

	onChange() {
		this.textControl.updateValueAndValidity()
	}

	reset(): void {
		this.value = ''
		this.textControl.reset()
	}
}
