import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private url = 'http://127.0.0.1:3000';


  constructor(private http: HttpClient) { }

  afficherUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/users/list`);
  }



  afficherFournisseur(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/fournisseurs/list`);
  }


  

    // Récupère le jeton CSRF
    getCsrfToken(): Observable<any> {
      return this.http.get(`${this.url}/sanctum/csrf-cookie`);
    }
  
    // Ajoute un utilisateur en incluant le jeton CSRF
    addUser(userData: any): Observable<any> {
      return this.getCsrfToken().pipe(
        switchMap(() => {
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': this.getCSRFToken()
          });
          return this.http.post(`${this.url}/users/ajout`, userData, { headers });
        })
      );
    }
  
    // Méthode pour récupérer le jeton CSRF à partir des méta-données
    private getCSRFToken(): string {
      const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
      return csrfTokenMeta?.getAttribute('content') || '';
    }
  



}



