
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { FormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
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
//const parsedId = parseInt(this.MatiereData.moduleId as any, 10);
      const profId = parseInt(this.MatiereData.professeurId as any, 10);
     
      //this.semestreData.fk_form = parsedId;
      const payload = {
        label: this.MatiereData.label,
        description:this.MatiereData.description,
        moduleId: this.module.id, // Changer `fk_form` en `formationId`
        professeurId: profId
      };
    
      // Mise à jour de l'ID dans l'objet semestreData
      
      console.log(payload)
      this.http.setData(url,payload).subscribe(
        
        (response) => {
          console.log('Semestre ajoutée avec succès :', response);
          
          this.MatiereData = { label: '',  description:'',
moduleId: 0,professeurId:0};// Réinitialiser le formulaire
          this.ngOnInit()
          this.cdr.detectChanges();
        },
      
        (error) => {
          console.error('Erreur lors de l\'ajout de la semestre :', error);
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
  if (confirm('Êtes-vous sûr de vouloir supprimer cette matiere ?')) {
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
onSubmitEdit() {
  const url = `/directeur/updateMatiere/${this.editMatiere.id}`; // Utiliser l'id dans l'URL
  console.log(
    'Matiere : ' + 
    this.editMatiere.label +'desc : ' + 
    this.editMatiere.description +'prof : ' + 
    this.editMatiere.professeurId +'module : ' + 
    this.editMatiere.moduleId
  );
  this.editVF.label=this.editMatiere.label;
  this.editVF.description=this.editMatiere.description;
  this.editVF.professeurId=parseInt(this.editMatiere.professeurId);
  this.editVF.moduleId=this.module.id;
  console.log('edit matire vf ' + this.editVF.label);
  console.log('edit matier vf ' + this.editVF.professeurId);
  


  this.http.updateData(url, this.editVF).subscribe(
    (response) => {
      console.log('Formation mise à jour avec succès :', response);
      // Réinitialiser le formulaire
      this.editMatiere = { id: 0, label: ''};
      this.editVF = { label: '',moduleId:0,description:'',professeurId:0};
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
  this.editMatiereVisible = false; // Cache le modal sans enregistrer
}
















  
}






