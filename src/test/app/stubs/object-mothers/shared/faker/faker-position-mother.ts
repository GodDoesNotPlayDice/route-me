import { faker } from '@faker-js/faker'

export class FakerPositionMother {
	static random() {
		return {
			lng: faker.location.longitude(),
			lat: faker.location.latitude()
		}
	}

	static nearRandom( center: {
		lng: number,
		lat: number
	}, radius: number )
	{
		return faker.location.nearbyGPSCoordinate( {
			origin: [ center.lat, center.lng ],
			radius: radius,
			isMetric: true
		} )
	}
}
