import { ReportID } from 'src/package/report/domain/models/report-id'
import { ReportMessage } from 'src/package/report/domain/models/report-message'
import { Email } from 'src/package/shared/domain/models/email'

export interface Report {
	id: ReportID
	fromUser: Email,
	toUser: Email,
	message: ReportMessage,
}
