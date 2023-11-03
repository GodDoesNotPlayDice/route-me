import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseLocationName',
  standalone: true
})
export class ParseLocationNamePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if ( value !== 'string' ) return null
    const startSplitted = value.split( ',' )
    return `${ startSplitted[ 0 ] }, ${ startSplitted[ 1 ] }, ${ startSplitted[ 3 ] }`
  }

}
