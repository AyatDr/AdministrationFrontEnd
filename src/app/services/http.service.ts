import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {  
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  private api: string = 'http://127.0.0.1:8081';
  constructor(private http: HttpClient) { }

  setData(API_URL: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/api${API_URL}`, data, { headers: this.httpHeaders });
  }

  updateData(API_URL: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.api}/api${API_URL}`, data, { headers: this.httpHeaders });
  }

  getData(API_URL: string): Observable<any> {
    return this.http.get<any[]>(`${this.api}/api${API_URL}`, { headers: this.httpHeaders });
  }

  deleteData(API_URL: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/api${API_URL}`, { headers: this.httpHeaders });
  }
 





  



}