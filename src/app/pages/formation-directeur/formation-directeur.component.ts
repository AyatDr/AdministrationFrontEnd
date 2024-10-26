import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { FormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
import bootstrap from 'bootstrap';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-formation-directeur',
  standalone: true,
  imports: [CommonModule,FormsModule], 
  templateUrl: './formation-directeur.component.html',
  styleUrls: ['./formation-directeur.component.scss'],
})
export class FormationDirecteurComponent implements OnInit {
  data: any[] = [];
  errorMessage: string = '';

  imageBasePath: string = 'assets/formation/';
  imageCount: number = 5;
  //Token variables
  auth:any;
  token:any;
  hoveredDelete = false;
  hoveredEdit = false;


  constructor( private authService: AuthService,
    private http: HttpService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
     this.auth = this.authService.getAuthFromLocalStorage();
     this.token=this.auth.authToken;
     console.log("Token:" +   this.token)

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    
    this.http.getDataAuth('/directeur/formation/list').subscribe(
      (response) => {
        console.log('Données reçues du backend:', response);

        // On stocke l'objet entier (sans transformation partielle)
        this.data = response.map((item: any) => ({
          ...item, // Inclure toutes les propriétés de l'objet d'origine
          initial: this.getInitial(item.label),
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
    if (!name) return '?'; // Si la chaîne est vide ou nulle
  
    const words = name.trim().split(' '); // Diviser la chaîne sur les espaces
    const firstInitial = words[0]?.charAt(0).toUpperCase() || ''; // Première lettre du 1er mot
    const secondInitial = words[1]?.charAt(0).toUpperCase() || ''; // Première lettre du 2e mot
  
    return firstInitial + secondInitial; // Retourner les deux initiales
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

  formation = {
    label: '',
    description: ''
 // Champs vides ajoutés
  };// Stocker les données de la formation

  // Fonction déclenchée lors de la soumission du formulaire
  onSubmit(): void {
    const url = '/directeur/addFormation'; // URL du backend Spring Boot
    console.log('formation' + this.formation.label + 'description' + this.formation.description);
    console.log(this.formation);
  
    this.http.setData(url, JSON.stringify(this.formation)).subscribe(
      (response) => {
        console.log('Formation ajoutée avec succès :', response);
  
        // Alerte de succès SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Formation ajoutée!',
          text: 'La formation a été ajoutée avec succès.',
          confirmButtonColor: '#28a745',
        });
  
        // Réinitialiser le formulaire
        this.formation = { label: '', description: '' };
        this.ngOnInit();
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la formation :', error);
  
        // Alerte d'erreur SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de l\'ajout de la formation.',
          confirmButtonColor: '#d33',
        });
      }
    );
  }
  

  // Supprimer une formation par son ID
  deleteFormation(id: number): void {
    const url = `/directeur/deleteFormation/${id}`;
  
    // Alerte de confirmation avant suppression
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
        // Si l'utilisateur confirme, effectuer la suppression
        this.http.deleteData(url).pipe(
          catchError((error) => {
            console.error('Erreur lors de la suppression de la formation :', error);
  
            // Alerte d'erreur SweetAlert
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Une erreur est survenue lors de la suppression de la formation.',
            });
  
            return of(null); // Continuer même en cas d'erreur
          })
        ).subscribe((response) => {
          console.log('Formation supprimée avec succès.');
  
          // Alerte de succès SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Supprimé!',
            text: 'La formation a été supprimée avec succès.',
            confirmButtonColor: '#28a745',
          });
  
          this.loadData(); // Recharger la liste après suppression
          this.cdr.detectChanges();
        });
      }
    });
  }
  editFormationVisible: boolean = false; // Contrôle l'affichage du formulaire
 
  editformation: any = {
    id: 0,
    label: '',
    description: '',
  };
  editVF={
     label: '',
    description: ''
  };
  
  editFormation(selectedFormation: any) {
    this.editformation = { ...selectedFormation }; // Copie de l'objet formation
    console.log('edit formation ' + this.editformation.description);
    console.log('edit formation ' + this.editformation.label);
    console.log('edit formation ' + this.editformation.id);
    this.editFormationVisible = true; // Affiche le modal
  
  }
  
  // Soumission du formulaire
  onSubmitEdit(): void {
    const url = `/directeur/updateFormation/${this.editformation.id}`; // Utiliser l'id dans l'URL
  
    console.log(
      'Formation : ' +
      this.editformation.label +
      ' - Description : ' +
      this.editformation.description
    );
  
    this.editVF.description = this.editformation.description;
    this.editVF.label = this.editformation.label;
    console.log('edit formation vf ' + this.editVF.description);
    console.log('edit formation vf ' + this.editVF.label);
  
    this.http.updateData(url, this.editVF).subscribe(
      (response) => {
        console.log('Formation mise à jour avec succès :', response);
  
        // Alerte de succès SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Mise à jour réussie!',
          text: 'La formation a été mise à jour avec succès.',
          confirmButtonColor: '#28a745',
        });
  
        // Réinitialiser le formulaire
        this.editformation = { id: 0, label: '', description: '' };
        this.editVF = { label: '', description: '' };
        this.ngOnInit(); // Réinitialiser les données
        this.cdr.detectChanges(); // Mettre à jour la vue
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la formation :', error);
  
        // Alerte d'erreur SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la mise à jour de la formation.',
          confirmButtonColor: '#d33',
        });
      }
    );
  }
  

 

  // Annule la modification
  closeModal() {
    this.editFormationVisible = false; // Cache le modal sans enregistrer
  }






}

