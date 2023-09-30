import {
  CategoryDescription,
  newCategoryDescription
} from 'src/package/category/domain/models/category-description'
import {
  CategoryID,
  newCategoryID
} from 'src/package/category/domain/models/category-id'
import {
  CategoryName,
  newCategoryName
} from 'src/package/category/domain/models/category-name'
import {
  CategoryPhoto,
  newCategoryPhoto
} from 'src/package/category/domain/models/category-photo'

export interface Category {
  id: CategoryID
  name: CategoryName
  photo: CategoryPhoto
  description: CategoryDescription
}

export interface CategoryProps {
  id: string
  name: string
  photo: string
  description: string
}

export const newCategory = ( props: CategoryProps ): Category => {
  return {
    id         : newCategoryID( {
      value: props.id
    } ),
    name       : newCategoryName( {
      value: props.name
    } ),
    photo      : newCategoryPhoto( {
      value: props.photo
    } ),
    description: newCategoryDescription( {
      value: props.description
    } )
  }
}
