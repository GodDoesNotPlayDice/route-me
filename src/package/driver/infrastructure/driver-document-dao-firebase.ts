import {
	Err,
	Result
} from 'oxide.ts'
import { DriverDocumentDao } from 'src/package/driver/domain/dao/driver-document-dao'
import { DriverDocument } from 'src/package/driver/domain/models/driver-document'
import { DriverDocumentID } from 'src/package/driver/domain/models/driver-document-id'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'

export class DriverDocumentDaoFirebase implements DriverDocumentDao {
	async create( driver: DriverDocument ): Promise<Result<DriverDocument, Error>> {
    return Err(new UnknownException())
  }

	async delete( id: DriverDocumentID ): Promise<Result<boolean, Error>> {
		return Err( new UnknownException() )
	}

	async getAll(): Promise<Result<DriverDocument[], Error>> {
		return Err( new UnknownException() )
	}

	async getById( id: DriverDocumentID ): Promise<Result<DriverDocument, Error>> {
		return Err( new UnknownException() )
	}

	async update( driver: DriverDocument ): Promise<Result<boolean, Error>> {
		return Err( new UnknownException() )
	}

}
