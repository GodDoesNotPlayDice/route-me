import { Result } from 'oxide.ts'
import { IP } from 'src/package/ip-api/domain/models/ip'

export abstract class IpDao {
	abstract getIp(): Promise<Result<IP, Error>>
}
