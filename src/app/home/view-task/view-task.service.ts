import { Injectable } from "@angular/core";
import { Task } from "../../models/task";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable({
  providedIn: "root"
})
export class ViewTaskService {
  baseUrl: "http://localhost:8081/api/";

  constructor(private httpClient: HttpClient) {}

  getTasks(): Observable<any> {
    return this.httpClient.get("http://localhost:8081/api/tasks/list");
  }

  deleteTask(taskId): Observable<any> {
    return this.httpClient.delete(
      "http://localhost:8081/api/task/" + taskId
    );
  }

  
  addTask(taskData: Task): Observable<any> {
    return this.httpClient.post("http://localhost:8081/api/add/task", taskData);
  }

}
