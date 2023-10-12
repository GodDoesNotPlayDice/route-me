import { Storage } from '@ionic/storage-angular'
import {
	Err,
	Result
} from 'oxide.ts'
import { PassengerDao } from 'src/package/passenger/domain/dao/passenger-dao'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { PassengerID } from 'src/package/passenger/domain/models/passenger-id'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { UserID } from 'src/package/user/domain/models/user-id'

export class PassengerDaoLocalStorage implements PassengerDao {
	constructor( private storage: Storage ) {
		this.init()
	}

	private async init() {
		await this.storage.create()
	}

	async create( passenger: Passenger ): Promise<Result<Passenger, Error>> {
		return Err( new UnknownException() )
	}

	async delete( id: PassengerID ): Promise<Result<boolean, Error>> {
		return Err( new UnknownException() )
	}

	async getAll(): Promise<Result<Passenger[], Error[]>> {
		const errors: Error[] = []
		return Err( errors )
	}

	async getById( id: UserID ): Promise<Result<Passenger, Error[]>> {
		const errors: Error[] = []
		return Err( errors )
	}

	async update( passenger: Passenger ): Promise<Result<boolean, Error>> {
		return Err( new UnknownException() )
	}
}
