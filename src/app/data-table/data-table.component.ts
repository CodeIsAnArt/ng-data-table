import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild, AfterViewInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {PagerService} from '../pagerservice';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnChanges {

  constructor(private http: HttpClient,
              private  pagerService: PagerService) {
  }

  // TBB Variable
  @Input() tableDataDetails;
  @Input() tableHeadersList;
  @Output() tableDataChange = new EventEmitter();
  @Output() buttonClickEvent = new EventEmitter();
  @Input() pageSize;
  @Input() paginationUrl;

  // Required Variables
  public numberOfPages: number;
  public tableData;
  public lastSelectedRadio: number;
  public selectedCheckBoxes: number[] = [];
  public columnWidths: number[];
  public setTableWidth: Subject<number[]>;
  public subscription;
  public columnWidthsTemp = [];
  public finalUrl: string;
  public serverPageSize = 100;
  public endOfData = false;
  public currentServerPage = 1;
  public paginationDetails: any = {};
  public paginatedItems: any[];
  public currentPage = 1;
  public callInPProgress = true;
  ngOnInit(): void {

    this.columnWidths = new Array(this.tableDataDetails.length);
    this.tableData = [];
    // this.setTableWidth = new Subject();
    // this.subscription = this.setTableWidth.pipe(debounceTime(1000)).subscribe(finalArray => {
    //   this.columnWidths = finalArray;
    // });
    this.getTableDataObservable();

  }

  ngOnChanges() {
    // only run when property "data" changed
    // if (this.tableData) {
    //   this.numberOfPages = Math.ceil((this.tableData.length) / this.pageSize);
    // }
  }

  getTableDataObservable() {
    this.callInPProgress = true;
    this.setPaginationLimits((this.currentServerPage), this.serverPageSize);
    this.http.get(this.paginationUrl).subscribe((data: any[]) => {
      if (data.length < 100) {
        this.endOfData = true;
      }
      this.tableData = [...this.tableData, ...data];
      this.numberOfPages = Math.ceil((this.tableData.length) / this.pageSize);
      this.navigateToPage(this.currentPage);
      this.callInPProgress = false;
    });
  }

  setPaginationLimits(pgno, pgsize) {
    this.finalUrl = this.paginationUrl + '?pgno=' + pgno + '&pgsize=' + pgsize;
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


  itemId(rowNumber) {
    return this.pageSize * (this.currentPage - 1) + rowNumber + 1;
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
      console.log(this.lastSelectedRadio);
      console.log(selectedObjectNumber);
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
      selectedObject: (this.itemId(rowNumber) - 1),
      actionName: this.tableDataDetails[columnNumber].elementDesc
    };
    this.buttonClickEvent.emit(emittedObject);
  }

  navigateToPage(page: number) {
    this.paginationDetails = this.pagerService.getPager(this.tableData.length, page);
    this.paginatedItems = this.tableData.slice(this.paginationDetails.startIndex, this.paginationDetails.endIndex + 1);
    this.currentPage = this.paginationDetails.currentPage;
    console.log(this.paginationDetails);
    if (this.paginationDetails.endPage === this.paginationDetails.currentPage) {
      this.getTableDataObservable();
    }
  }
}
