import { Component, ViewChild, OnInit } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";
import { Project } from "../../models/project";

import { ProjectsService } from "./projects.service";
import { UsersService } from "../users/users.service";

import { NgForm } from "@angular/forms";

import * as R from "ramda";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"]
})
export class ProjectsComponent implements OnInit {
  @ViewChild("projectForm") addProjectForm: NgForm;
  item: Project = {};
  projectsList = [];
  projectsListLoading = false;
  checked = false;
  projectsData = [];
  startDateDefaultMin = new Date();
  endDateDefaultMin = new Date();
  usersList = [];

  runningProjectOperation = false;

  search = {
    value: undefined
  };

  constructor(
    private projectsService: ProjectsService,
    private usersService: UsersService
  ) {}

  setStartDateEndDate(checked) {
    if (!checked) {
      this.item.startDate = new Date();
      let date = new Date();
      date.setDate(date.getDate() + 1);
      this.item.endDate = date;
    } else {
      this.item.startDate = undefined;
      this.item.endDate = undefined;
    }
  }

  reset(form?: NgForm) {
    this.item = {};
    this.checked = false;
    this.setStartDateEndDate(true);
    form.reset();
  }

  ngOnInit() {
    this.item = {};
    this.checked = false;
    this.setStartDateEndDate(true);
    // this.endDateDefaultMin.setDate(this.startDateDefaultMin.getDate() + 1);
    this.usersService.getUsers().subscribe(res => {
      this.usersList = res;
    });
    this.projectsListLoading = true;
    this.projectsService.getProjects().subscribe(
      res => {
        this.projectsList = res;
        this.projectsData = res;
        this.projectsListLoading = false;
      },
      err => {
        this.projectsListLoading = false;
      }
    );
  }

  setUpdate(project) {
    this.item = Object.assign({}, project);
    this.item.manager = project.manager ? project.manager.userId : undefined;
    if (this.item.startDate || this.item.endDate) {
      this.checked = true;
      this.item.startDate = this.item.startDate
        ? new Date(this.item.startDate)
        : undefined;
      this.item.endDate = this.item.endDate
        ? new Date(this.item.endDate)
        : undefined;
    }
  }

  sortProjectListByKey(key) {
    if (key !== "completed") {
      const byKey = R.ascend(R.prop(key));
      this.projectsList = R.sort(byKey, this.projectsList);
    } else {
    }
  }

  addProject() {
    this.runningProjectOperation = true;
    let project = Object.assign({}, this.item);
    if (this.item.manager) {
      project.manager = R.find(R.propEq("userId", this.item.manager))(
        this.usersList
      );
    }
    this.projectsService.addProject(project).subscribe(
      res => {
        this.runningProjectOperation = false;
        this.ngOnInit();
      },
      err => {
        this.runningProjectOperation = false;
      }
    );
  }

  updateProject() {
    this.runningProjectOperation = true;
    this.projectsService.updateProject(this.item).subscribe(
      res => {
        this.runningProjectOperation = false;
        this.ngOnInit();
      },
      err => {
        this.runningProjectOperation = false;
      }
    );
  }

  deleteProject(projectData) {
    this.projectsService.deleteProject(projectData.projectId).subscribe(res => {
      this.ngOnInit();
    });
  }

  searchProjectListByProject(value) {
    if (this.search.value && this.search.value.length) {
      this.projectsList = R.map(obj => {
        if (obj.project.includes(this.search.value)) {
          return obj;
        }
      }, this.projectsData);
      this.projectsList = R.reject(n => n === undefined, this.projectsList);
    } else {
      this.projectsList = this.projectsData;
    }
  }

  startDateChange() {
    if (this.item.endDate < this.item.startDate) {
      this.item.endDate = undefined;
    }
    this.endDateDefaultMin = this.item.startDate;
  }
}
