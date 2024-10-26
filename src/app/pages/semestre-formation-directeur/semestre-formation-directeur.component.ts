
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpService } from 'src/app/services/http.service';
import { FormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-semestre-formation-directeur',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './semestre-formation-directeur.component.html',
  styleUrl: './semestre-formation-directeur.component.scss'
})
export class SemestreFormationDirecteurComponent {

  formation: any;
  semestres: any[] = [];
  hoveredDelete = false;
  hoveredEdit = false;
  data: any[] = [];
  errorMessage: string = '';



    

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpService,private cdr: ChangeDetectorRef,) {}

  ngOnInit(): void {
    // Récupérer l’objet formation depuis l'état de navigation
    this.formation = history.state.formation;
    console.log('Formation spécifique : ', this.formation);
  
    if (!this.formation) {
      this.router.navigate(['/']); // Rediriger si aucune formation n'est reçue
    } else {
      // Charger les semestres si l'objet formation est déjà présent
      this.semestres = this.formation.semestres;
      console.log('Les semestres de la formation : ', this.semestres);
  
      // Charger toutes les données de formation et mettre à jour la formation actuelle
      this.loadData();
    }
  }
  
  loadData(): void {
    this.http.getDataAuth('/directeur/formation/list').subscribe(
      (response) => {
        console.log('Données reçues du backend :', response);
  
        // On stocke les données dans le tableau data
        this.data = response;
        console.log('daaata'+this.data)
  
        // Rechercher la formation correspondante via l'ID
        const formationId = this.formation.id; // ID reçu depuis history.state
        console.log('id 1'+formationId)
        const foundFormation = this.data.find((f: any) => f.id=== formationId);
        console.log('id 2'+foundFormation.id)
        if (foundFormation) {
          // Mettre à jour l'objet formation avec les données complètes
          this.formation = foundFormation;
          this.semestres = this.formation.semestres; // Met à jour les semestres également
          console.log('Formation mise à jour : ', this.formation);
        } else {
          console.error('Formation non trouvée avec l\'ID : ', formationId);
          this.errorMessage = 'Formation introuvable';
        }
  
        this.cdr.detectChanges(); // Mettre à jour la vue
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
  goToModulesPage(semestre: any): void {
    console.log('Semestre envoyé : ', semestre);
    this.router.navigate(['apps/FormationModuleDirecteur'], { state: { semestre } });
  }

  semestreData = {
    label: '',
    date_debut: '',
    date_fin: '',
    fk_form: 0
  };
  formatDate(date: string | Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Mois en deux chiffres
    const day = String(d.getDate()).padStart(2, '0'); // Jour en deux chiffres
    return `${year}-${month}-${day}`;
  }

  onSubmit(): void {
    const url = '/directeur/addSemestre'; // URL du backend Spring Boot
    const parsedId = parseInt(this.semestreData.fk_form as any, 10);
  
    if (isNaN(parsedId)) {
      console.error('ID de formation invalide.');
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'L\'ID de la formation est invalide.',
        confirmButtonColor: '#d33',
      });
      return;
    }
  
    const payload = {
      label: this.semestreData.label,
      dateDebut: this.formatDate(this.semestreData.date_debut), // 'YYYY-MM-DD'
      dateFin: this.formatDate(this.semestreData.date_fin),     // 'YYYY-MM-DD'
      formationId: this.formation.id // Changer `fk_form` en `formationId`
    };
  
    console.log(payload);
    this.http.setData(url, payload).subscribe(
      (response) => {
        console.log('Semestre ajouté avec succès :', response);
  
        // Alerte de succès SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Semestre ajouté!',
          text: 'Le semestre a été ajouté avec succès.',
          confirmButtonColor: '#28a745',
        });
  
        // Réinitialiser le formulaire
        this.semestreData = {
          label: '',
          date_debut: '',
          date_fin: '',
          fk_form: 0,
        };
        this.ngOnInit(); // Réinitialiser les données
        this.cdr.detectChanges(); // Mettre à jour la vue
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du semestre :', error);
  
        // Alerte d'erreur SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de l\'ajout du semestre.',
          confirmButtonColor: '#d33',
        });
      }
    );
  }
 // Supprimer une formation par son ID
 deleteSemestre(id: number): void {
  const url = `/directeur/deleteSemestre/${id}`;

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
      // Supprimer le semestre si l'utilisateur confirme
      this.http.deleteData(url).pipe(
        catchError((error) => {
          console.error('Erreur lors de la suppression du semestre :', error);

          // Alerte d'erreur SweetAlert
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la suppression du semestre.',
            confirmButtonColor: '#d33',
          });

          return of(null); // Continuer même en cas d'erreur
        })
      ).subscribe((response) => {
        console.log('Semestre supprimé avec succès.');

        // Alerte de succès SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Supprimé!',
          text: 'Le semestre a été supprimé avec succès.',
          confirmButtonColor: '#28a745',
        });

        this.loadData(); // Recharger la liste après suppression
        this.cdr.detectChanges(); // Mettre à jour la vue
      });
    }
  });
}
editSemestreVisible: boolean = false; // Contrôle l'affichage du formulaire
 
