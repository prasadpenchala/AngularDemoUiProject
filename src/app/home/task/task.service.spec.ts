import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';


import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MockBackend } from '@angular/http/testing';

let endDate =  new Date();
endDate.setDate(endDate.getDate()+1);

let taskData = {
  task: 'asd',
  priority: 10,
  startDate: new Date(),
  "endDate": endDate,
  project: null,
  parentId: null
}

let parentTaskData = {
  parentTask: 'parentTask1'
}

let task_id;

describe('TaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpModule, HttpClientModule],
    providers: [
      HttpModule,
      HttpClientModule,
      HttpClient,
      TaskService,
      { provide: XHRBackend, useClass: MockBackend }
    ]
  }));

  it('should be created taskService instance', () => {
    const service: TaskService = TestBed.get(TaskService);
    expect(service).toBeTruthy();
  });


  it('should be create task', () => {
    const service: TaskService = TestBed.get(TaskService);
    service.addTask(taskData).subscribe(
      res => {
        expect(Object.keys(res)).toContain('task_id');
        expect(res.task).toEqual(taskData.task);
        task_id = res.task_id;
      }
    )
  });



  it('should be get all tasks', () => {
    const service: TaskService = TestBed.get(TaskService);
    service.getTasks().subscribe(
      res => {
        expect(res.length).toBeGreaterThan(0);
      }
    )
  });

  it('should be update task', () => {
    const service: TaskService = TestBed.get(TaskService);
    let updateTaskData = Object.assign({ task_id: task_id }, taskData);
    updateTaskData.task = 'xyz';
    service.updateTask(updateTaskData).subscribe(
      res => {
        expect(Object.keys(res)).toContain('task_id');
        expect(res.task_id).toEqual(task_id);
        expect(res.task).toEqual(updateTaskData.task);
      }
    )
  });

  it('should be create parent task', () => {
    const service: TaskService = TestBed.get(TaskService);
    service.addParentTask(parentTaskData).subscribe(
      res => {
        expect(Object.keys(res)).toContain('parentId');
        expect(res.parentTask).toEqual(parentTaskData.parentTask);
      }
    )
  });

  it('should be get all parentTasks', () => {
    const service: TaskService = TestBed.get(TaskService);
    service.getParentTaskList().subscribe(
      res => {
        expect(res.length).toBeGreaterThan(0);
      }
    )
  });
});
