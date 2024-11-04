import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cours-resources-professeur',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cours-resources-professeur.component.html',
  styleUrl: './cours-resources-professeur.component.scss'
})
export class CoursResourcesProfesseurComponent implements OnInit {

  authProf = JSON.parse(localStorage.getItem(`${environment.appVersion}-${environment.USERDATA_KEY}`) ?? '{}').user;

  data: any = null;

  formationId: string | null = null;
  semestreId: string | null = null;
  moduleId: string | null = null;
  matiereId: string | null = null;
  coursId: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {

    this.formationId = this.route.snapshot.paramMap.get('formation');
    this.semestreId = this.route.snapshot.paramMap.get('semestre');
    this.moduleId = this.route.snapshot.paramMap.get('module');
    this.matiereId = this.route.snapshot.paramMap.get('matiere');
    this.coursId = this.route.snapshot.paramMap.get('cours');

    this.loadResources();

  }

  loadResources() {

    this.http.get<any>(`http://localhost:8081/api/cours/${this.coursId}/resources`)
        .subscribe(
        (response) => {
          
          this.data = response;
          
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error fetching cours:', error);
        }

      );

      this.cdr.detectChanges();

  }

  navigateToCours() {
    this.router.navigate(['/prof/formation', this.formationId, 'semestre', this.semestreId, 'module', this.moduleId, 'matiere', this.matiereId, 'cours', 'list']);
  }

  createLien() {
    this.router.navigate(['/prof/formation', this.formationId, 'semestre', this.semestreId, 'module', this.moduleId, 'matiere', this.matiereId, 'cours', this.coursId,  'lien', 'create']);
  }

  createDocument() {
    this.router.navigate(['/prof/formation', this.formationId, 'semestre', this.semestreId, 'module', this.moduleId, 'matiere', this.matiereId, 'cours', this.coursId,  'document', 'create']);
  }
  
  deleteLien(lienId: number) {

    const confirmed = window.confirm('Vous etes sure vous voulez supprimer ce lien ?');
  
    if (confirmed) {
      this.http.delete(`http://localhost:8081/api/lien/${lienId}/delete`)
        .subscribe({
          next: () => {
            console.log('Link deleted successfully');
            alert('Link deleted successfully!');
            this.loadResources();
          },
          error: (error) => {
            console.error('Error deleting Link:', error);
            alert('An error occurred while deleting the Link.');
          }
        });
    } else {
      console.log('Link deletion canceled');
    }

  }

  deleteDocument(documentId: number) {

    const confirmed = window.confirm('Vous etes sure vous voulez supprimer ce document ?');
  
    if (confirmed) {
      this.http.delete(`http://localhost:8081/api/document/${documentId}/delete`)
        .subscribe({
          next: () => {
            console.log('document deleted successfully');
            alert('document deleted successfully!');
            this.loadResources();
          },
          error: (error) => {
            console.error('Error deleting document:', error);
            alert('An error occurred while deleting the document.');
          }
        });
    } else {
      console.log('document deletion canceled');
    }

  }

}
