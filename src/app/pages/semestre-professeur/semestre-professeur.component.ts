import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-semestre-professeur',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './semestre-professeur.component.html',
  styleUrl: './semestre-professeur.component.scss'
})
export class SemestreProfesseurComponent implements OnInit{

  authProf = JSON.parse(localStorage.getItem(`${environment.appVersion}-${environment.USERDATA_KEY}`) ?? '{}').user;

  data: any[] = [];

  errorMessage: string = '';

  imageBasePath: string = 'assets/formation/';

  imageCount: number = 5;

  formationId: string | null = null;
  formationLabel: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    
    this.formationId = this.route.snapshot.paramMap.get('id');
    
    this.http.get<any>(`http://localhost:8081/api/prof/formation/${this.formationId}/semestres/list`)
      .subscribe(
        (response) => {

          this.formationLabel = response.label;

          this.data = response.semestres.map((item: any) => ({
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
          console.error('Error fetching semestres:', error);
        }
      );
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

  navigateToFormations() {
    this.router.navigate(['/prof/formations/list']);
  }

  navigateToModules(semestre: number) {
    this.router.navigate(['/prof/formation', this.formationId, 'semestre', semestre, 'modules', 'list']);
  }

}
