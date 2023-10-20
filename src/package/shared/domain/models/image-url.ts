import {
  Err,
  Ok,
  Result
} from 'oxide.ts'

import { ImageUrlInvalidException } from 'src/package/shared/domain/exceptions/image-url-invalid-exception'
import { z } from 'zod'

export const ImageUrlSchema = z.object( {
  value: z.string()
          .min( 1 )
} )

type ImageUrlType = z.infer<typeof ImageUrlSchema>

export interface ImageUrl extends ImageUrlType {}

interface ImageUrlProps {
  value: string
}

/**
 * Create a user email instance
 * @throws {ImageUrlInvalidException} - if image is invalid
 */
export const newImageUrl = ( props: ImageUrlProps ): Result<ImageUrl, Error> => {
  const result = ImageUrlSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new ImageUrlInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
