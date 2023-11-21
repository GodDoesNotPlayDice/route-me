import { Result } from 'oxide.ts'
import { PreferenceDao } from 'src/package/preference/domain/dao/preference-dao'
import { Preference } from 'src/package/preference/domain/models/preference'

export const getAllPreferences = async ( dao: PreferenceDao ): Promise<Result<Preference[], Error[]>> => {
	return await dao.getAll()
}
