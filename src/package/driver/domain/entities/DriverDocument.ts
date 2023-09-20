import {
  DriverDocumentID,
  DriverDocumentName,
  DriverDocumentReference,
  DriverID
} from '../value-objects'

export class DriverDocument {
  private constructor(
    readonly id: DriverDocumentID,
    readonly driverID: DriverID,
    readonly name: DriverDocumentName,
    readonly reference : DriverDocumentReference
  ) {}

  static from(
    id: DriverDocumentID,
    driverID: DriverID,
    name: DriverDocumentName,
    reference : DriverDocumentReference
  ): DriverDocument {
    return new DriverDocument(
      id,
      driverID,
      name,
      reference
    )
  }
}
