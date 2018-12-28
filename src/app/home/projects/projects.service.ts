import { Injectable } from "@angular/core";
import { Project } from "../../models/project";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable({
  providedIn: "root"
})
export class ProjectsService {
  baseUrl: "http://localhost:8081/api/";

  constructor(private httpClient: HttpClient) { }

  addProject(projectData: Project): Observable<any> {
    return this.httpClient.post(
      "http://localhost:8081/api/projects",
      projectData
    );
  }

  getProjects(): Observable<any> {
    return this.httpClient.get("http://localhost:8081/api/projects/list");
  }

  deleteProject(projectId): Observable<any> {
    return this.httpClient.delete(
      "http://localhost:8081/api/projects/" + projectId
    );
  }

  updateProject(project): Observable<any> {
    return this.httpClient.put(
      "http://localhost:8081/api/projects/" + project.projectId,
      project
    );
  }
}
