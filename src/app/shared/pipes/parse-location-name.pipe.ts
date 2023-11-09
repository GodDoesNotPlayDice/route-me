import {
	Pipe,
	PipeTransform
} from '@angular/core'

@Pipe( {
	name      : 'parseLocationName',
	standalone: true
} )
export class ParseLocationNamePipe implements PipeTransform {

	transform( value: unknown, ...args: unknown[] ): unknown {
		console.log('value parse pipe')
		console.log(value)
		if ( typeof value !== 'string' ) {
			return null
		}
		const split = value.split( ',' )
		return `${ split[0] }, ${ split[1] }, ${ split[3] }`
	}

}
