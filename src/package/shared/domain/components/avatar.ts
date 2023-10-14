import { z } from 'zod'

export const AvatarSchema = z.object( {
  url : z.string(),
  name: z.string()
} )

type AvatarType = z.infer<typeof AvatarSchema>

export interface Avatar extends AvatarType {}

export interface AvatarProps {
  url: string,
  name: string
}

export const newAvatar = ( props: AvatarProps ): Avatar => {
  return AvatarSchema.parse( {
    url : props.url,
    name: props.name
  } )
}
