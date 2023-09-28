import { z } from 'zod'

export const AvatarSchema = z.object( {
  url : z.string(),
  name: z.string()
} )

export type Avatar = z.infer<typeof AvatarSchema>

interface AvatarProps {
  url : string,
  name: string
}

export const newAvatar = (props : AvatarProps): Avatar => {
  return AvatarSchema.parse( {
    url : props.url,
    name: props.name
  } )
}
