import {
	CategoryID,
	CategoryIDSchema
} from 'src/package/category'
import {
	ChatID,
	ChatIDSchema
} from 'src/package/chat/domain/models'
import {
	DriverID,
	DriverIDSchema
} from 'src/package/driver/domain/models'
import {
	PassengerID,
	PassengerIDSchema
} from 'src/package/passenger'
import {
	CreatedAtSchema,
	LocationSchema
} from 'src/package/shared'
import {
	EndTripDateSchema,
	TripDescriptionSchema,
	TripIDSchema,
	TripNameSchema,
	TripPriceSchema,
	TripSeatSchema
} from 'src/package/trip/domain/models'
import { z } from 'zod'

export const TripSchema = z.object( {
	id           : TripIDSchema,
	// driverID     : DriverIDSchema,
	// passengers   : z.array( PassengerIDSchema ),
	// category     : CategoryIDSchema,
	// chat         : ChatIDSchema,
	name         : TripNameSchema,
	description  : TripDescriptionSchema,
	state        : TripNameSchema,
	price        : TripPriceSchema,
	seat         : TripSeatSchema,
	startLocation: LocationSchema,
	endLocation  : LocationSchema,
	startDate    : CreatedAtSchema,
	endDate      : EndTripDateSchema.optional()
} )

export interface Trip extends z.infer<typeof TripSchema> {
	driverID: DriverID
	passengers: PassengerID[]
	category: CategoryID
	chat: ChatID
}

export interface TripProps {
	id: string
	driverID: DriverID
	passengers: PassengerID[]
	category: CategoryID
	chat: ChatID
	name: string
	description: string
	state: string
	price: number
	seat: number
	startLocation: string
	endLocation: string
	startDate: Date
	endDate: Date
}

export const newTrip = ( props: TripProps ): Trip => {
	return {
		chat         : props.chat,
		category     : props.category,
		driverID     : props.driverID,
		passengers   : props.passengers,
		id           : TripIDSchema.parse( {
			value: props.id
		} ),
		name         : TripNameSchema.parse( {
			value: props.name
		} ),
		description  : TripDescriptionSchema.parse( {
			value: props.description
		} ),
		state        : TripNameSchema.parse( {
			value: props.state
		} ),
		price        : TripPriceSchema.parse( {
			value: props.price
		} ),
		seat         : TripSeatSchema.parse( {
			value: props.seat
		} ),
		startLocation: LocationSchema.parse( {
			value: props.startLocation
		} ),
		endLocation  : LocationSchema.parse( {
			value: props.endLocation
		} ),
		startDate    : CreatedAtSchema.parse( {
			value: props.startDate
		} ),
		endDate      : EndTripDateSchema.parse( {
			value: props.endDate
		} )
	}
	// TripSchema.parse( {
	// 	id           : TripIDSchema.parse( {
	// 		value: props.id
	// 	} ),
	// 	name         : TripNameSchema.parse( {
	// 		value: props.name
	// 	} ),
	// 	description  : TripDescriptionSchema.parse( {
	// 		value: props.description
	// 	} ),
	// 	state        : TripNameSchema.parse( {
	// 		value: props.state
	// 	} ),
	// 	price        : TripPriceSchema.parse( {
	// 		value: props.price
	// 	} ),
	// 	seat         : TripSeatSchema.parse( {
	// 		value: props.seat
	// 	} ),
	// 	startLocation: LocationSchema.parse( {
	// 		value: props.startLocation
	// 	} ),
	// 	endLocation  : LocationSchema.parse( {
	// 		value: props.endLocation
	// 	} ),
	// 	startDate    : CreatedAtSchema.parse( {
	// 		value: props.startDate
	// 	} ),
	// 	endDate      : EndTripDateSchema.parse( {
	// 		value: props.endDate
	// 	} )
	// } )
}
