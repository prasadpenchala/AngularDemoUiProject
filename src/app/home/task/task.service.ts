import { Injectable } from "@angular/core";
import { Task } from "../../models/task";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable({
  providedIn: "root"
})
export class TaskService {
  baseUrl: "http://localhost:8081/api/";

  constructor(private httpClient: HttpClient) { }

  addTask(taskData: Task): Observable<any> {
    return this.httpClient.post("http://localhost:8081/api/add/task", taskData);
  }

  updateTask(taskData: Task): Observable<any> {
    return this.httpClient.put("http://localhost:8081/api/task/" + taskData.task_id, taskData);
  }

  getTasks(): Observable<any> {
    return this.httpClient.get("http://localhost:8081/api/tasks/list");
  }

  addParentTask(taskData): Observable<any> {
    return this.httpClient.post("http://localhost:8081/api/parent/task", taskData);
  }

  getParentTaskList(): Observable<any> {
    return this.httpClient.get("http://localhost:8081/api/parent/tasks/list");
  }

}
