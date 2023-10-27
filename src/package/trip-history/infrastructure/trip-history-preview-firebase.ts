import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
	Err,
	Result
} from 'oxide.ts'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'
import { TripHistoryPreviewDao } from 'src/package/trip-history/domain/dao/trip-history-preview-dao'
import { TripHistoryPreview } from 'src/package/trip-history/domain/models/trip-history-preview'

export class TripHistoryPreviewFirebase implements TripHistoryPreviewDao {
	constructor( private firebase: AngularFireDatabase ) {
	}

	collectionKey = 'triphistorypreview'

	async getAll(): Promise<Result<TripHistoryPreview[], Error[]>> {
		return Err( [ new FirebaseOperationException() ] )
	}
}
