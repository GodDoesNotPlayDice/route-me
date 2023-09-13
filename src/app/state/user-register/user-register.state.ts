export interface UserRegisterState {
  email :string,
  password :string,
  name :string,
  lastName :string,
  phone :string,
  country :string,
  genre :string,
  birthDay :Date,
  description :string,
  preferences : UserPreference[]
}

export interface UserPreference {
  icon: string,
  name: string
}
