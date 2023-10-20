import {
  Directive,
  ElementRef,
  Input
} from '@angular/core'

@Directive( {
  standalone: true,
  selector  : '[autoFoco]'
} )
export class AutoFocoDirective {
  @Input( 'autoFoco' ) shouldFocus: boolean

  constructor( private el: ElementRef ) { }

  ngOnChanges() {
    if ( this.shouldFocus ) {
      this.el.nativeElement.focus()
    }
  }
}
