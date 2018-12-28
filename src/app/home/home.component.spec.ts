import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from "../material/material.module";
import { HomeRoutingModule } from "./home-routing.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { UsersComponent } from "./users/users.component";
import { HomeComponent } from "./home.component";
import { ProjectsComponent } from './projects/projects.component';
import { TaskComponent } from './task/task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';

import { HttpClientModule } from '@angular/common/http';

import { MockBackend } from '@angular/http/testing';

import { RouterModule,Routes} from '@angular/router';
import {RouterTestingModule } from '@angular/router/testing';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HomeRoutingModule,
        CommonModule,
        FormsModule,
        RouterModule,RouterTestingModule,
        HttpModule,
        HttpClientModule
      ],
      providers: [
        RouterModule,RouterTestingModule,
        HttpModule,
        HttpClientModule,
        { provide: XHRBackend, useClass: MockBackend }
      ],
      declarations: [UsersComponent, HomeComponent, ProjectsComponent, TaskComponent, ViewTaskComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
