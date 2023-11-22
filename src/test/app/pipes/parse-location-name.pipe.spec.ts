import { ParseLocationNamePipe } from './parse-location-name.pipe'

describe( 'ParseLocationNamePipe', () => {
	it( 'create an instance', () => {
		const pipe = new ParseLocationNamePipe()
		expect( pipe )
			.toBeTruthy()
	} )
} )
