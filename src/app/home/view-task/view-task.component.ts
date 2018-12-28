import { Component, OnInit } from "@angular/core";
import { ViewTaskService } from "./view-task.service";

import { Router, ActivatedRoute } from "@angular/router";

import * as R from "ramda";

@Component({
  selector: "app-view-task",
  templateUrl: "./view-task.component.html",
  styleUrls: ["./view-task.component.css"]
})
export class ViewTaskComponent implements OnInit {
  tasksList = [];
  tasksListData = [];
  taskListLoadig = false;

  search = {
    value: undefined
  };

  constructor(
    private viewTaskService: ViewTaskService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.taskListLoadig = true;
    this.viewTaskService.getTasks().subscribe(
      res => {
        this.tasksList = res;
        this.tasksListData = res;
        this.taskListLoadig = true;
      },
      err => {
        this.taskListLoadig = true;
      }
    );
  }

  searchTaskListByTask(value) {
    if (this.search.value && this.search.value.length) {
      this.tasksList = R.map(obj => {
        if (obj.task.includes(this.search.value)) {
          return obj;
        }
      }, this.tasksListData);
      this.tasksList = R.reject(n => n === undefined, this.tasksList);
    } else {
      this.tasksList = this.tasksListData;
    }
  }

  sortTasksListByKey(key) {
    if (key !== "completed") {
      if (this.search.value) {
        this.searchTaskListByTask(this.search.value);
      }
      const byKey = R.ascend(R.prop(key));
      this.tasksList = R.sort(
        byKey,
        this.search.value ? this.tasksList : this.tasksListData
      );
    } else {
      this.tasksList = R.map(
        obj => {
          if (obj.status === key) {
            return obj;
          }
        },
        this.search.value ? this.tasksList : this.tasksListData
      );
      this.tasksList = R.reject(n => n === undefined, this.tasksList);
    }
  }

  deleteTask(task) {
    this.viewTaskService.deleteTask(task.task_id).subscribe(res => {
      this.ngOnInit();
    });
  }

  redirectToTaskEdit(task) {
    this._router.navigateByUrl("/home/task?task_id=" + task.task_id);
  }
}
