import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {  
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  private api: string = 'http://127.0.0.1:8081';
    //Token variables
    auth:any;
    token:any;
    httpHeadersAuth:any;

  constructor(private authService: AuthService,private http: HttpClient) {
    this.auth = this.authService.getAuthFromLocalStorage();
    this.token=this.auth.authToken;
    console.log("Token:" +   this.token)
    console.log('Token being sent:', this.token);
     this.httpHeadersAuth = new HttpHeaders({
         'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
    });
   }

  setData(API_URL: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/api${API_URL}`, data, { headers: this.httpHeadersAuth });
  }

  updateData(API_URL: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.api}/api${API_URL}`, data, { headers: this.httpHeadersAuth });
  }

  getData(API_URL: string): Observable<any> {
    return this.http.get<any[]>(`${this.api}/api${API_URL}`, { headers: this.httpHeaders });
  }

  getDataAuth(API_URL: string): Observable<any> {
    return this.http.get<any[]>(`${this.api}/api${API_URL}`, { headers: this.httpHeadersAuth });
  }

  deleteData(API_URL: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/api${API_URL}`, { headers: this.httpHeadersAuth });
  }
 





  



}