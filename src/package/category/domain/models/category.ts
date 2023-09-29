import {
  CategoryDescription,
  CategoryID,
  CategoryName,
  CategoryPhoto,
  newCategoryDescription,
  newCategoryID,
  newCategoryName,
  newCategoryPhoto
} from '.'

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
