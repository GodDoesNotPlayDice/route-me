import {
  Err,
  Result
} from 'oxide.ts'
import { PassengerDao } from 'src/package/passenger/domain/dao/passenger-dao'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { UserID } from 'src/package/user/domain/models/user-id'

export class PassengerDaoMemory implements PassengerDao {
  constructor( private context: Passenger[] ) {}

  /**
   * Create a passenger
   * @throws {UnknownException} - if unknown error
   */
  async create( passenger: Passenger ): Promise<Result<boolean, Error>> {
    return Err( new UnknownException() )
  }

  /**
   * Delete a passenger
   * @throws {UnknownException} - if unknown error
   */
  async delete( id: UserID ): Promise<Result<boolean, Error>> {
    return Err( new UnknownException() )
  }

  /**
   * Get all passengers
   * @throws {UnknownException} - if unknown error
   */
  async getAll(): Promise<Result<Passenger[], Error[]>> {
    const errors: Error[] = []
    return Err( errors )
  }

  /**
   * Get passenger by id
   * @throws {UnknownException} - if unknown error
   */
  async getById( id: UserID ): Promise<Result<Passenger, Error[]>> {
    const errors: Error[] = []
    return Err( errors )
  }

  /**
   * Update a passenger
   * @throws {UnknownException} - if unknown error
   */
  async update( passenger: Passenger ): Promise<Result<boolean, Error>> {
    return Err( new UnknownException() )
  }

}
