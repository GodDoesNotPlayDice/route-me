import { HttpClient } from '@angular/common/http'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { ipFromJson } from 'src/package/ip-api/application/ip-mapper'
import { IpDao } from 'src/package/ip-api/domain/dao/ip-dao'
import { IP } from 'src/package/ip-api/domain/models/ip'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'

export class IpDaoIpApi implements IpDao{
	constructor( private http: HttpClient ) {}

	readonly url = 'https://ipapi.co/json'

	async getIp(): Promise<Result<IP, Error>> {
		const response = await this.http.get( this.url ).toPromise()

		if ( response === undefined ) {
			return Err(new UnknownException( 'ip dao. get ip. ip api' ) )
		}

		const ip = ipFromJson( response as Record<string, any> )

		if ( ip.isErr() ) {
			return Err( ip.unwrapErr() )
		}

		return Ok( ip.unwrap() )
	}
}
