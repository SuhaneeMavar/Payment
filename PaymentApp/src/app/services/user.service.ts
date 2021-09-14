import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { BASE_URL } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserByEmail(email: String): Observable<User> {
    return this.http.get<User>(`${BASE_URL}users/search?email=${email}`).pipe(retry(3))
  }

  getUserById(id: String): Observable<User> {
    return this.http.get<User>(`${BASE_URL}users/${id}`).pipe(retry(3))
  }

  registerUser(user: User): Observable<User> {
    let header = {
      "headers": new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    return this.http.post<User>(`${BASE_URL}users`, JSON.stringify(user), header).pipe(retry(3))
  }

  getAuthenticatedUser(): Observable<User> {
    return this.http.get<User>(`${BASE_URL}auth/authenticate`).pipe(retry(3))
  }

}
