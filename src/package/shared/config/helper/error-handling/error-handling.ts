import {
  Err,
  Ok,
  Result
} from 'oxide.ts'

async function waitPromises( promises: Promise<any>[] ): Promise<Result<boolean, Error[]>> {
  const results       = await Promise.allSettled( promises )
  const errs: Error[] = []
  results.forEach( result => {
    if ( result.status === 'rejected' ) {
      errs.push( result.reason )
    }
  } )

  if ( errs.length > 0 ) {
    return Promise.resolve( Err( errs ) )
  }

  return Promise.resolve( Ok( true ) )
}

export function wrapPromise<X>( fn: () => X ): Promise<Result<X, Error[]>> {
  return new Promise<Result<X, Error[]>>(
    ( resolve, reject ) => {
      try {
        const result = fn()
        resolve( Ok( result ) )
        // return Ok( result)
      }
      catch ( error ) {
        const e = error instanceof Error ? error : new Error( 'unknown error' )
        reject( Err( e ) )
        // return Err( e )
      }
    } )
}
