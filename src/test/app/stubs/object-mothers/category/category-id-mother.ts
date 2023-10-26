import { Result } from 'oxide.ts'
import {
	CategoryID,
	newCategoryID
} from 'src/package/category/domain/models/category-id'
import { ulid } from 'ulidx'

export class CategoryIDMother {
	static random(): Result<CategoryID, Error> {
		return newCategoryID( {
			value: ulid()
		} )
	}

	static invalid(): Result<CategoryID, Error> {
		return newCategoryID( {
			value: ''
		} )
	}
}
