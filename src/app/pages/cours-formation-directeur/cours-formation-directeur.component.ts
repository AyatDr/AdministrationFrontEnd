import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpService } from 'src/app/services/http.service';
import { FormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
@Component({
  selector: 'app-cours-formation-directeur',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './cours-formation-directeur.component.html',
  styleUrl: './cours-formation-directeur.component.scss'
})
export class CoursFormationDirecteurComponent {

  
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
      this.loadData(); // Charger les données depuis le backend
    }
  }
  
  loadData(): void {
    this.http.getDataAuth('/directeur/formation/list').subscribe(
      (response) => {
        console.log('Données reçues du backend :', response);
  
        // Assurez-vous que `response` est un objet contenant des formations
        const formations = response || [];
        console.log('Formations extraites :', formations);
  
        if (formations.length === 0) {
          console.error('Aucune formation trouvée');
          this.errorMessage = 'Aucune formation disponible';
          return;
        }
  
        // ID de la matière reçu via history.state
        const matiereId = this.matiere?.id;
        console.log('ID de la matière : ', matiereId);
  
        if (!matiereId) {
          console.error('ID de la matière non défini');
          this.errorMessage = 'ID de la matière manquant';
          return;
        }
  
        // Rechercher la matière dans formations -> semestres -> modules -> matières
        let foundMatiere: any = null;
  
        for (const formation of formations) {
          for (const semestre of formation.semestres) {
            for (const module of semestre.modules) {
              foundMatiere = module.matieres.find((m: any) => m.id === matiereId);
              if (foundMatiere) {
                // Mettre à jour la formation, semestre et module correspondants si trouvés
                this.formation = formation;
                this.semestre = semestre;
                this.module = module;
                break;
              }
            }
            if (foundMatiere) break;
          }
          if (foundMatiere) break;
        }
  
        if (!foundMatiere) {
          console.error('Matière non trouvée avec l\'ID : ', matiereId);
          this.errorMessage = 'Matière introuvable';
          return;
        }
  
        // Mettre à jour la matière et ses cours
        this.matiere = foundMatiere;
        this.cours = this.matiere.cours || [];
        console.log('Matière et cours mis à jour : ', this.matiere);
  
        // Mettre à jour la vue avec ChangeDetectorRef
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Erreur lors de la récupération des données :', error);
        this.errorMessage = 'Erreur de récupération des données';
      }
    );
  }
  
  


  getRandomColor(): string {
    const colors = ['#FF5733', '#007BFF', '#0056D2', '#003C9E', '#001F6C'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
  goToCoursDetailsPage(cour: any): void {
    console.log('module envoyé : ', cour);
    this.router.navigate(['apps/FormationCoursDetailDirecteur'], { state: { cour } });
  }

  CoursData = {
    label: ''
  };
  formatDate(date: string | Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Mois en deux chiffres
    const day = String(d.getDate()).padStart(2, '0'); // Jour en deux chiffres
    return `${year}-${month}-${day}`;
  }

 onSubmit(): void {
    const url = '/directeur/addCours'; // URL du backend Spring Boot
 
    //this.semestreData.fk_form = parsedId;
    const payload = {
      label: this.CoursData.label,
      matiereId: this.matiere.id // Changer `fk_form` en `formationId`
    };
  
    // Mise à jour de l'ID dans l'objet semestreData
    
    console.log(payload)
    this.http.setData(url,payload).subscribe(
      
      (response) => {
        console.log('Semestre ajoutée avec succès :', response);
        
        this.CoursData = { label: ''};// Réinitialiser le formulaire
        this.ngOnInit()
        this.cdr.detectChanges();
      },
    
      (error) => {
        console.error('Erreur lors de l\'ajout de la semestre :', error);
      }
    );
  }

    // Supprimer une module par son ID
    deleteCours(id: number): void {
      const url = `/directeur/deleteCours/${id}`;
      if (confirm('Êtes-vous sûr de vouloir supprimer cette cours ?')) {
        this.http.deleteData(url).pipe(
          catchError((error) => {
            console.error('Erreur lors de la suppression de la formation :', error);
            this.errorMessage = 'Erreur lors de la suppression de la formation.';
            return of(null);
          })
        ).subscribe((response) => {
          console.log('Formation supprimée avec succès.');
          this.loadData(); // Recharger la liste après suppression
          this.cdr.detectChanges();
        });
      }
    }



    editCoursVisible: boolean = false; // Contrôle l'affichage du formulaire
 
    editCours: any = {
      id:0,
      label: '',
      matiereId: 0,
    };
    editVF={
      label: '',
      matiereId: 0,
    };
    
    editcours(selectedCours: any) {
      this.editCours = { ...selectedCours }; // Copie de l'objet semestre
      this.editCoursVisible = true; // Affiche le modal
    }
    
    
    
    // Soumission du formulaire
    onSubmitEdit() {
      const url = `/directeur/updateCours/${this.editCours.id}`; // Utiliser l'id dans l'URL
      console.log(
        'Matiere : ' + 
        this.editCours.label +'desc : ' + 'matiere'+
        this.editCours.matiereId
      );
      this.editVF.label=this.editCours.label;
      this.editVF.matiereId=this.matiere.id;
      console.log('edit matire vf ' + this.editVF.label);
      console.log('edit matier vf ' + this.editVF.matiereId);
      
    
    
      this.http.updateData(url, this.editVF).subscribe(
        (response) => {
          console.log('Formation mise à jour avec succès :', response);
          // Réinitialiser le formulaire
          this.editCours = { id: 0, label: ''};
          this.editVF = { label: '',matiereId:0};
          this.ngOnInit(); // Réinitialiser les données
          this.cdr.detectChanges(); // Mettre à jour la vue
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la formation :', error);
        }
      );
    }
    
    
    
    
    // Annule la modification
    closeModal() {
      this.editCoursVisible = false; // Cache le modal sans enregistrer
    }
    
    
    
    





  
}
