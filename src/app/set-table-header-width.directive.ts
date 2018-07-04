import {Directive, Input, ElementRef, AfterViewChecked, Renderer2} from '@angular/core';

@Directive({
  selector: '[appSetTableHeaderWidth]'
})
export class SetTableHeaderWidthDirective implements AfterViewChecked {
  @Input() columnWidths;
  @Input() headerPosition;

  constructor(private el: ElementRef,
              private renderer: Renderer2) {
  }

  ngAfterViewChecked() {
    const width = this.columnWidths[this.headerPosition] + 'px';
    this.renderer.setStyle(this.el.nativeElement, 'width', width);
  }
}
