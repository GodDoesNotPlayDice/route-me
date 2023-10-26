import { faker } from '@faker-js/faker'

export class FakerVehicleModelMother {
	static random(): string {
		return faker.vehicle.model()
	}
}
