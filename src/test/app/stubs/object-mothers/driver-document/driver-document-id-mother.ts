import { Result } from 'oxide.ts'
import {
	DriverDocumentID,
	newDriverDocumentID
} from 'src/package/driver-document/domain/models/driver-document-id'
import { ulid } from 'ulidx'

export class DriverDocumentIDMother{
	static random() :Result<DriverDocumentID, Error>{
		return newDriverDocumentID({
			value:ulid()
		})
	}

	static invalid() :Result<DriverDocumentID, Error>{
		return newDriverDocumentID({
			value:''
		})
	}
}
