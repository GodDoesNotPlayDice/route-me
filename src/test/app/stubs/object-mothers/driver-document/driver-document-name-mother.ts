import { faker } from '@faker-js/faker'
import { Result } from 'oxide.ts'
import {
	DriverDocumentName,
	newDriverDocumentName
} from 'src/package/driver-document/domain/models/driver-document-name'

export class DriverDocumentNameMother {
	static random(): Result<DriverDocumentName, Error> {
		return newDriverDocumentName( {
			value: faker.helpers.arrayElement( categories )
		} )
	}

	static invalid(): Result<DriverDocumentName, Error> {
		return newDriverDocumentName( {
			value: ''
		} )
	}
}

//TODO: cambiar inputs
const categories = [ 'Electrónica', 'Ropa', 'Hogar', 'Deportes', 'Juguetes', 'Libros', 'Automóviles' ]
