import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnChanges {

  constructor() {
  }

  // TBB Variable
  @Input() tableDataDetails;
  @Input() tableData;
  @Input() tableHeadersList;
  @Output() tableDataChange = new EventEmitter();
  @Output() buttonClickEvent = new EventEmitter();
  public pageSize: number;
  public numberOfPages: number;

  // Required Variables

  public currentPage;
  public scrollTracker;
  public lastSelectedRadio: number;
  public selectedCheckBoxes: number[] = [];

  // Temp Variable


  ngOnInit(): void {
    this.currentPage = 0;
    this.scrollTracker = 5;
    this.pageSize = 13;

    // this.numberOfPages = (this.tableData.length) / this.pageSize;
  }

  ngOnChanges() {
    // only run when property "data" changed
    if (this.tableData) {
      this.numberOfPages = Math.ceil((this.tableData.length) / this.pageSize);
    }
  }


  concatenatedName(item, detailsOfProperties) {
    const valueProperty = detailsOfProperties.name;
    if (detailsOfProperties.root) {
      const rootArray = detailsOfProperties.root.split('.');
      let innerObject = item;
      for (let i = 0; i < rootArray.length; i++) {
        innerObject = innerObject[rootArray[i]];
      }
      return innerObject[valueProperty];
    }
    return item[valueProperty];
  }

  counter() {
    if (this.numberOfPages <= 5) {
      return new Array(this.numberOfPages);
    } else {
      return new Array(5);
    }
  }

  paginatedtableData() {
    const startPoint = this.currentPage * this.pageSize;
    const endPoint = startPoint + this.pageSize;
    if (this.tableData) {
      return this.tableData.slice(startPoint, endPoint);
    }

  }

  itemId(rowNumber) {
    return this.pageSize * (this.currentPage) + rowNumber + 1;
  }

  navigateUsingPreviousOrNext(navigationDirection: String) {
    if (navigationDirection === 'previous' && this.currentPage > 0) {
      if (this.currentPage > 5 && this.currentPage <= (this.numberOfPages - 2)) {
        --this.scrollTracker;
      }
      --this.currentPage;
    } else if (navigationDirection === 'next' && this.currentPage < (this.numberOfPages - 1)) {
      if (this.currentPage >= 5 && this.currentPage < (this.numberOfPages - 2)) {
        ++this.scrollTracker;
      }
      ++this.currentPage;
    }
    console.log('scroll : ' + this.scrollTracker + '  current : ' + this.currentPage);
  }

  jumpToAPage(newPage: String) {
    this.currentPage = newPage;
    if (this.currentPage >= 5 && this.currentPage <= (this.numberOfPages - 2)) {
      this.scrollTracker = newPage;
    } else if (this.currentPage < 5) {
      this.scrollTracker = 5;
    } else if (this.currentPage > this.numberOfPages - 2 && this.currentPage > 5) {
      this.scrollTracker = this.numberOfPages - 2;
    }
    console.log('scroll : ' + this.scrollTracker + '  current : ' + this.currentPage);
  }

  updateData(event, rowNumber: number, columnNumber) {
    // Handle Radio Button Toggle
    const selectedObjectNumber = this.currentPage * this.pageSize + rowNumber;
    const propertyName = this.tableDataDetails[columnNumber].name;
    if (this.tableDataDetails[columnNumber].subType === 'radio') {
      this.tableData[selectedObjectNumber][propertyName] = true;
      if (!isNaN(this.lastSelectedRadio) && this.lastSelectedRadio !== selectedObjectNumber) {
        this.tableData[this.lastSelectedRadio][propertyName] = false;
      }
      this.lastSelectedRadio = selectedObjectNumber;
    } else
    // Handle Checkbox Toggles
    if (this.tableDataDetails[columnNumber].subType === 'checkbox') {
      this.tableData[selectedObjectNumber][propertyName] = event.target.checked;
      if (event.target.checked) {
        this.selectedCheckBoxes.push(selectedObjectNumber);
      } else {
        this.selectedCheckBoxes.splice(this.selectedCheckBoxes.indexOf(selectedObjectNumber), 1);
      }
      console.log(this.selectedCheckBoxes);
    } else {
      this.tableData[selectedObjectNumber][propertyName] = event.target.value;
    }
  }

  buttonClickEmitter(event, rowNumber, columnNumber) {
    const emittedObject = {
      selectedObject : (this.currentPage * this.pageSize + rowNumber),
      actionName : this.tableDataDetails[columnNumber].elementDesc
    };
    this.buttonClickEvent.emit(emittedObject);
  }

}
