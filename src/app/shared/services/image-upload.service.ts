import { Injectable } from '@angular/core'
import { Result } from 'oxide.ts'
import { ImageUploadRepository } from 'src/package/image-upload-api/domain/repository/image-upload-repository'

@Injectable( {
	providedIn: 'root'
} )
export class ImageUploadService {

	constructor( private imageUploadRepository: ImageUploadRepository ) { }

	uploadImage( imageBlob: Blob,
		fileName: string ): Promise<Result<string, Error>> {
		return this.imageUploadRepository.uploadImage( imageBlob, fileName )
	}

	async delete( url: string ): Promise<Result<boolean, Error>> {
		return this.imageUploadRepository.delete( url )
	}
}
