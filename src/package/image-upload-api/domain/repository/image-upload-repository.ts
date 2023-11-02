import { Result } from 'oxide.ts'

export abstract class ImageUploadRepository {
	abstract uploadImage( imageBlob: Blob,
		fileName: string ): Promise<Result<string, Error>>

	abstract delete( url: string ): Promise<Result<boolean, Error>>
}
