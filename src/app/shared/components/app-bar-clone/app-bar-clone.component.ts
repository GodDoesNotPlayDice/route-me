import { CommonModule } from '@angular/common'
import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output
} from '@angular/core'
import { Router } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { UrlService } from 'src/app/shared/services/url.service'

@Component( {
	standalone : true,
	selector   : 'app-app-bar-clone',
	templateUrl: './app-bar-clone.component.html',
	styleUrls  : [ './app-bar-clone.component.scss' ],
	imports    : [
		IonicModule,
		CommonModule
	]
} )
export class AppBarCloneComponent implements OnInit {

	constructor( private urlService: UrlService,
		private router: Router )
	{}

	ngOnInit(): void {
		if ( this.href === null ) {
			this.urlService.previousUrl$.subscribe( ( url ) => {
				this.href = url
			} )
		}
	}

	@Input() href: string | null              = null
	@Input() leadNameIcon: string             = 'arrow-back-outline'
	@Input( { required: true } ) label: string
	@Output() leadClicked: EventEmitter<void> = new EventEmitter<void>()

	async leadClick(): Promise<void> {
		this.leadClicked.emit()
	}

	async backPage() {
		await this.router.navigate( [ this.href ] )
	}
}
