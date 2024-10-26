
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { FormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-matiere-formation-directeur',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './matiere-formation-directeur.component.html',
  styleUrl: './matiere-formation-directeur.component.scss'
})
export class MatiereFormationDirecteurComponent {
  

  module: any;
  matieres: any[] = [];
  hoveredDelete = false;
  hoveredEdit = false;
  data: any[] = [];
  errorMessage: string = '';
  semestre: any;
  formation: any;
  professeurs: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router,private http: HttpService,private cdr: ChangeDetectorRef) {}

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
      this.loadData(); // Charger les données depuis le backend
      this.getProfesseurs()
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
  
        // ID du module reçu via history.state
        const moduleId = this.module?.id;
        console.log('ID du module : ', moduleId);
  
        if (!moduleId) {
          console.error('ID du module non défini');
          this.errorMessage = 'ID du module manquant';
          return;
        }
  
        // Rechercher le module correspondant dans les formations -> semestres -> modules
        let foundModule: any = null;
  
        for (const formation of formations) {
          for (const semestre of formation.semestres) {
            foundModule = semestre.modules.find((m: any) => m.id === moduleId);
            if (foundModule) {
              // Mettre à jour la formation et le semestre correspondants si trouvés
              this.formation = formation;
              this.semestre = semestre;
              break;
            }
          }
          if (foundModule) break; // Arrêter la recherche si le module est trouvé
        }
  
        if (!foundModule) {
          console.error('Module non trouvé avec l\'ID : ', moduleId);
          this.errorMessage = 'Module introuvable';
          return;
        }
  
        // Mettre à jour le module et ses matières
        this.module = foundModule;
        this.matieres = this.module.matieres || [];
        console.log('Module et matières mis à jour : ', this.module);
  
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
    // Fonction de redirection avec l'objet formation complet
    goToCoursPage(matiere: any): void {
      console.log('module envoyé : ', matiere);
      this.router.navigate(['apps/FormationCoursDirecteur'], { state: { matiere } });
    }




    MatiereData = {
      label: '',
      description:'',
      moduleId: 0,
      professeurId:0
    };
    formatDate(date: string | Date): string {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0'); // Mois en deux chiffres
      const day = String(d.getDate()).padStart(2, '0'); // Jour en deux chiffres
      return `${year}-${month}-${day}`;
    }
  
    onSubmit(): void {
      const url = '/directeur/addMatiere'; // URL du backend Spring Boot
      const profId = parseInt(this.MatiereData.professeurId as any, 10);
    
      if (isNaN(profId)) {
        console.error('ID du professeur invalide.');
    
        // Alerte d'erreur SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Veuillez sélectionner un professeur valide.',
          confirmButtonColor: '#d33',
        });
        return;
      }
    
      const payload = {
        label: this.MatiereData.label,
        description: this.MatiereData.description,
        moduleId: this.module.id,
        professeurId: profId,
      };
    
      console.log(payload);
      this.http.setData(url, payload).subscribe(
        (response) => {
          console.log('Matière ajoutée avec succès :', response);
    
          // Alerte de succès SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Matière ajoutée!',
            text: 'La matière a été ajoutée avec succès.',
            confirmButtonColor: '#28a745',
          });
    
          // Réinitialiser le formulaire
          this.MatiereData = { label: '', description: '', moduleId: 0, professeurId: 0 };
          this.ngOnInit(); // Réinitialiser les données
          this.cdr.detectChanges(); // Mettre à jour la vue
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la matière :', error);
    
          // Alerte d'erreur SweetAlert
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de l\'ajout de la matière.',
            confirmButtonColor: '#d33',
          });
        }
      );
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

    // Supprimer une module par son ID
    deleteMatiere(id: number): void {
      const url = `/directeur/deleteMatiere/${id}`;
    
      // Alerte de confirmation SweetAlert
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Cette action est irréversible.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.isConfirmed) {
          // Supprimer la matière si l'utilisateur confirme
          this.http.deleteData(url).pipe(
            catchError((error) => {
              console.error('Erreur lors de la suppression de la matière :', error);
    
              // Alerte d'erreur SweetAlert
              Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue lors de la suppression de la matière.',
                confirmButtonColor: '#d33',
              });
    
              return of(null); // Continuer même en cas d'erreur
            })
          ).subscribe((response) => {
            console.log('Matière supprimée avec succès.');
    
            // Alerte de succès SweetAlert
            Swal.fire({
              icon: 'success',
              title: 'Supprimé!',
              text: 'La matière a été supprimée avec succès.',
              confirmButtonColor: '#28a745',
            });
    
            this.loadData(); // Recharger la liste après suppression
            this.cdr.detectChanges(); // Mettre à jour la vue
          });
        }
      });
    }
    
  


editMatiereVisible: boolean = false; // Contrôle l'affichage du formulaire
 
editMatiere: any = {
  id:0,
  label: '',
  description: '',
  moduleId: 0,
  professeurId: 0
};
editVF={
  label: '',
  description: '',
  moduleId: 0,
  professeurId: 0
};

editmatiere(selectedMatiere: any) {
  this.editMatiere = { ...selectedMatiere }; // Copie de l'objet semestre
  this.editMatiere.professeurId=selectedMatiere.professeur.id
  this.editMatiereVisible = true; // Affiche le modal
}



// Soumission du formulaire
onSubmitEdit(): void {
  const url = `/directeur/updateMatiere/${this.editMatiere.id}`; // Utiliser l'id dans l'URL

  console.log(
    'Matiere : ' + 
    this.editMatiere.label + 
    ' | Description : ' + this.editMatiere.description + 
    ' | Prof : ' + this.editMatiere.professeurId + 
    ' | Module : ' + this.editMatiere.moduleId
  );

  this.editVF.label = this.editMatiere.label;
  this.editVF.description = this.editMatiere.description;
  this.editVF.professeurId = parseInt(this.editMatiere.professeurId, 10);
  this.editVF.moduleId = this.module.id;

  console.log('Edit matiere VF : ' + this.editVF.label);
  console.log('Edit matiere VF ProfesseurId : ' + this.editVF.professeurId);

  // Envoi de la requête avec SweetAlert en cas de succès ou d'erreur
  this.http.updateData(url, this.editVF).subscribe(
    (response) => {
      console.log('Matière mise à jour avec succès :', response);

      // Alerte de succès SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Mise à jour réussie!',
        text: 'La matière a été mise à jour avec succès.',
        confirmButtonColor: '#28a745',
      });

      // Réinitialiser le formulaire
      this.editMatiere = { id: 0, label: '' };
      this.editVF = { label: '', moduleId: 0, description: '', professeurId: 0 };
      this.ngOnInit(); // Réinitialiser les données
      this.cdr.detectChanges(); // Mettre à jour la vue
    },
    (error) => {
      console.error('Erreur lors de la mise à jour de la matière :', error);

      // Alerte d'erreur SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de la mise à jour de la matière.',
        confirmButtonColor: '#d33',
      });
    }
  );
}





// Annule la modification
closeModal() {
  this.editMatiereVisible = false; // Cache le modal sans enregistrer
}
















  
}






