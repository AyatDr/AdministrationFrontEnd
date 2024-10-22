import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-formation-professeur',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './formation-professeur.component.html',
  styleUrl: './formation-professeur.component.scss'
})
export class FormationProfesseurComponent implements OnInit {

  authProf = JSON.parse(localStorage.getItem(`${environment.appVersion}-${environment.USERDATA_KEY}`) ?? '{}').user;

  formations: any[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }
  
  ngOnInit(): void {

    this.http.get<any[]>(`http://localhost:8081/api/prof/formations/${this.authProf.id}/list`)
      .subscribe(
        (response) => {
          this.formations = response;
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error fetching formations:', error);
        }
      );
  }

}
