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
        return 'fas fa-file fs-2x'; // Icône par défaut
    }
  }
  
  
  getFileName(url: string): string {
    return url.split('/').pop() || 'Document'; // Extraire le nom du fichier
  }
  

  openDocument(id: number): void {
    this.http.getDataAuth(`/GetDocumetEtudiant/${id}`).subscribe(
      (response: { url: string }) => {  // Ensure the response is typed correctly
        console.log('URL received from backend:', response.url);
        window.open(`http://localhost:8081/${response.url}`, '_blank');
      },
      (error) => {
        console.error('Error retrieving document:', error);
        alert('Error retrieving document');
      }
    );
  }
  
  










}
