import { Injectable } from '@angular/core'
import {
	None,
	Option,
	Some
} from 'oxide.ts'
import { createUser } from 'src/package/authentication/application/create-user'
import { deleteAccount } from 'src/package/authentication/application/delete-account'
import { loginUser } from 'src/package/authentication/application/login-user'
import { logoutUser } from 'src/package/authentication/application/logout-user'
import { sendResetPassword } from 'src/package/authentication/application/send-reset-password'
import { AuthUserRepository } from 'src/package/authentication/domain/repository/auth-user-repository'
import { DriverDao } from 'src/package/driver/domain/dao/driver-dao'
import { Driver } from 'src/package/driver/domain/models/driver'
import { createPassenger } from 'src/package/passenger/application/create-passenger'
import { deletePassenger } from 'src/package/passenger/application/delete-passenger'
import { updatePassenger } from 'src/package/passenger/application/update-passenger'
import { PassengerDao } from 'src/package/passenger/domain/dao/passenger-dao'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { PreferenceProps } from 'src/package/preference/domain/models/preference'
import { getUserByEmail } from 'src/package/user/application/get-user-by-email'
import { UserDao } from 'src/package/user/domain/dao/user-dao'
import { User } from 'src/package/user/domain/models/user'

@Injectable( {
	providedIn: 'root'
} )
export class AuthService {

	constructor(
		private authRepository: AuthUserRepository,
		private userDao: UserDao,
		private passengerDao: PassengerDao,
		private driverDao: DriverDao
	)
	{ }

	currentUser: Option<User>           = None
	currentPassenger: Option<Passenger> = None
	currentDriver: Option<Driver>       = None

	async userLogin( email: string,
		password: string ): Promise<boolean> {
		//TODO: deberia devolver obtener token igualmente
		const result = await loginUser( this.authRepository, email, password )

		if ( result.isErr() ) {
			console.log( 'user login error' )
			console.log( result.unwrapErr() )
			return false
		}

		this.currentUser = Some( result.unwrap() )

		const passengerCheck = await this.getPassenger()

		if ( !passengerCheck ) {
			this.currentUser = None
			return false
		}

		const d = await this.driverDao.getByEmail( this.currentUser.unwrap().email )
		console.log( 'd' )
		console.log( d )
		return true
	}

	async getPassenger(): Promise<boolean> {

		const passengerResult = await this.passengerDao.getByEmail(
			this.currentUser.unwrap().email )

		if ( passengerResult.isErr() ) {
			console.log( 'get passenger error' )
			console.log( passengerResult.unwrapErr() )
			return false
		}

		this.currentPassenger = Some( passengerResult.unwrap() )

		return true
	}

	async userRegister(
		email: string,
		password: string
	): Promise<boolean> {
		//TODO: deberia devolver un string, en caso de token

		// await this.auth.createUserWithEmailAndPassword(email, password)
		const result = await createUser(
			this.authRepository, { email, password }
		)
		if ( result.isErr() ) {
			console.log( 'user register error' )
			console.log( result.unwrapErr() )
			return false
		}

		const resultLogin = await loginUser( this.authRepository, email, password )

		if ( resultLogin.isErr() ) {
			console.log( 'user login error' )
			console.log( resultLogin.unwrapErr() )
			return false
		}

		this.currentUser = Some( resultLogin.unwrap() )
		return true
	}


	async updatePassenger( partialProps: {
		email?: string,
		image?: string,
		name?: string,
		lastName?: string,
		description?: string,
		phone?: string,
		country?: string,
		gender?: string
		preferences?: PreferenceProps[],
	} ): Promise<boolean> {
		if ( this.currentPassenger.isNone() ) {
			return false
		}
		const result = await updatePassenger( this.passengerDao,
			this.currentPassenger.unwrap(), partialProps )

		if ( result.isErr() ) {
			console.log( 'update passenger error' )
			console.log( result.unwrapErr() )
			return false
		}

		this.currentPassenger = Some( result.unwrap() )
		return true
	}

	async registerPassenger( props: {
		name: string,
		lastName: string,
		phone: string,
		birthDay: Date,
		country: string,
		gender: string
	} ): Promise<boolean> {
		if ( this.currentUser.isNone() ) {
			return false
		}

		const result = await createPassenger( this.passengerDao, {
			name    : props.name,
			lastName: props.lastName,
			phone   : props.phone,
			birthDay: props.birthDay,
			country : props.country,
			gender  : props.gender,
			email   : this.currentUser.unwrap().email
		} )

		if ( result.isErr() ) {
			console.log( 'register passenger error' )
			console.log( result.unwrapErr() )
			return false
		}

		this.currentPassenger = Some( result.unwrap() )

		return true
	}


	async authLogout(): Promise<boolean> {
		const resultUser = await logoutUser( this.authRepository,
			this.currentUser.unwrap().email )

		if ( resultUser.isErr() ) {
			console.log( 'user authLogout response error' )
			console.log( resultUser.unwrapErr() )
		}
		//TODO: quitar token
		this.currentUser      = None
		this.currentPassenger = None
		return true
	}

	async checkUserEmail( email: string ): Promise<boolean> {
		const existResult = await getUserByEmail( this.userDao, email )
		if ( existResult.isErr() ) {
			return false
		}
		return true
	}

	async resetPasswordSend( email: string ): Promise<boolean> {
		const result = await sendResetPassword( this.authRepository, email )

		if ( result.isErr() ) {
			console.log( 'auth reset error' )
			return false
		}
		return true
	}

	async deleteAccount(): Promise<boolean> {
		if ( this.currentUser.isNone() ) {
			return false
		}
		await deleteAccount( this.authRepository, this.currentUser.unwrap().email )

		if ( this.currentPassenger.isSome() ) {
			await deletePassenger( this.passengerDao,
				this.currentUser.unwrap().email )
			this.currentPassenger = None
		}

		this.currentUser = None
		return true
	}
}
