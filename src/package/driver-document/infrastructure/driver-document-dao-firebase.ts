import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
  Err,
  Result
} from 'oxide.ts'
import { DriverDocumentDao } from 'src/package/driver-document/domain/dao/driver-document-dao'
import { DriverDocument } from 'src/package/driver-document/domain/models/driver-document'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { Email } from 'src/package/shared/domain/models/email'

export class DriverDocumentDaoFirebase implements DriverDocumentDao {

  constructor( private firebase: AngularFireDatabase ) {
  }

  collectionKey = 'driversdocuments'

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
  async delete( email: Email ): Promise<Result<boolean, Error>> {
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
  async getByEmail( email: Email ): Promise<Result<DriverDocument, Error[]>> {
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
