import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';


import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MockBackend } from '@angular/http/testing';

let userData = {
  firstName: 'abc',
  lastName: 'xyz',
  employeeId: 123
}

let userId;

describe('UsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpModule, HttpClientModule],
    providers: [
      HttpModule,
      HttpClientModule,
      HttpClient,
      UsersService,
      { provide: XHRBackend, useClass: MockBackend }
    ]
  }));

  it('should be create userService instance', () => {
    const service: UsersService = TestBed.get(UsersService);
    expect(service).toBeTruthy();
  });

  it('should be create user', () => {
    const service: UsersService = TestBed.get(UsersService);
    service.AddUser(userData).subscribe(
      res => {
        expect(Object.keys(res)).toContain('userId');
        expect(res.firstName).toEqual(userData.firstName);
        expect(res.lastName).toEqual(userData.lastName);
        expect(res.employeeId).toEqual(userData.employeeId);
        userId = res.userId;
      }
    )
  });

  it('should be get all users', () => {
    const service: UsersService = TestBed.get(UsersService);
    service.getUsers().subscribe(
      res => {
        expect(res.length).toBeGreaterThan(0);
      }
    )
  });

  it('should be update user', () => {
    const service: UsersService = TestBed.get(UsersService);
    let updateUserData = Object.assign({ userId: userId }, userData);
    updateUserData.firstName = 'cdf';
    service.updateUser(updateUserData).subscribe(
      res => {
        expect(Object.keys(res)).toContain('userId');
        expect(res.userId).toEqual(userId);
        expect(res.firstName).toEqual(updateUserData.firstName);
      }
    )
  });
  it('should be delete user', () => {
    const service: UsersService = TestBed.get(UsersService);
    service.deleteUser(userId).subscribe(
      res => {
        expect(res).toBeTruthy;
      }
    )
  });

});
