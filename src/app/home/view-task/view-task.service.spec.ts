import { TestBed } from '@angular/core/testing';

import { ViewTaskService } from './view-task.service';


import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MockBackend } from '@angular/http/testing';

let endDate = new Date();
endDate.setDate(endDate.getDate() + 1);

let taskData = {
  task: 'asdef',
  priority: 10,
  startDate: new Date(),
  "endDate": endDate,
  project: null,
  parentId: null
}

let task_id;

describe('ViewTaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpModule, HttpClientModule, HttpClientTestingModule],
    providers: [
      ViewTaskService,
      HttpClient,
      { provide: XHRBackend, useClass: MockBackend }
    ]
  }));

  it('should be create viewTaskService instance', () => {
    const service: ViewTaskService = TestBed.get(ViewTaskService);
    expect(service).toBeTruthy();
  });


  it('should be create task', () => {
    const service: ViewTaskService = TestBed.get(ViewTaskService);
    service.addTask(taskData).subscribe(
      res => {
        expect(Object.keys(res)).toContain('task_id');
        expect(res.task).toEqual(taskData.task);
        task_id = res.task_id;
      }
    )
  });


  it('should be get all tasks', () => {
    const service: ViewTaskService = TestBed.get(ViewTaskService);
    service.getTasks().subscribe(
      res => {
        expect(res.length).toBeGreaterThan(0);
      }
    )
  });


  it('should be delete task', () => {
    const service: ViewTaskService = TestBed.get(ViewTaskService);
    service.deleteTask(task_id).subscribe(
      res => {
        expect(res).toBeTruthy();
      }
    )
  });


});
