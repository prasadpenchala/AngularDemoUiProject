import { Component, ViewChild, OnInit, AfterViewInit } from "@angular/core";
import { UsersService } from "./users.service";

import { Router, ActivatedRoute } from "@angular/router";
import { User } from "../../models/user";

import * as R from "ramda";

import { NgForm } from "@angular/forms";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  @ViewChild("userForm") addUserForm: NgForm;
  item: User = {};
  usersList = [];
  usersListLoading = false;
  userData = [];
  search = {
    value: undefined
  };

  runningUserOperation = false;
  constructor(private usersService: UsersService, private _router: Router) {}

  reset(form?: NgForm) {
    this.item = {};
    form.reset();
  }

  ngOnInit() {
    this.usersListLoading = true;
    this.item = {};
    this.usersService.getUsers().subscribe(
      res => {
        this.usersList = res;
        this.userData = res;
        this.usersListLoading = false;
      },
      err => {
        this.usersListLoading = false;
      }
    );
  }

  addUser() {
    this.runningUserOperation = true;
    this.usersService.AddUser(this.item).subscribe(
      res => {
        this.runningUserOperation = false;
        this.ngOnInit();
      },
      err => {
        this.runningUserOperation = false;
      }
    );
  }

  updateUser() {
    this.runningUserOperation = true;
    this.usersService.updateUser(this.item).subscribe(
      res => {
        this.runningUserOperation = false;
        this.ngOnInit();
      },
      err => {
        this.runningUserOperation = false;
      }
    );
  }

  setUpdate(user) {
    this.item = Object.assign({}, user);
  }

  sortUserListByKey(key) {
    const byKey = R.ascend(R.prop(key));
    this.usersList = R.sort(byKey, this.usersList);
  }

  searchUserListByFirstName(value) {
    if (this.search.value && this.search.value.length) {
      this.usersList = R.map(obj => {
        if (obj.firstName.includes(this.search.value)) {
          return obj;
        }
      }, this.userData);
      this.usersList = R.reject(n => n === undefined, this.usersList);
    } else {
      this.usersList = this.userData;
    }
  }

  deleteUser(user) {
    this.usersService.deleteUser(user.userId).subscribe(res => {
      this.ngOnInit();
    });
  }
}
