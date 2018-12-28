import { Injectable } from "@angular/core";
import { User } from "../../models/user";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  baseUrl: "http://localhost:8081/api/";

  constructor(private httpclient: HttpClient) { }

  AddUser(user: User): Observable<any> {
    return this.httpclient.post("http://localhost:8081/api/users", user);
  }

  getUsers(): Observable<any> {
    return this.httpclient.get("http://localhost:8081/api/users/list");
  }

  deleteUser(userId): Observable<any> {
    return this.httpclient.delete("http://localhost:8081/api/users/" + userId);
  }

  updateUser(userData): Observable<any> {
    return this.httpclient.put(
      "http://localhost:8081/api/users/" + userData.userId,
      userData
    );
  }
}
