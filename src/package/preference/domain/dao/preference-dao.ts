import { Result } from 'oxide.ts'
import { Preference } from 'src/package/preference/domain/models/preference'

export abstract class PreferenceDao {
	abstract getAll(): Promise<Result<Preference[], Error[]>>

	abstract create( preference: Preference ): Promise<Result<boolean, Error[]>>
}
