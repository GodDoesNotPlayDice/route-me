import { AngularFireStorage } from '@angular/fire/compat/storage'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { ImageUploadInvalidException } from 'src/package/image-upload-api/domain/exceptions/image-upload-invalid-exception'
import { ImageUploadRepository } from 'src/package/image-upload-api/domain/repository/image-upload-repository'

export class ImageUploadFirestorage implements ImageUploadRepository {
	constructor( private firebase: AngularFireStorage ) {
	}

	async uploadImage( imageBlob: Blob,
		fileName: string ): Promise<Result<string, Error>> {
		const fileRef: Result<string, Error> = await this.firebase.ref( fileName )
		                                                 .put( imageBlob )
		                                                 .then(
			                                                 async ( val ) => {
				                                                 return Ok(
					                                                 await val.ref.getDownloadURL() )
			                                                 },
			                                                 reason => {
				                                                 console.log( 'reason' )
				                                                 console.log( reason )
				                                                 return Err(
					                                                 new ImageUploadInvalidException() )
			                                                 }
		                                                 )
		return fileRef
	}

	async delete( url: string ): Promise<Result<boolean, Error>> {
		try {
			const response = this.firebase.refFromURL( url )
			response.delete()
			return Ok( true )
		}
		catch ( e ) {
			return Err( new ImageUploadInvalidException() )
		}
	}
}
