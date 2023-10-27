import { faker } from '@faker-js/faker'
import { Result } from 'oxide.ts'
import { newPreferenceIcon } from 'src/package/preference/domain/models/preference-icon'
import { PreferenceName } from 'src/package/preference/domain/models/preference-name'

//TODO: cambiar inputs
const categories = [ 'Electrónica', 'Ropa', 'Hogar', 'Deportes', 'Juguetes',
	'Libros', 'Automóviles' ]

export class PreferenceIconMother {
	static random(): Result<PreferenceName, Error> {
		return newPreferenceIcon( {
			value: faker.helpers.arrayElement( categories )
		} )
	}

	static invalid(): Result<PreferenceName, Error> {
		return newPreferenceIcon( {
			value: ''
		} )
	}
}
