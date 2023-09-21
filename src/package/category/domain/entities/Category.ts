import {
  CategoryDescription,
  CategoryID,
  CategoryName,
  CategoryPhoto
} from 'src/package/category/domain/value-objects'

export class Category {
  private constructor(
    readonly id: CategoryID,
    readonly name: CategoryName,
    readonly description: CategoryDescription,
    readonly photo: CategoryPhoto
  )
  {}

  static from(
    id: CategoryID,
    name: CategoryName,
    description: CategoryDescription,
    photo: CategoryPhoto
  ): Category {
    return new Category(
      id,
      name,
      description,
      photo
    )
  }
}
