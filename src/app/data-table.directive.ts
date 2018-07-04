import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appDataTable]'
})
export class DataTableDirective {
@Input() thead;
@Input() trow;
  constructor(private el: ElementRef) {console.log(this.thead);

    console.log(this.el);}


}
