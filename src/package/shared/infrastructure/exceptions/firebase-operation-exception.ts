import { InfrastructureOperationException } from 'src/package/shared/infrastructure/exceptions/infrastructure-operation-exception'

export class FirebaseOperationException
	extends InfrastructureOperationException {
	constructor( message?: string ) {
		super( message )
		this.name = 'FirebaseOperationException'
	}
}
