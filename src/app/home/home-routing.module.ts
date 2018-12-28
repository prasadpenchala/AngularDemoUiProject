import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsersComponent } from "./users/users.component";
import { HomeComponent } from "./home.component";
import { ProjectsComponent } from "./projects/projects.component";
import { TaskComponent } from "./task/task.component";
import { ViewTaskComponent } from "./view-task/view-task.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path:'',
        redirectTo: "view-task",
        pathMatch: "full",
      },
      {
        path: "users",
        component: UsersComponent
      },
      {
        path: "projects",
        component: ProjectsComponent
      },
      {
        path: "task",
        component: TaskComponent
      },
      {
        path: "view-task",
        component: ViewTaskComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
