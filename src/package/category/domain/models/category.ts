import { CategoryID } from 'src/package/category/domain/models/category-id'
import { CategoryName } from 'src/package/category/domain/models/category-name'

export interface Category {
	id: CategoryID
	name: CategoryName
}
