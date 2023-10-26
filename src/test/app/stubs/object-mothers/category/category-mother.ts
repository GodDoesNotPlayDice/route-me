import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { Category } from 'src/package/category/domain/models/category'
import { CategoryIDMother } from 'src/test/app/stubs/object-mothers/category/category-id-mother'
import { CategoryNameMother } from 'src/test/app/stubs/object-mothers/category/category-name-mother'

export class CategoryMother {
	static random(): Result<Category, Error[]> {
		return Ok({
			id: CategoryIDMother.random().unwrap(),
			name: CategoryNameMother.random().unwrap()
		})
	}

	static invalid(): Result<Category, Error[]> {
		return Err([
			CategoryIDMother.invalid().unwrapErr(),
			CategoryNameMother.invalid().unwrapErr()
		])
	}
}
