import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { FormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
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
      console.error('ID de formation invalide.');
      return;
    }
    //this.semestreData.fk_form = parsedId;
    const payload = {
      label: this.ModuleData.label,
      semestreId: this.semestre.id // Changer `fk_form` en `formationId`
    };
  
    // Mise à jour de l'ID dans l'objet semestreData
    
    console.log(payload)
    this.http.setData(url,payload).subscribe(
      
      (response) => {
        console.log('Semestre ajoutée avec succès :', response);
        
        this.ModuleData = { label: '',  
          fk_sem: 0};// Réinitialiser le formulaire
        this.ngOnInit()
        this.cdr.detectChanges();
      },
    
      (error) => {
        console.error('Erreur lors de l\'ajout de la semestre :', error);
      }
    );
  }

// Supprimer une module par son ID
deleteModule(id: number): void {
  const url = `/directeur/deleteModule/${id}`;
  if (confirm('Êtes-vous sûr de vouloir supprimer cette Module?')) {
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
onSubmitEdit() {
  const url = `/directeur/updateModule/${this.editModule.id}`; // Utiliser l'id dans l'URL
  console.log(
    'Module : ' + 
    this.editModule.label 
  );
  this.editVF.label=this.editModule.label;
  this.editVF.semestreId=this.semestre.id;
  console.log('edit module vf ' + this.editVF.label);
  console.log('edit module vf ' + this.editVF.semestreId);
  


  this.http.updateData(url, this.editVF).subscribe(
    (response) => {
      console.log('Formation mise à jour avec succès :', response);
      // Réinitialiser le formulaire
      this.editModule = { id: 0, label: ''};
      this.editVF = { label: '',semestreId:0};
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
  this.editModuleVisible = false; // Cache le modal sans enregistrer
}










  
}



