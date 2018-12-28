// export class Task {
//     taskId?: string;
//     parentId?: string;
//     task?: string;
//     priority?: number;
//     startDate?: string;
//     endDate?: string;
//     status?: string;
//     parentTask?: string;
//     project?: string;
//     user?: string;
// }
class ParentId {
  parentId?: Number;
  parentTask?: String;
}
class Project {
  projectId?: Number;
  project?: String;
  startDate?: Date;
  endDate?: Date;
  priority?: Number;
}
export class Task {
  task_id?: string;
  parentId?: Number;
  project?: Number;
  task?: string;
  priority?: number;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  parentTask?: string;
  user?: Number;
}


