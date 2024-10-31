import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-matiere-etudiant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matiere-etudiant.component.html',
  styleUrl: './matiere-etudiant.component.scss'
})
export class MatiereEtudiantComponent {


  module: any;
  matieres: any[] = [];
  hoveredDelete = false;
  hoveredEdit = false;
  data: any[] = [];
  errorMessage: string = '';
  semestre: any;
  formation: any;
  professeurs: any[] = [];
  auth: any;
  constructor( private authService: AuthService,private route: ActivatedRoute, private router: Router,private http: HttpService,private cdr: ChangeDetectorRef) {
    this.auth = this.authService.getAuthFromLocalStorage();
  }

  ngOnInit(): void {
    console.log('Initialisation du composant ModuleFormationDirecteurComponent');
    
    // Récupération du module depuis l'état de navigation
    this.module = history.state.module;
    console.log('Module reçu : ', this.module);
  
    if (!this.module) {
      console.log('Redirection vers la page d\'accueil');
      this.router.navigate(['/']);
    } else {
      console.log('Matières du module : ', this.module.matieres);
      this.matieres = this.module.matieres; // Initialise les matières du module
     // this.loadData(); // Charger les données depuis le backend
      this.getProfesseurs()
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
  
  //       // ID du module reçu via history.state
  //       const moduleId = this.module?.id;
  //       console.log('ID du module : ', moduleId);
  
  //       if (!moduleId) {
  //         console.error('ID du module non défini');
  //         this.errorMessage = 'ID du module manquant';
  //         return;
  //       }
  
  //       // Rechercher le module correspondant dans les formations -> semestres -> modules
  //       let foundModule: any = null;
  
  //       for (const formation of formations) {
  //         for (const semestre of formation.semestres) {
  //           foundModule = semestre.modules.find((m: any) => m.id === moduleId);
  //           if (foundModule) {
  //             // Mettre à jour la formation et le semestre correspondants si trouvés
  //             this.formation = formation;
  //             this.semestre = semestre;
  //             break;
  //           }
  //         }
  //         if (foundModule) break; // Arrêter la recherche si le module est trouvé
  //       }
  
  //       if (!foundModule) {
  //         console.error('Module non trouvé avec l\'ID : ', moduleId);
  //         this.errorMessage = 'Module introuvable';
  //         return;
  //       }
  
  //       // Mettre à jour le module et ses matières
  //       this.module = foundModule;
  //       this.matieres = this.module.matieres || [];
  //       console.log('Module et matières mis à jour : ', this.module);
  
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
    // Fonction de redirection avec l'objet formation complet
    goToCoursPage(matiere: any): void {
      console.log('module envoyé : ', matiere);
      this.router.navigate(['apps/CoursEtudiant'], { state: { matiere } });
    }




  
   
  
    getProfesseurs(): void {
    
      this.http.getDataAuth('/professeur/list').subscribe(
        (response) => {
          console.log('Données reçues du backend:', response);
  
          // On stocke l'objet entier (sans transformation partielle)
          this.professeurs = response
  
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Erreur lors de la récupération des données:', error);
          this.errorMessage = 'Erreur de récupération des données';
        }
      );
    }

    
    
  


    voirNote(matiereId: number): void {
      const etudiantId = this.auth?.user?.id;
    
      this.http.getDataAuth(`/etudiant/${etudiantId}/matiere/${matiereId}`).subscribe(
        (note) => {
          console.log(note);
          Swal.fire({
            title: 'Note',
            text: `Votre note est : ${note}`,
            icon: 'info',
            iconColor: 'orange', // Point d'exclamation en orange
            confirmButtonColor: 'primary' // Bouton "OK" en bleu
          });
        },
        (error) => {
          Swal.fire({
            title: 'Erreur',
            text: "La note n'est pas encore disponible",
            icon: 'error',
            iconColor: 'orange', // Point d'exclamation en orange
            confirmButtonColor: 'primary' // Bouton "OK" en bleu
          });
        }
      );
    }
    































}
