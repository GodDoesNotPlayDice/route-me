export class NearTrip {
  constructor(
    readonly id: string,
    readonly tripID: string,
    readonly startDate: Date,
    readonly endDate: Date,
    readonly startLocation: string,
    readonly endLocation: string,
    readonly categoryName: string,
    readonly latitude: number,
    readonly longitude: number
  )
  {}
}
