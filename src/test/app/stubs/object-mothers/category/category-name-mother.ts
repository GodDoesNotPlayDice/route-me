import { faker } from '@faker-js/faker'
import { Result } from 'oxide.ts'
import {
	CategoryName,
	newCategoryName
} from 'src/package/category/domain/models/category-name'

export class CategoryNameMother {
	static random(): Result<CategoryName, Error> {
		return newCategoryName( {
			value: faker.helpers.arrayElement( categories )
		} )
	}

	static invalid(): Result<CategoryName, Error> {
		return newCategoryName( {
			value: ''
		} )
	}
}

//TODO: cambiar inputs
const categories = [ 'Electrónica', 'Ropa', 'Hogar', 'Deportes', 'Juguetes',
	'Libros', 'Automóviles' ]
