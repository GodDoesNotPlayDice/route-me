import { Result } from 'oxide.ts'
import { Preference } from 'src/package/preference/domain/models/preference'
import { PreferenceID } from 'src/package/preference/domain/models/preference-id'

export abstract class PreferenceDao {
  abstract getById( id: PreferenceID ): Promise<Result<Preference, Error[]>>

  abstract getAll(): Promise<Result<Preference[], Error[]>>
}