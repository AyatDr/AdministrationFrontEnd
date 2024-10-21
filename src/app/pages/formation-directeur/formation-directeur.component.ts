import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formation-directeur',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './formation-directeur.component.html',
  styleUrls: ['./formation-directeur.component.scss'],
})
export class FormationDirecteurComponent implements OnInit {
  data: any[] = [];
  errorMessage: string = '';

  imageBasePath: string = 'assets/formation/';
  imageCount: number = 5;

  constructor(
    private http: HttpService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.http.getData('/formation/list').subscribe(
      (response) => {
        console.log('Données reçues du backend:', response);

        // On stocke l'objet entier (sans transformation partielle)
        this.data = response.map((item: any) => ({
          ...item, // Inclure toutes les propriétés de l'objet d'origine
          initial: this.getInitial(item.professeur.nom),
          image: this.getRandomImage(),
          backgroundColor: this.getRandomColor(),
        }));

        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);
        this.errorMessage = 'Erreur de récupération des données';
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

  // Fonction de redirection avec l'objet formation complet
  goToSemestersPage(formation: any): void {
    this.router.navigate(['apps/FormationSemestreDirecteur'], { state: { formation } });
  }
}
