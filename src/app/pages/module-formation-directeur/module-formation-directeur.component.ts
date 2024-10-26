import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { FormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-module-formation-directeur',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './module-formation-directeur.component.html',
  styleUrl: './module-formation-directeur.component.scss'
})
export class ModuleFormationDirecteurComponent {



  semestre: any;
  formation: any;
  sem: any;
  modules: any[] = [];
  hoveredDelete = false;
  hoveredEdit = false;
  data: any[] = [];
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private router: Router,private http: HttpService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('Initialisation du composant ModuleFormationDirecteurComponent');
    
    // Récupération du semestre depuis l'état de navigation
    this.semestre = history.state.semestre;
    console.log('Semestre reçu : ', this.semestre);
  
    if (!this.semestre) {
      console.log('Redirection vers la page d\'accueil');
      this.router.navigate(['/']);
    } else {
      console.log('Modules du semestre : ', this.semestre.modules);
      this.modules = this.semestre.modules; // Initialise les modules du semestre
      this.loadData(); // Charger les données depuis le backend
    }
  }
  
  loadData(): void {
    this.http.getDataAuth('/directeur/formation/list').subscribe(
      (response) => {
        console.log('Données reçues du backend :', response);
      
        // Assurez-vous que `data` est un objet et contient des formations
        const formations = response|| []; // Ajuster selon la structure réelle
        console.log('Formations extraites :', formations);
  
        if (formations.length === 0) {
          console.error('Aucune formation trouvée');
          this.errorMessage = 'Aucune formation disponible';
          return;
        }
  
        // ID du semestre reçu depuis `history.state`
        const semestreId = this.semestre?.id;
        console.log('ID du semestre :', semestreId);
  
        if (!semestreId) {
          console.error('ID du semestre non défini');
          this.errorMessage = 'ID du semestre manquant';
          return;
        }
  
        // Rechercher le semestre correspondant dans les formations
        let foundSemestre: any = null;
  
        for (const formation of formations) {
          foundSemestre = formation.semestres.find((s: any) => s.id === semestreId);
          if (foundSemestre) {
            // Mettre à jour la formation correspondante si trouvée
            this.formation = formation;
            break;
          }
        }
  
        if (!foundSemestre) {
          console.error('Semestre non trouvé avec l\'ID : ', semestreId);
          this.errorMessage = 'Semestre introuvable';
          return;
        }
  
        // Mettre à jour le semestre et ses modules
        this.semestre = foundSemestre;
        this.modules = this.semestre.modules || [];
        console.log('Semestre et modules mis à jour : ', this.semestre);
  
        // Mettre à jour la vue avec `ChangeDetectorRef`
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
   goToMatierePage(module: any): void {
    console.log('module envoyé : ', module);
    this.router.navigate(['apps/FormationMatiereDirecteur'], { state: { module } });
  }

  ModuleData = {
    label: '',
    fk_sem: 0
  };
  formatDate(date: string | Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Mois en deux chiffres
    const day = String(d.getDate()).padStart(2, '0'); // Jour en deux chiffres
    return `${year}-${month}-${day}`;
  }

  onSubmit(): void {
    const url = '/directeur/addModule'; // URL du backend Spring Boot
    const parsedId = parseInt(this.ModuleData.fk_sem as any, 10);
  
    if (isNaN(parsedId)) {
      console.error('ID de semestre invalide.');
      
      // Alerte d'erreur SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'L\'ID du semestre est invalide.',
        confirmButtonColor: '#d33',
      });
      return;
    }
  
    const payload = {
      label: this.ModuleData.label,
      semestreId: this.semestre.id, // Changer `fk_form` en `formationId`
    };
  
    console.log(payload);
    this.http.setData(url, payload).subscribe(
      (response) => {
        console.log('Module ajouté avec succès :', response);
  
        // Alerte de succès SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Module ajouté!',
          text: 'Le module a été ajouté avec succès.',
          confirmButtonColor: '#28a745',
        });
  
        // Réinitialiser le formulaire
        this.ModuleData = { label: '', fk_sem: 0 };
        this.ngOnInit(); // Réinitialiser les données
        this.cdr.detectChanges(); // Mettre à jour la vue
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du module :', error);
  
        // Alerte d'erreur SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de l\'ajout du module.',
          confirmButtonColor: '#d33',
        });
      }
    );
  }

// Supprimer une module par son ID
deleteModule(id: number): void {
  const url = `/directeur/deleteModule/${id}`;

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
      // Supprimer le module si l'utilisateur confirme
      this.http.deleteData(url).pipe(
        catchError((error) => {
          console.error('Erreur lors de la suppression du module :', error);

          // Alerte d'erreur SweetAlert
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la suppression du module.',
            confirmButtonColor: '#d33',
          });

          return of(null); // Continuer même en cas d'erreur
        })
      ).subscribe((response) => {
        console.log('Module supprimé avec succès.');

        // Alerte de succès SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Supprimé!',
          text: 'Le module a été supprimé avec succès.',
          confirmButtonColor: '#28a745',
        });

        this.loadData(); // Recharger la liste après suppression
        this.cdr.detectChanges(); // Mettre à jour la vue
      });
    }
  });
}



editModuleVisible: boolean = false; // Contrôle l'affichage du formulaire
 
editModule: any = {
  id:0,
  label: '',
  fk_sem: 0
};
editVF={
  label: '',
  semestreId: 0
};

editmodule(selectedModule: any) {
  this.editModule = { ...selectedModule }; // Copie de l'objet semestre

  console.log('Raw label:', this.editModule.label);



  this.editModuleVisible = true; // Affiche le modal
}



// Soumission du formulaire
onSubmitEdit(): void {
  const url = `/directeur/updateModule/${this.editModule.id}`; // Utiliser l'id dans l'URL

  console.log('Module : ' + this.editModule.label);

  this.editVF.label = this.editModule.label;
  this.editVF.semestreId = this.semestre.id;

  console.log('edit module vf ' + this.editVF.label);
  console.log('edit module vf ' + this.editVF.semestreId);

  this.http.updateData(url, this.editVF).subscribe(
    (response) => {
      console.log('Module mis à jour avec succès :', response);

      // Alerte de succès SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Mise à jour réussie!',
        text: 'Le module a été mis à jour avec succès.',
        confirmButtonColor: '#28a745',
      });

      // Réinitialiser le formulaire
      this.editModule = { id: 0, label: '' };
      this.editVF = { label: '', semestreId: 0 };
      this.ngOnInit(); // Réinitialiser les données
      this.cdr.detectChanges(); // Mettre à jour la vue
    },
    (error) => {
      console.error('Erreur lors de la mise à jour du module :', error);

      // Alerte d'erreur SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de la mise à jour du module.',
        confirmButtonColor: '#d33',
      });
    }
  );
}




// Annule la modification
closeModal() {
  this.editModuleVisible = false; // Cache le modal sans enregistrer
}










  
}



