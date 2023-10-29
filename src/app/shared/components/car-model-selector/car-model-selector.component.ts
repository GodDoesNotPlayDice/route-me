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

@Component({
	standalone: true,
  selector: 'app-car-model-selector',
  templateUrl: './car-model-selector.component.html',
  styleUrls: ['./car-model-selector.component.scss'],
	imports    : [
		IonicModule,
		CommonModule
	]
})
export class CarModelSelectorComponent implements OnInit{

  constructor(private driverCarService : DriverCarService) { }
	readonly carControl = new FormControl( '', [Validators.required])

	loading : boolean = false
	selectedIndex : number = 0
	driverCarList : DriverCar[] = []

	async ngOnInit(): Promise<void> {
		this.loading = true
		const driverCar = await this.driverCarService.getDriverCar()
		if ( driverCar.length > 0 ){
			this.driverCarList = driverCar
		}
		this.loading = false
	}
}
