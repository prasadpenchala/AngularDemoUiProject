import { importExpr } from "@angular/compiler/src/output/output_ast";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import {
  FilterPipe,
  ViewFilter,
  ViewFilter1,
  ViewFilter2,
  ViewFilter3
} from "./pipes/filter.pipe";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { PagerService } from "./services/page.service";
import { DateTimeFormatter } from "./services/DateFormat";
import { DatePipe } from "@angular/common";

import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    ViewFilter,
    ViewFilter1,
    ViewFilter2,
    ViewFilter3
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    FlexLayoutModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  exports: [FormsModule, FlexLayoutModule],
  providers: [PagerService, DateTimeFormatter, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
