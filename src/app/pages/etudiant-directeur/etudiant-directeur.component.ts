import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-etudiant-directeur',
  templateUrl: './etudiant-directeur.component.html',
  styleUrl: './etudiant-directeur.component.scss'
})
export class EtudiantDirecteurComponent {

  etudiants: any[] = [];
  formations: any[] = [];
  errorMessage: string = '';

  constructor( private authService: AuthService,
    private http: HttpService,
    private cdr: ChangeDetectorRef,
    
  ) {
    

  }


  ngOnInit(): void {
    this.loadDataWithFormations();
   
  }


  loadDataWithFormations(): void {
    // Charger les étudiants
    this.http.getDataAuth('/etudiant/list').subscribe(
      (etudiantsResponse) => {
        console.log('Étudiants reçus du backend:', etudiantsResponse);
        this.etudiants = etudiantsResponse;
  
        // Charger les formations après avoir récupéré les étudiants
        this.http.getDataAuth('/formation/list').subscribe(
          (formationsResponse) => {
            console.log('Formations reçues du backend:', formationsResponse);
            this.formations = formationsResponse;
  
            // Associer les étudiants à leurs formations
            this.etudiants.forEach((etudiant) => {
              const formationTrouvee = this.formations.find((formation) =>
                formation.etudiants.some(
                  (etudiantFormation: any) => etudiantFormation.id === etudiant.id
                )
              );
              etudiant.formation = formationTrouvee ? formationTrouvee : null;
            });
  
            // Associer les semestres à chaque étudiant
            this.etudiants.forEach((etudiant) => {
              const semestreTrouve = this.formations
              .reduce((acc: any[], formation) => acc.concat(formation.semestres), [])
              .find((semestre: any) =>
                semestre.etudiants.some(
                  (etudiantSemestre: any) => etudiantSemestre.id === etudiant.id
                )
              );
              etudiant.semestre = semestreTrouve ? semestreTrouve : null;
            });
  
            console.log('Étudiants avec leurs formations et leurs semestres associées:', this.etudiants);
            this.cdr.detectChanges();
          },
          (error) => {
            console.error('Erreur lors de la récupération des formations:', error);
            this.errorMessage = 'Erreur de récupération des formations';
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la récupération des étudiants:', error);
        this.errorMessage = 'Erreur de récupération des étudiants';
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
