import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthModel } from '../../models/auth.model';
import { UserModel } from '../../models/user.model';

const API_USERS_URL = 'http://127.0.0.1:8081';


@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://127.0.0.1:8081/api';

  login(email: string, password: string): Observable<AuthModel> {
    console.log('Making login request to:', `${this.apiUrl}/login`);
    return this.http.post<AuthModel>(`${this.apiUrl}/login`, { email, password }).pipe(
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  }




  getUserByToken(token: string): Observable<UserModel> { 
    console.log('Token being sent:', token);
    const httpHeaders = new HttpHeaders({
        Authorization: `Bearer ${token}`,
    });
    return this.http.get<UserModel>(`${this.apiUrl}/me`, { headers: httpHeaders }).pipe(
        catchError((error) => {
            console.error('Error fetching user data:', error);
            return throwError(error);
        })
    );
}

  
  

  // CREATE =>  POST: add a new user to the server
  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(API_USERS_URL, user);
  }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_USERS_URL}/forgot-password`, {
      email,
    });
  }

 
}
