import { Injectable } from '@angular/core'
import {
	ToastController,
	ToastOptions
} from '@ionic/angular'

@Injectable( {
	providedIn: 'root'
} )
export class ToastService {

	constructor( private toastController: ToastController ) { }

	async presentToast( toastOptions: ToastOptions ) {
		const toast = await this.toastController.create( toastOptions )
		await toast.present()
	}
}
