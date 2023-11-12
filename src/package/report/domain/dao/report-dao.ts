import { Result } from 'oxide.ts'
import { Report } from 'src/package/report/domain/models/report'
import { ReportID } from 'src/package/report/domain/models/report-id'
import { Email } from 'src/package/shared/domain/models/email'

export abstract class ReportDao {
	abstract create( report: Report ): Promise<Result<boolean, Error[]>>

	abstract delete( id: ReportID ): Promise<Result<boolean, Error[]>>

	abstract getByEmail( toEmail: Email ): Promise<Result<Report[], Error[]>>
}
