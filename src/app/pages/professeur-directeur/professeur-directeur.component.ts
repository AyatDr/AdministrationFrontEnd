import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-professeur-directeur',
  templateUrl: './professeur-directeur.component.html',
  styleUrl: './professeur-directeur.component.scss'
})
export class ProfesseurDirecteurComponent {

  data: any[] = [];
  errorMessage: string = '';

  constructor( private authService: AuthService,
    private http: HttpService,
    private cdr: ChangeDetectorRef,
    
  ) {
    

  }


  ngOnInit(): void {
    this.loadData();
  }


 loadData(): void {
    
    this.http.getDataAuth('/professeur/list').subscribe(
      (response) => {
        console.log('Données reçues du backend:', response);

        // On stocke l'objet entier (sans transformation partielle)
        this.data = response

        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);
        this.errorMessage = 'Erreur de récupération des données';
      }
    );
  }

   // Fonction pour générer une couleur aléatoire
   getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  onEdit(etudiant: any): void {
    console.log('Modifier étudiant:', etudiant);
    // Implémente ici la logique de modification
  }
  
  onDelete(etudiant: any): void {
    console.log('Supprimer étudiant:', etudiant);
    // Implémente ici la logique de suppression (par exemple, afficher un SweetAlert)
  }

   
}
