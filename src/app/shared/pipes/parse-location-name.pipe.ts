import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseLocationName',
  standalone: true
})
export class ParseLocationNamePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if ( typeof value !== 'string' ) return null
    const split = value.split( ',' )
    return `${ split[ 0 ] }, ${ split[ 1 ] }, ${ split[ 3 ] }`
  }

}
