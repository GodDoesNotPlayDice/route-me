import { Result } from 'oxide.ts'
import { DriverDocument } from 'src/package/driver-document/domain/models/driver-document'
import { DriverDocumentID } from 'src/package/driver-document/domain/models/driver-document-id'

export abstract class DriverDocumentDao {
  abstract getAll(): Promise<Result<DriverDocument[], Error[]>>

  abstract getById( id: DriverDocumentID ): Promise<Result<DriverDocument, Error[]>>

  abstract create( driver: DriverDocument ): Promise<Result<boolean, Error>>

  abstract delete( id: DriverDocumentID ): Promise<Result<boolean, Error>>

  abstract update( driver: DriverDocument ): Promise<Result<boolean, Error>>
}