editSemesetre: any = {
  id:0,
  label: '',
  date_debut: '',
  date_fin: '',
  fk_form: 0
};
editVF={
  label: '',
  dateDebut: '',
  dateFin: '',
  formationId: 0
};

editSemestre(selectedSemestre: any) {
  this.editSemesetre = { ...selectedSemestre }; // Copie de l'objet semestre

  console.log('Raw date_debut:', this.editSemesetre.dateDebut);
  console.log('Raw date_fin:', this.editSemesetre.dateFin);

  // Vérifier si les dates sont valides avant de les formater
  this.editSemesetre.date_debut = this.formatDate(this.editSemesetre.dateDebut);
  this.editSemesetre.date_fin = this.formatDate(this.editSemesetre.dateFin);

  console.log('edit semstre date_debut : ' + this.editSemesetre.dateDebut);
  console.log('edit semstre date_fin : ' + this.editSemesetre.dateFin);

  this.editSemestreVisible = true; // Affiche le modal
}



// Soumission du formulaire
onSubmitEdit(): void {
  const url = `/directeur/updateSemestre/${this.editSemesetre.id}`; // Utiliser l'id dans l'URL

  console.log(
    'Formation : ' +
    this.editSemesetre.label +
    ' - Date début : ' +
    this.editSemesetre.date_debut +
    ' - Date fin : ' + this.editSemesetre.date_fin
  );

  this.editVF.dateDebut = this.editSemesetre.date_debut;
  this.editVF.label = this.editSemesetre.label;
  this.editVF.dateFin = this.editSemesetre.date_fin;
  this.editVF.formationId = this.formation.id;

  console.log('edit formation vf ' + this.editVF.label);
  console.log('edit formation vf ' + this.editVF.dateDebut);
  console.log('edit formation vf ' + this.editVF.dateFin);
  console.log('edit formation vf ' + this.editVF.formationId);

  this.http.updateData(url, this.editVF).subscribe(
    (response) => {
      console.log('Formation mise à jour avec succès :', response);

      // Alerte de succès SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Mise à jour réussie!',
        text: 'Le semestre a été mis à jour avec succès.',
        confirmButtonColor: '#28a745',
      });

      // Réinitialiser le formulaire
      this.editSemesetre = { id: 0, label: '', date_debut: '', date_fin: '' };
      this.editVF = { label: '', dateDebut: '', dateFin: '', formationId: 0 };
      this.ngOnInit(); // Réinitialiser les données
      this.cdr.detectChanges(); // Mettre à jour la vue
    },
    (error) => {
      console.error('Erreur lors de la mise à jour de la formation :', error);

      // Alerte d'erreur SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de la mise à jour du semestre.',
        confirmButtonColor: '#d33',
      });
    }
  );
}




// Annule la modification
closeModal() {
  this.editSemestreVisible = false; // Cache le modal sans enregistrer
}



  
}



