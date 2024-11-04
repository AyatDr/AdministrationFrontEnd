import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cours-professeur',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cours-professeur.component.html',
  styleUrl: './cours-professeur.component.scss'
})
export class CoursProfesseurComponent implements OnInit {

  authProf = JSON.parse(localStorage.getItem(`${environment.appVersion}-${environment.USERDATA_KEY}`) ?? '{}').user;

  data: any[] = [];

  errorMessage: string = '';

  imageBasePath: string = 'assets/formation/';

  imageCount: number = 5;

  formationId: string | null = null;
  semestreId: string | null = null;
  moduleId: string | null = null;
  matiereId: string | null = null;
  matiereLabel: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    
    this.formationId = this.route.snapshot.paramMap.get('formation');
    this.semestreId = this.route.snapshot.paramMap.get('semestre');
    this.moduleId = this.route.snapshot.paramMap.get('module');
    this.matiereId = this.route.snapshot.paramMap.get('matiere');

    this.loadCourses();
  }

  loadCourses() {

    this.http.get<any>(`http://localhost:8081/api/prof/matiere/${this.matiereId}/cours/list`)
        .subscribe(
        (response) => {
          
          this.matiereLabel = response.label;

          this.data = response.cours.map((item: any) => ({
            id: item.id,
            label: item.label,
            initial: this.getInitial( this.authProf.nom ),
            image: this.getRandomImage(),
            backgroundColor: this.getRandomColor(),
          }));
          
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error fetching cours:', error);
        }

      );

      this.cdr.detectChanges();

  }

  getInitial(name: string): string {
    return name ? name.charAt(0).toUpperCase() : '?';
  }

  getRandomImage(): string {
    const randomIndex = Math.floor(Math.random() * this.imageCount) + 1;
    return `${this.imageBasePath}img${randomIndex}.jpg`;
  }

  getRandomColor(): string {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFC300', '#DAF7A6'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  navigateToMatieres() {
    this.router.navigate(['/prof/formation', this.formationId, 'semestre', this.semestreId, 'module', this.moduleId, 'matieres', 'list']);
  }

  navigateToResources(cours: number) {
    this.router.navigate(['/prof/formation', this.formationId, 'semestre', this.semestreId, 'module', this.moduleId, 'matiere', this.matiereId, 'cours', cours,  'resources', 'list']);
  }

  navigateToCours(matiere: number) {
    this.router.navigate(['/prof/formation', this.formationId, 'semestre', this.semestreId, 'module', this.moduleId, 'matiere', matiere, 'cours', 'list']);
  }

  createCours() {
    this.router.navigate(['/prof/formation', this.formationId, 'semestre', this.semestreId, 'module', this.moduleId, 'matiere', this.matiereId, 'cours', 'create']);
  }

  editCours(cours: number) {
    this.router.navigate(['/prof/formation', this.formationId, 'semestre', this.semestreId, 'module', this.moduleId, 'matiere', this.matiereId, 'cours', cours,  'edit']);
  }

  deleteCours(coursId: number): void {

    const confirmed = window.confirm('Vous etes sure vous voulez supprimer ce cours ?');
  
    if (confirmed) {
      this.http.delete(`http://localhost:8081/api/cours/${coursId}/delete`)
        .subscribe({
          next: () => {
            console.log('Course deleted successfully');
            alert('Course deleted successfully!');
            this.loadCourses();
          },
          error: (error) => {
            console.error('Error deleting course:', error);
            alert('An error occurred while deleting the course.');
          }
        });
    } else {
      console.log('Course deletion canceled');
    }
  }
  

}
