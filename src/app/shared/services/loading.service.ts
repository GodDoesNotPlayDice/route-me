import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular'

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

	constructor(private loadingCtrl: LoadingController) {}

	async showLoading(message : string) {
		const loading = await this.loadingCtrl.create({
			message: message,
			translucent: true,
		})

		await loading.present()
	}

	async dismissLoading() {
		await this.loadingCtrl.dismiss()
	}
}
