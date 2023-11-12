import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { ReportMessageInvalidException } from 'src/package/report/domain/exceptions/report-message-invalid-exception'
import { z } from 'zod'

export const ReportMessageSchema = z.object( {
	value: z.string()
	        .min( 1 )
	        .max( 50 )
} )

type ReportMessageType = z.infer<typeof ReportMessageSchema>

export interface ReportMessage extends ReportMessageType {}

export interface ReportMessageProps {
	value: string
}

/**
 * Create a passenger description instance
 * @throws {ReportMessageInvalidException} - if description is invalid
 */
export const newReportMessage = ( props: ReportMessageProps ): Result<ReportMessage, Error> => {
	const result = ReportMessageSchema.safeParse( {
		value: props.value
	} )

	if ( !result.success ) {
		return Err( new ReportMessageInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}
