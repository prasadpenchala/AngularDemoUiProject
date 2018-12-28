import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material/material.module";
import { UsersComponent } from "./users/users.component";
import { HomeComponent } from "./home.component";

import { FormsModule } from "@angular/forms";
import { HomeRoutingModule } from "./home-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ProjectsComponent } from './projects/projects.component';
import { TaskComponent } from './task/task.component';
import { ViewTaskComponent } from './view-task/view-task.component';

@NgModule({
  declarations: [UsersComponent, HomeComponent, ProjectsComponent, TaskComponent, ViewTaskComponent],
  imports: [
    CommonModule,
    MaterialModule,
    HomeRoutingModule,
    FormsModule,
    FlexLayoutModule
  ]
})
export class HomeModule {}
