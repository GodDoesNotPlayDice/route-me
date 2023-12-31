import { CommonModule } from '@angular/common'
import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output
} from '@angular/core'
import { FormControl } from '@angular/forms'
import { IonicModule } from '@ionic/angular'

@Component( {
	standalone : true,
	selector   : 'app-checkbox-input',
	templateUrl: './checkbox-input.component.html',
	styleUrls  : [ './checkbox-input.component.scss' ],
	imports    : [
		IonicModule,
		CommonModule
	]
} )
export class CheckboxInputComponent implements OnInit {

	@Input() activeError: boolean

	isChecked: boolean = false

	@Input() errorText: string

	@Input( { required: true } ) contentText: string = ''

	@Output() isCheckedChange: EventEmitter<boolean> = new EventEmitter<boolean>()

	readonly checkboxControl = new FormControl( false, control => {
		if ( this.activeError && !control.value ) {
			return { required: true }
		}
		return null
	} )

	onCheckboxChange(): void {
		this.isChecked = !this.isChecked
		this.isCheckedChange.emit( this.isChecked )
		this.checkboxControl.patchValue( this.isChecked )
		this.checkboxControl.updateValueAndValidity()
		this.checkboxControl.markAllAsTouched()
	}

	public ngOnInit(): void {
		this.checkboxControl.updateValueAndValidity()
	}

	reset(): void {
		this.isChecked = false
		this.checkboxControl.reset()
	}
}
