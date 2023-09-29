import {
	CategoryID,
} from 'src/package/category'
import {
	ChatID,
} from 'src/package/chat/domain/models'
import {
	DriverID,
} from 'src/package/driver/domain/models'
import {
	PassengerID,
} from 'src/package/passenger'
import {
  CreatedAt,
  CreatedAtSchema,
  LocationSchema
} from 'src/package/shared'
import {
  EndTripDate,
  EndTripDateSchema,
  TripDescription,
  TripDescriptionSchema,
  TripID,
  TripIDSchema,
  TripName,
  TripNameSchema,
  TripPrice,
  TripPriceSchema,
  TripSeat,
  TripSeatSchema,
  TripState
} from 'src/package/trip/domain/models'
import { z } from 'zod'

// const TripSchema = z.object( {
// 	id           : TripIDSchema,
// 	name         : TripNameSchema,
// 	description  : TripDescriptionSchema,
// 	state        : TripNameSchema,
// 	price        : TripPriceSchema,
// 	seat         : TripSeatSchema,
// 	startLocation: LocationSchema,
// 	endLocation  : LocationSchema,
// 	startDate    : CreatedAtSchema,
// 	endDate      : EndTripDateSchema
// } )
//
// type TripType = z.infer<typeof TripSchema>
export interface Trip {
  id : TripID
  name : TripName
  description : TripDescription
  state : TripState
  price : TripPrice
  seat : TripSeat
  startLocation : Location
  endLocation : Location
  startDate : CreatedAt
  endDate : EndTripDate
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
      value: props.startDate,
		} )
	}
}
