import { CommonModule } from '@angular/common'
import {
	Component,
	OnInit
} from '@angular/core'
import {
	FormControl,
	Validators
} from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { DriverCarService } from 'src/app/shared/services/driver-car.service'
import { DriverCar } from 'src/package/driver-car/domain/models/driver-car'

@Component( {
	standalone : true,
	selector   : 'app-car-model-selector',
	templateUrl: './car-model-selector.component.html',
	styleUrls  : [ './car-model-selector.component.scss' ],
	imports    : [
		IonicModule,
		CommonModule
	]
} )
export class CarModelSelectorComponent implements OnInit {

	constructor( private driverCarService: DriverCarService ) { }

	readonly carControl = new FormControl<DriverCar | null>( null, [ Validators.required ] )

	firstTime: boolean         = true
	loading: boolean           = false
	selectedIndex: number      = 0
	driverCarList: DriverCar[] = []
	label: string = 'Modelo de auto'

	async ngOnInit(): Promise<void> {
		this.loading    = true
		const driverCar = await this.driverCarService.getDriverCar()
		if ( driverCar.length > 0 ) {
			this.driverCarList = driverCar
		}
		this.loading = false
	}

	rightClick(): void {
		if ( this.firstTime ) {
			this.firstTime = false
		}
		else if ( this.selectedIndex === this.driverCarList.length - 1 ) {
			this.selectedIndex = 0
		}
		else if ( this.selectedIndex < this.driverCarList.length - 1 ) {
			this.selectedIndex++
		}
		this.carControl.patchValue( this.driverCarList[ this.selectedIndex ] )
		this.carControl.updateValueAndValidity()
	}

	leftClick(): void {
		if ( this.firstTime ) {
			this.firstTime = false
		}
		else if ( this.selectedIndex === 0 ) {
			this.selectedIndex = this.driverCarList.length - 1
		}
		else if ( this.selectedIndex > 0 ) {
			this.selectedIndex--
		}
		this.carControl.patchValue( this.driverCarList[ this.selectedIndex ] )
		this.carControl.updateValueAndValidity()
	}

	reset(){
		this.firstTime = true
		this.selectedIndex = 0
		this.carControl.reset()
	}
}
