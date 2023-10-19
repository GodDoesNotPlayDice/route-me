import {
  Err,
  Result
} from 'oxide.ts'
import { DriverDocumentDao } from 'src/package/driver-document/domain/dao/driver-document-dao'
import { DriverDocument } from 'src/package/driver-document/domain/models/driver-document'
import { DriverDocumentID } from 'src/package/driver-document/domain/models/driver-document-id'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'

export class DriverDocumentDaoFirebase implements DriverDocumentDao {
  /**
   * Create a driver document
   * @throws {UnknownException} - if unknown error
   */
  async create( driver: DriverDocument ): Promise<Result<boolean, Error>> {
    return Err( new UnknownException() )
  }

  /**
   * Delete a driver document
   * @throws {UnknownException} - if unknown error
   */
  async delete( id: DriverDocumentID ): Promise<Result<boolean, Error>> {
    return Err( new UnknownException() )
  }

  /**
   * Get all driver documents
   * @throws {UnknownException} - if unknown error
   */
  async getAll(): Promise<Result<DriverDocument[], Error[]>> {
    return Err( [ new UnknownException() ] )
  }

  /**
   * Get a driver document by id
   * @throws {UnknownException} - if unknown error
   */
  async getById( id: DriverDocumentID ): Promise<Result<DriverDocument, Error[]>> {
    return Err( [ new UnknownException() ] )
  }

  /**
   * Update a driver document
   * @throws {UnknownException} - if unknown error
   */
  async update( driver: DriverDocument ): Promise<Result<boolean, Error>> {
    return Err( new UnknownException() )
  }

}
