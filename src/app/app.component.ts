import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public tableData;
  public paginationUrl = 'http://www.json-generator.com/api/json/get/cePNTSZYuq?indent=2';
  // public obs = this.http.get(this.url);
  // public delayedObservable = this.http.get(this.url).pipe(delay(5000));
  public pageSize = 10;
  public tableHeadersList: String[] = ['Id', 'Allot Acc', 'Dep Ind', 'Fac Desc', 'IpaId', 'RCD', 'Enter', 'Submit'];
  public tableDataDetails = [{
    'name': 'id',
    'type': 'id',
    'root': ''
  },{
    'name': '_id',
    'type': '',
    'root': ''
  },{
    'name': 'isActive',
    'type': 'input',
    'subType': 'checkbox',
    'root': ''
  }, {
    'name': 'setOrNotCheckbox',
    'type': 'button',
    'subType': 'button',
    'root': '',
    'elementDesc': 'hi'
  }, {
    'name': 'company',
    'type': '',
    'subType': 'button',
    'root': '',
    'elementDesc': 'hello button'
  }, {
    'name': 'age',
    'type': '',
    'root': ''
  }, {
    'name': 'inpval',
    'type': 'input',
    'subType': 'input',
    'root': ''
  }, {
    'name': 'facilityDescription',
    'type': 'button',
    'subType': 'button',
    'root': '',
    'elementDesc': 'Generate'
  }];

  ngOnInit() {
    // this.obs.subscribe(data => {
    //   this.tableData = data;
    // });

  }

  constructor(private http: HttpClient) {
  }

  ButtonListener(event) {
    console.log(event);
  }

}
