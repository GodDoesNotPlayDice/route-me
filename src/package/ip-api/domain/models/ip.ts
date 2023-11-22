import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { IpInvalidException } from 'src/package/ip-api/domain/exceptions/ip-invalid-exception'
import { z } from 'zod'

export interface IPProps {
	country_name: string;
	country_code: string;
	country_calling_code: string;
	currency: string;
	languages: string[];
}

export const IpSchema = z.object( {
	country_name        : z.string(),
	country_code        : z.string(),
	country_calling_code: z.string(),
	currency            : z.string(),
	languages           : z.array( z.string() )
} )

type IpType = z.infer<typeof IpSchema>

export interface IP extends IpType {}

/**
 * Create ip instance
 * @throws {IpInvalidException} - if name is invalid
 */
export const newIp = ( props: IPProps ): Result<IP, Error> => {
	const result = IpSchema.safeParse( {
		country_name        : props.country_name,
		country_code        : props.country_code,
		country_calling_code: props.country_calling_code,
		currency            : props.currency,
		languages           : props.languages
	} )

	if ( !result.success ) {
		return Err( new IpInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}
