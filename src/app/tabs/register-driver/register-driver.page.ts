import {
	Component,
	OnInit,
	ViewChild
} from '@angular/core'
import { CommonModule } from '@angular/common'
import {
	FormGroup,
	FormsModule
} from '@angular/forms'
import {
	IonicModule,
	ViewDidEnter
} from '@ionic/angular'
import { CarModelSelectorComponent } from 'src/app/shared/components/car-model-selector/car-model-selector.component'
import { DividerComponent } from 'src/app/shared/components/divider/divider.component'
import { FileInputComponent } from 'src/app/shared/components/file-input/file-input.component'
import { FilledButtonComponent } from 'src/app/shared/components/filled-button/filled-button.component'
import { DriverCarDao } from 'src/package/driver-car/domain/dao/driver-car-dao'

@Component( {
	selector: 'app-register-driver',
	templateUrl: './register-driver.page.html',
	styleUrls: [ './register-driver.page.scss' ],
	standalone: true,
	imports: [ IonicModule, CommonModule, FormsModule, FileInputComponent,
		FilledButtonComponent, CarModelSelectorComponent, DividerComponent ]
} )
export class RegisterDriverPage implements ViewDidEnter {
	constructor() { }
	@ViewChild( 'licencia' ) licenceInput !: FileInputComponent
	@ViewChild( 'registro' ) registerInput !: FileInputComponent
	@ViewChild( 'antecedentes' ) recordInput !: FileInputComponent
	@ViewChild( 'historial' ) historyInput !: FileInputComponent
	@ViewChild( 'car' ) carInput !: CarModelSelectorComponent
	formGroup!: FormGroup

	async ionViewDidEnter() {
		this.formGroup = new FormGroup( [
			this.licenceInput.fileControl,
			this.registerInput.fileControl,
			this.recordInput.fileControl,
			this.historyInput.fileControl,
			this.carInput.carControl
		] )
	}

	buttonClick(){
		console.log( 'buttonClick' )
		this.formGroup.updateValueAndValidity()
		this.formGroup.markAllAsTouched()
		console.log( 'formGroup', this.formGroup.value)

		if ( !this.formGroup.valid )
		{
			return
		}
	}

	private reset(){
		this.carInput.reset()
		this.licenceInput.reset()
		this.registerInput.reset()
		this.recordInput.reset()
		this.historyInput.reset()
		this.formGroup.reset()
	}
}
