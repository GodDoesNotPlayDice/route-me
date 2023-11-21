import { Result } from 'oxide.ts'
import { DriverDocument } from 'src/package/driver-document/domain/models/driver-document'
import { Email } from 'src/package/shared/domain/models/email'

export abstract class DriverDocumentDao {
	abstract getAll(): Promise<Result<DriverDocument[], Error[]>>

	abstract getByEmail( email: Email ): Promise<Result<DriverDocument, Error[]>>

	abstract create( driver: DriverDocument ): Promise<Result<boolean, Error>>

	abstract delete( email: Email ): Promise<Result<boolean, Error>>

	abstract update( driver: DriverDocument ): Promise<Result<boolean, Error>>
}
