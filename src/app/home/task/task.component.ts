import { Component, ViewChild, OnInit, AfterViewInit } from "@angular/core";

import { TaskService } from "./task.service";
import { ProjectsService } from "../projects/projects.service";
import { UsersService } from "../users/users.service";

import { Task } from "../../models/task";

import { NgForm } from "@angular/forms";

import { Router, ActivatedRoute } from "@angular/router";

import * as R from "ramda";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"]
})
export class TaskComponent implements OnInit, AfterViewInit {
  @ViewChild("taskForm") addTaskForm: NgForm;
  item: Task = {};
  user = {};
  usersList = [];
  projectsList = [];
  checked = false;
  parentTaskList = [];

  startDateDefaultMin = new Date();
  endDateDefaultMin = new Date();

  runningTaskOperation = false;

  task_id;

  addTaskLoading = false;

  constructor(
    private taskService: TaskService,
    private projectsService: ProjectsService,
    private usersService: UsersService,
    private _router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  setDataWhileParentTask(checked) {
    if (checked && !this.item.task_id) {
      this.item.startDate = new Date();
      let date = new Date();
      date.setDate(date.getDate() + 1);
      this.item.endDate = date;
    } else if (!checked && !this.item.task_id) {
      this.item.startDate = undefined;
      this.item.endDate = undefined;
      this.item.priority = 0;
    }
  }

  reset(form?: NgForm) {
    this.item = {};
    this.checked = false;
    this.setDataWhileParentTask(false);
    form.reset();
    // this.addProjectForm.reset();
  }

  ngAfterViewInit() {
    var a = this.addTaskForm;
    this.task_id = this.activatedRoute.snapshot.queryParams.task_id;
    let listData;
    this.addTaskLoading = false;
    if (this.task_id) {
      listData = this.taskService.getTasks().subscribe(listData => {
        listData.map(data => {
          if (this.task_id == data.task_id) {
            this.item = data;
            this.item.project = data.project
              ? data.project.projectId
              : undefined;
            this.item.parentId = data.parentId
              ? data.parentId.parentId
              : undefined;
            this.item.user= data.user
              ? data.user.userId
              : undefined;

            if (this.addTaskForm.controls["project"] && this.item.project) {
              this.addTaskForm.controls["project"].setValue(this.item.project);
            }
            if (this.addTaskForm.controls["parentId"] && this.item.parentId) {
              this.addTaskForm.controls["parentId"].setValue(
                this.item.parentId
              );
            }
            if (this.addTaskForm.controls["user"] && this.item.user) {
              this.addTaskForm.controls["user"].setValue(
                this.item.user
              );
            }
            this.item.startDate = this.item.startDate
              ? new Date(this.item.startDate)
              : undefined;
            this.item.endDate = this.item.endDate
              ? new Date(this.item.endDate)
              : undefined;

            this.addTaskLoading = false;
          }
        });
      });
    } else {
      this.addTaskLoading = false;
    }
  }

  async ngOnInit() {
    this.item = {};
    this.checked = false;
    this.addTaskLoading = false;
    this.setDataWhileParentTask(true);
    var a = this.addTaskForm;

    this.usersList = await this.usersService.getUsers().toPromise();
    this.projectsList = await this.projectsService.getProjects().toPromise();
    this.parentTaskList = await this.taskService
      .getParentTaskList()
      .toPromise();
  }

  addTask() {
    this.runningTaskOperation = true;
    if (this.checked) {
      let parentTask = Object.assign(
        { parentTask: this.item.task },
        this.item.task
      );
      this.taskService.addParentTask(parentTask).subscribe(
        res => {
          this.runningTaskOperation = false;
          this.ngOnInit();
        },
        err => {
          this.runningTaskOperation = false;
        }
      );
    } else {
      let task = Object.assign({}, this.item);
      task.status = "progress";
      if (this.item.project) {
        task.project = R.find(R.propEq("projectId", this.item.project))(
          this.projectsList
        );
      }
      if (this.item.parentId) {
        task.parentId = R.find(R.propEq("parentId", this.item.parentId))(
          this.parentTaskList
        );
      }

      if (this.item.user) {
        task.user = R.find(R.propEq("userId", this.item.user))(
          this.usersList
        );
      }

      this.taskService.addTask(task).subscribe(
        res => {
          this.runningTaskOperation = false;
          this._router.navigateByUrl("/home/view-task");
        },
        err => {
          this.runningTaskOperation = false;
        }
      );
    }
  }

  updateTask() {
    let task = Object.assign({}, this.item);
    if (this.item.project) {
      task.project = R.find(R.propEq("projectId", this.item.project))(
        this.projectsList
      );
    }
    if (this.item.parentId) {
      task.parentId = R.find(R.propEq("parentId", this.item.parentId))(
        this.parentTaskList
      );
    }
    if (this.item.user) {
      task.user = R.find(R.propEq("userId", this.item.user))(
        this.usersList
      );
    }

    this.taskService.updateTask(task).subscribe(res => {
      this._router.navigateByUrl("/home/view-task");
    });
  }

  startDateChange() {
    if (this.item.endDate < this.item.startDate) {
      this.item.endDate = undefined;
    }
    this.endDateDefaultMin = this.item.startDate;
  }
}
