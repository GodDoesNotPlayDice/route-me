import {
  Directive,
  ElementRef,
  HostListener,
  Input
} from '@angular/core'

@Directive({
  standalone: true,
  selector: '[selectInput]'
})
export class SelectInputDirective {
  @Input('selectInput') shouldSelect: boolean;

  constructor(private el: ElementRef) { }

  @HostListener('focus')
  onFocus() {
    if (this.shouldSelect) {
      this.el.nativeElement.select();
    }
  }
}
