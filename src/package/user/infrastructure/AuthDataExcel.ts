import * as XLSX from 'xlsx';
import { AuthRepository, User, UserEmail, UserPassword } from 'src/package/user/domain';
import { Result, Ok, Err } from 'oxide.ts';

export class AuthDataExcel implements AuthRepository {
  private excelData: User[] = [];

  constructor() {
    this.loadDataFromExcel();
  }

  private async loadDataFromExcel() {
    const workbook = XLSX.readFile('/src/assets/users.xlsx');
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    this.excelData = XLSX.utils.sheet_to_json(worksheet) as User[];
    console.log(this.excelData);
  }

  login(email: UserEmail, password: UserPassword): Promise<Result<User, string>> {
    return Promise.resolve( Err( 'data error' ) )
  }

  register(user: User): Promise<Result<boolean, string>> {
    return Promise.resolve(Ok(true));
  }

  getAll(): Promise<Result<User[], string>> {
    return Promise.resolve(Ok(this.excelData));
  }
}
