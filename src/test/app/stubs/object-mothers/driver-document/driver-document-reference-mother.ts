import { Result } from 'oxide.ts'
import {
	DriverDocumentReference,
	newDriverDocumentReference
} from 'src/package/driver-document/domain/models/driver-document-reference'
import { FakerImageUrlMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-image-url-mother'

export class DriverDocumentReferenceMother {
	static random(): Result<DriverDocumentReference, Error> {
		return newDriverDocumentReference( {
			value: FakerImageUrlMother.random()
		} )
	}

	static invalid(): Result<DriverDocumentReference, Error> {
		return newDriverDocumentReference( {
			value: ''
		} )
	}
}
