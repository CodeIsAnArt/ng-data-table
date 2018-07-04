import {
  Directive,
  ElementRef,
  Input,
  AfterViewInit,
  AfterContentChecked,
  Output,
  EventEmitter,
  OnInit,
  AfterViewChecked
} from '@angular/core';
import {timeout} from 'rxjs/operators';

@Directive({
  selector: '[appDataTable]'
})
export class DataTableDirective implements AfterViewChecked {
  @Input() columnWidths;
  @Output() columnWidthsChange = new EventEmitter();
  @Input() columnWidthsTemp;
  @Output() columnWidthsTempChange = new EventEmitter();
  @Input() headerPosition;
  @Input() setTableWidth;

  constructor(private el: ElementRef) {

  }

  ngAfterViewChecked() {

    const width = this.el.nativeElement.offsetWidth;

    if (width !== this.columnWidths[this.headerPosition]) {
      this.columnWidthsTemp[this.headerPosition] = width;
      this.setTableWidth.next(this.columnWidthsTemp);
    }
  }


}
