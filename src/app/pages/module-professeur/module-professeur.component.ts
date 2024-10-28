import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-module-professeur',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './module-professeur.component.html',
  styleUrl: './module-professeur.component.scss'
})
export class ModuleProfesseurComponent implements OnInit{

  authProf = JSON.parse(localStorage.getItem(`${environment.appVersion}-${environment.USERDATA_KEY}`) ?? '{}').user;

  data: any[] = [];

  errorMessage: string = '';

  imageBasePath: string = 'assets/formation/';

  imageCount: number = 5;

  formationId: string | null = null;
  semestreId: string | null = null;
  semestreLabel: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    
    this.formationId = this.route.snapshot.paramMap.get('formation');
    this.semestreId = this.route.snapshot.paramMap.get('semestre');

    this.http.get<any>(`http://localhost:8081/api/prof/semestre/${this.semestreId}/modules/list`)
      .subscribe(
        (response) => {

          console.log(response);
          
          this.semestreLabel = response.label;

          this.data = response.modules.map((item: any) => ({
            id: item.id,
            label: item.label,
            dateDebut: item.dateDebut,
            dateFin: item.dateFin,
            initial: this.getInitial( this.authProf.nom ),
            image: this.getRandomImage(),
            backgroundColor: this.getRandomColor(),
          }));
          
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error fetching modules:', error);
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

  navigateToSemestres() {
    this.router.navigate(['/prof/formation', this.formationId, 'semestres', 'list']);
  }

  navigateToMatieres(module: number) {
    this.router.navigate(['/prof/formation', this.formationId, 'semestre', this.semestreId, 'module', module, 'matieres', 'list']);
  }

}
