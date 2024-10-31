import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-cours-etudiant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cours-etudiant.component.html',
  styleUrl: './cours-etudiant.component.scss'
})
export class CoursEtudiantComponent {

  matiere: any;
  cours: any[] = [];

  hoveredDelete = false;
  hoveredEdit = false;
  data: any[] = [];
  errorMessage: string = '';
  semestre: any;
  formation: any;
  module: any;

  constructor(private route: ActivatedRoute, private router: Router,private http: HttpService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('Initialisation du composant ModuleFormationDirecteurComponent');
    
    // Récupération de la matière depuis l'état de navigation
    this.matiere = history.state.matiere;
    console.log('Matière reçue : ', this.matiere);
  
    if (!this.matiere) {
      console.log('Redirection vers la page d\'accueil');
      this.router.navigate(['/']);
    } else {
      console.log('Cours de la matière : ', this.matiere.cours);
      this.cours = this.matiere.cours || []; // Initialise les cours de la matière
      //this.loadData(); // Charger les données depuis le backend
    }
  }
  
  // loadData(): void {
  //   this.http.getDataAuth('/directeur/formation/list').subscribe(
  //     (response) => {
  //       console.log('Données reçues du backend :', response);
  
  //       // Assurez-vous que `response` est un objet contenant des formations
  //       const formations = response || [];
  //       console.log('Formations extraites :', formations);
  
  //       if (formations.length === 0) {
  //         console.error('Aucune formation trouvée');
  //         this.errorMessage = 'Aucune formation disponible';
  //         return;
  //       }
  
  //       // ID de la matière reçu via history.state
  //       const matiereId = this.matiere?.id;
  //       console.log('ID de la matière : ', matiereId);
  
  //       if (!matiereId) {
  //         console.error('ID de la matière non défini');
  //         this.errorMessage = 'ID de la matière manquant';
  //         return;
  //       }
  
  //       // Rechercher la matière dans formations -> semestres -> modules -> matières
  //       let foundMatiere: any = null;
  
  //       for (const formation of formations) {
  //         for (const semestre of formation.semestres) {
  //           for (const module of semestre.modules) {
  //             foundMatiere = module.matieres.find((m: any) => m.id === matiereId);
  //             if (foundMatiere) {
  //               // Mettre à jour la formation, semestre et module correspondants si trouvés
  //               this.formation = formation;
  //               this.semestre = semestre;
  //               this.module = module;
  //               break;
  //             }
  //           }
  //           if (foundMatiere) break;
  //         }
  //         if (foundMatiere) break;
  //       }
  
  //       if (!foundMatiere) {
  //         console.error('Matière non trouvée avec l\'ID : ', matiereId);
  //         this.errorMessage = 'Matière introuvable';
  //         return;
  //       }
  
  //       // Mettre à jour la matière et ses cours
  //       this.matiere = foundMatiere;
  //       this.cours = this.matiere.cours || [];
  //       console.log('Matière et cours mis à jour : ', this.matiere);
  
  //       // Mettre à jour la vue avec ChangeDetectorRef
  //       this.cdr.detectChanges();
  //     },
  //     (error) => {
  //       console.error('Erreur lors de la récupération des données :', error);
  //       this.errorMessage = 'Erreur de récupération des données';
  //     }
  //   );
  // }
  
  


  getRandomColor(): string {
    const colors = ['#FF5733', '#007BFF', '#0056D2', '#003C9E', '#001F6C'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
  goToCoursDetailsPage(cour: any): void {
    console.log('module envoyé : ', cour);
    this.router.navigate(['apps/DocumentsEtudiant'], { state: { cour } });
  }

 


 

   



    
    
    
    
    
    
  
    
    
    



















}
