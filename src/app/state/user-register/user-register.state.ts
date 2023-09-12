export interface UserRegisterState {
  email :string,
  name :string,
  lastName :string,
  password :string,
  description :string,
  phone :string,
  country :string,
  birthDay :Date,
  preferences : UserPreference[]
}

export interface UserPreference {
  icon: string,
  name: string
}
