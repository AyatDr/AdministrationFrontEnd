import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {


  private url = 'http://127.0.0.1:3000';


  constructor(private http: HttpClient) { }

  afficherUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/employes/list`);
  }
 

}