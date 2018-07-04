import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { DataTableComponent } from './data-table/data-table.component';
import { DataTableDirective } from './data-table.directive';
import {FormsModule} from '@angular/forms';
import { SetTableHeaderWidthDirective } from './set-table-header-width.directive';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    DataTableDirective,
    SetTableHeaderWidthDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
