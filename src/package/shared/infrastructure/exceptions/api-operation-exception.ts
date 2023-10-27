import { InfrastructureOperationException } from 'src/package/shared/infrastructure/exceptions/infrastructure-operation-exception'

export class ApiOperationException extends InfrastructureOperationException {
	constructor( message?: string ) {
		super( message )
		this.name = 'ApiOperationException'
	}
}
