import { Result } from 'oxide.ts'
import {
	DriverDocumentReference,
	newDriverDocumentReference
} from 'src/package/driver-document/domain/models/driver-document-reference'
import { FakeImageUrlMother } from 'src/test/app/stubs/object-mothers/shared/faker/fake-image-url-mother'

export class DriverDocumentReferenceMother{
	static random() :Result<DriverDocumentReference, Error>{
		return newDriverDocumentReference({
			value: FakeImageUrlMother.random()
		})
	}

	static invalid() :Result<DriverDocumentReference, Error>{
		return newDriverDocumentReference({
			value:''
		})
	}
}
