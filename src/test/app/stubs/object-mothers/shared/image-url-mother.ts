import { Result } from 'oxide.ts'
import {
	ImageUrl,
	newImageUrl
} from 'src/package/shared/domain/models/image-url'
import { FakerAvatarMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-avatar-mother'

export class ImageUrlMother {

	static random(): Result<ImageUrl, Error> {
		return newImageUrl( {
			value: FakerAvatarMother.random()
		} )
	}

	static invalid(): Result<ImageUrl, Error> {
		return newImageUrl( {
			value: ''
		} )
	}
}
