import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';


import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../material/material.module";
import {RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";




import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      
      imports: [BrowserAnimationsModule,RouterTestingModule,FormsModule, MaterialModule,HttpClientTestingModule],
      declarations: [ TaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
