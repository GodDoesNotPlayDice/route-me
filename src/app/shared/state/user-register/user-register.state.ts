import { z } from 'zod'

export const UserPreferenceSchema = z.object( {
  icon: z.string(),
  name: z.string()
} )

export type UserPreference = z.infer<typeof UserPreferenceSchema>

export interface UserPreferenceProps {
  icon: string,
  name: string
}

export const newUserPreference = (props : UserPreferenceProps): UserPreference => {
  return UserPreferenceSchema.parse( {
    icon: props.icon,
    name: props.name
  })
}

export const UserRegisterStateSchema = z.object( {
  email      : z.string(),
  password   : z.string(),
  name       : z.string(),
  lastName   : z.string(),
  phone      : z.string(),
  country    : z.string(),
  genre      : z.string(),
  birthDay   : z.date(),
  description: z.string(),
  preferences: z.array( UserPreferenceSchema )
} )

export type UserRegisterState = z.infer<typeof UserRegisterStateSchema>

export interface UserRegisterStateProps {
  email      : string,
  password   : string,
  name       : string,
  lastName   : string,
  phone      : string,
  country    : string,
  genre      : string,
  birthDay   : Date,
  description: string,
  preferences: UserPreference[]
}

export const newUserRegisterState = (props : UserRegisterStateProps): UserRegisterState => {
  return UserRegisterStateSchema.parse( {
    email      : props.email,
    password   : props.password,
    name       : props.name,
    lastName   : props.lastName,
    phone      : props.phone,
    country    : props.country,
    genre      : props.genre,
    birthDay   : props.birthDay,
    description: props.description,
    preferences: props.preferences
  } )
}

