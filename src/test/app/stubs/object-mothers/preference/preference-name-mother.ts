import { faker } from '@faker-js/faker'
import { Result } from 'oxide.ts'
import {
	newPreferenceName,
	PreferenceName
} from 'src/package/preference/domain/models/preference-name'

//TODO: cambiar inputs
const categories = ['Electrónica', 'Ropa', 'Hogar', 'Deportes', 'Juguetes', 'Libros', 'Automóviles'];

export class PreferenceNameMother {
	static random() :Result<PreferenceName, Error>{
		return newPreferenceName({
			value: faker.helpers.arrayElement(categories)
		})
	}

	static invalid() :Result<PreferenceName, Error>{
		return newPreferenceName({
			value: ''
		})
	}
}
