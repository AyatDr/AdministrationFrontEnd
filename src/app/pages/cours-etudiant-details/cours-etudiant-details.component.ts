import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-cours-etudiant-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cours-etudiant-details.component.html',
  styleUrl: './cours-etudiant-details.component.scss'
})
export class CoursEtudiantDetailsComponent {



  cour: any;
  documents: any[] = [];
  liens: any[] = [];
  hoveredDelete = false;
  hoveredEdit = false;
  data: any[] = [];
  errorMessage: string = '';
  semestre: any;
  formation: any;
  module: any;
  matiere: any;

  constructor(private route: ActivatedRoute, private router: Router,private http: HttpService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('Initialisation du composant ModuleFormationDirecteurComponent');
  
    // Récupérer le cours depuis l'état de navigation
    this.cour = history.state.cour;
    console.log('Cours reçu : ', this.cour);
  
    if (!this.cour) {
      console.log('Redirection vers la page d\'accueil');
      this.router.navigate(['/']);
    } else {
      console.log('Documents du cours : ', this.cour.documents);
      console.log('Liens du cours : ', this.cour.liens);
      this.documents = this.cour.documents || []; // Initialise les documents du cours
      this.liens = this.cour.liens || []; // Initialise les liens du cours
      //this.loadData(); // Charger les données depuis le backend
    }
  }
  
  // loadData(): void {
  //   this.http.getDataAuth('/formation/list').subscribe(
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
  
  //       // ID du cours reçu via `history.state`
  //       const courId = this.cour?.id;
  //       console.log('ID du cours : ', courId);
  
  //       if (!courId) {
  //         console.error('ID du cours non défini');
  //         this.errorMessage = 'ID du cours manquant';
  //         return;
  //       }
  
  //       // Rechercher le cours dans formations -> semestres -> modules -> matières -> cours
  //       let foundCour: any = null;
  
  //       for (const formation of formations) {
  //         for (const semestre of formation.semestres) {
  //           for (const module of semestre.modules) {
  //             for (const matiere of module.matieres) {
  //               foundCour = matiere.cours.find((c: any) => c.id === courId);
  //               if (foundCour) {
  //                 // Mettre à jour la formation, semestre, module, et matière correspondants si trouvés
  //                 this.formation = formation;
  //                 this.semestre = semestre;
  //                 this.module = module;
  //                 this.matiere = matiere;
  //                 break;
  //               }
  //             }
  //             if (foundCour) break;
  //           }
  //           if (foundCour) break;
  //         }
  //         if (foundCour) break;
  //       }
  
  //       if (!foundCour) {
  //         console.error('Cours non trouvé avec l\'ID : ', courId);
  //         this.errorMessage = 'Cours introuvable';
  //         return;
  //       }
  
  //       // Mettre à jour le cours et ses documents/liens
  //       this.cour = foundCour;
  //       this.documents = this.cour.documents || [];
  //       this.liens = this.cour.liens || [];
  //       console.log('Cours, documents et liens mis à jour : ', this.cour);
  
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
  getIconClass(url: string): string {
    const extension = url.split('.').pop()?.toLowerCase();
    console.log('Extension:', extension); // Vérifier l'extension

    switch (extension) {
      case 'pdf':
        return 'fas fa-file-pdf text-danger fs-2x'; // PDF rouge
      case 'doc':
      case 'docx':
        return 'fas fa-file-word text-primary fs-2x'; // Word bleu
      case 'xlsx':
        return 'fas fa-file-excel text-success fs-2x'; // Excel vert
      default:
        return 'fas fa-file'; // Icône par défaut
    }
  }
  
  
  getFileName(url: string): string {
    return url.split('/').pop() || 'Document'; // Extraire le nom du fichier
  }
  











}
