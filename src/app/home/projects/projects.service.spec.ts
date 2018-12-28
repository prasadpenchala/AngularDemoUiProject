import { TestBed } from '@angular/core/testing';

import { ProjectsService } from './projects.service';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MockBackend } from '@angular/http/testing';


let endDate = new Date();
endDate.setDate(endDate.getDate() + 1);

let projectData = {
  project: 'asd',
  startDate: new Date(),
  "endDate": endDate,
  priority: 10
}

let projectId;


describe('ProjectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpModule, HttpClientModule, HttpClientTestingModule],
    providers: [
      HttpClientModule,
      HttpClientTestingModule,
      ProjectsService,
      HttpClient,
      { provide: XHRBackend, useClass: MockBackend }
    ]
  }));

  it('should be create projectService instance', () => {
    const service: ProjectsService = TestBed.get(ProjectsService);
    expect(service).toBeTruthy();
  });


  it('should be create project', () => {
    const service: ProjectsService = TestBed.get(ProjectsService);
    service.addProject(projectData).subscribe(
      res => {
        expect(Object.keys(res)).toContain('projectId');
        expect(res.project).toEqual(projectData.project);
        projectId = res.projectId;
      }
    )
  });

  it('should be get all projects', () => {
    const service: ProjectsService = TestBed.get(ProjectsService);
    service.getProjects().subscribe(
      res => {
        expect(res.length).toBeGreaterThan(0);
      }
    )
  });
  it('should be update project', () => {
    const service: ProjectsService = TestBed.get(ProjectsService);
    let updateProjectData = Object.assign({ projectId: projectId }, projectData);
    updateProjectData.project = 'mnb';
    service.updateProject(updateProjectData).subscribe(
      res => {
        expect(Object.keys(res)).toContain('projectId');
        expect(res.projectId).toEqual(projectId);
        expect(res.project).toEqual(updateProjectData.project);
      }
    )
  });

  it('should be delete project', () => {
    const service: ProjectsService = TestBed.get(ProjectsService);
    service.deleteProject(projectId).subscribe(
      res => {
        expect(res).toBeTruthy();
      }
    )
  });


});
