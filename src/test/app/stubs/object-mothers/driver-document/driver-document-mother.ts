import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { DriverDocument } from 'src/package/driver-document/domain/models/driver-document'
import { DriverDocumentIDMother } from 'src/test/app/stubs/object-mothers/driver-document/driver-document-id-mother'
import { DriverDocumentNameMother } from 'src/test/app/stubs/object-mothers/driver-document/driver-document-name-mother'
import { DriverDocumentReferenceMother } from 'src/test/app/stubs/object-mothers/driver-document/driver-document-reference-mother'

export class DriverDocumentMother {
	static random(): Result<DriverDocument, Error[]> {
		return Ok( {
			id       : DriverDocumentIDMother.random()
			                                 .unwrap(),
			name     : DriverDocumentNameMother.random()
			                                   .unwrap(),
			reference: DriverDocumentReferenceMother.random()
			                                        .unwrap()
		} )
	}

	static invalid(): Result<DriverDocument, Error[]> {
		return Err( [
			DriverDocumentIDMother.invalid()
			                      .unwrapErr(),
			DriverDocumentNameMother.invalid()
			                        .unwrapErr(),
			DriverDocumentReferenceMother.invalid()
			                             .unwrapErr()
		] )
	}
}
