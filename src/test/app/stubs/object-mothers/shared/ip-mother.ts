import { FakerIpMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-ip-mother'

export class IpMother {
	static random(): string {
		return FakerIpMother.random()
	}

	static invalid(): string {
		return ''
	}
}
