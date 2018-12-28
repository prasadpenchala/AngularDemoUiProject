import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';

import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../material/material.module";
import {RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";




import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';



import { NgForm } from "@angular/forms";

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule,RouterTestingModule,FormsModule, MaterialModule,HttpClientTestingModule],
      declarations: [ProjectsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
