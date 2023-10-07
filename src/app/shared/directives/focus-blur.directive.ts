import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[focusBlur]'
})
export class FocusBlurDirective {
  @Input('focusBlur') isFocused: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges() {
    if (this.isFocused) {
      this.renderer.addClass(this.el.nativeElement, 'focused');
      this.el.nativeElement.focus();
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'focused');
      this.el.nativeElement.blur();
    }
  }
}
