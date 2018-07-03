import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public tableData;
  public url = 'http://www.json-generator.com/api/json/get/cfTGUZqOZK?indent=2';
  public obs = this.http.get(this.url);
  public delayedObservable = this.http.get(this.url).pipe(delay(5000));

  public tableHeadersList: String[] = ['Id', 'Allot Acc', 'Dep Ind', 'Fac Desc', 'IpaId', 'RCD', 'Enter', 'Submit'];
  public tableDataDetails = [{
    'name': 'id',
    'type': 'id',
    'root': ''
  }, {
    'name': 'setOrNotRadiobox',
    'type': 'input',
    'subType': 'radio',
    'root': ''
  }, {
    'name': '_id',
    'type': '',
    'root': ''
  }, {
    'name': 'setOrNotCheckbox',
    'type': 'input',
    'subType': 'checkbox',
    'root': ''
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
    this.obs.subscribe(data => {
      this.tableData = data;
    });
    this.delayedObservable.subscribe(data => {
      this.tableData = [...this.tableData, ...data];
    });
  }

  constructor(private http: HttpClient) {
  }

  ButtonListener(event) {
    console.log(event);
  }

}
