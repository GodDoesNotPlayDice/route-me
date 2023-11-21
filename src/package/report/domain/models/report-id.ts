import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { ReportIdInvalidException } from 'src/package/report/domain/exceptions/report-id-invalid-exception'
import { z } from 'zod'

export const ReportIDSchema = z.object( {
	value: z.string()
	        .min( 1 )
} )

type ReportIDType = z.infer<typeof ReportIDSchema>

export interface ReportID extends ReportIDType {}

export interface ReportIDProps {
	value: string
}

/**
 * Create report id instance
 * @throws {ReportIdInvalidException} - if id is invalid
 */
export const newReportID = ( props: ReportIDProps ): Result<ReportID, Error> => {
	const result = ReportIDSchema.safeParse( {
		value: props.value
	} )

	if ( !result.success ) {
		return Err( new ReportIdInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}
