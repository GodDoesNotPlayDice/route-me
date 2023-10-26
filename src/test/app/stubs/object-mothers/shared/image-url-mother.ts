import { Result } from 'oxide.ts'
import {
	ImageUrl,
	newImageUrl
} from 'src/package/shared/domain/models/image-url'
import { FakeImageUrlMother } from './faker/fake-image-url-mother'

export class ImageUrlMother {

	static random(): Result<ImageUrl, Error> {
		return newImageUrl({
			value: FakeImageUrlMother.random()
		})
	}

	static invalid(): Result<ImageUrl, Error> {
		return newImageUrl({
			value: ''
		})
	}
}
