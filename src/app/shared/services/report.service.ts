import { Injectable } from '@angular/core';
import { Result } from 'oxide.ts'
import { ReportDao } from 'src/package/report/domain/dao/report-dao'
import { Report } from 'src/package/report/domain/models/report';
import { ReportID } from 'src/package/report/domain/models/report-id'
import { Email } from 'src/package/shared/domain/models/email'

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
		private reportDao: ReportDao
  ) { }

	async create( report: Report ): Promise<Result<boolean, Error[]>>{
		return this.reportDao.create( report)
	}

	async delete( id: ReportID ): Promise<Result<boolean, Error[]>>{
		return this.reportDao.delete( id )
	}

	async getByEmail( toEmail: Email ): Promise<Result<Report[], Error[]>>{
		return this.reportDao.getByEmail( toEmail )
	}
}
