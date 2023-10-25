import { faker } from "@faker-js/faker";

export class FakerDescriptionMother {
	static random() : string{
		return faker.person.bio()
	}
}
