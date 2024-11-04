import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HttpService } from 'src/app/services/http.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})



export class DashboardComponent implements OnInit {
  




  constructor(private http: HttpService,private cdr: ChangeDetectorRef)  {
   
  }
  
  ngOnInit(): void {
   this.GetEtudiants()
   this.GetProfesseurs()
   this.GetFormations()
   this.GetFormationsSemestre()

  }


  data: any; 
  errorMessage: string = '';
  etudiants:any;
  professeurs:any;
  formations:any;
  nombreEtudiants:Number
  nombreProfesseur:Number
  nombreFormation:Number
  nombreModules:Number


  GetEtudiants(): void {
    // Charger les étudiants
    this.http.getDataAuth('/etudiant/list').subscribe(
      (etudiantsResponse) => {
        console.log('Étudiants reçus du backend:', etudiantsResponse);
        this.etudiants = etudiantsResponse;
          // Calculer le nombre d'étudiants
      const nombreEtudiants = this.etudiants.length;
      console.log('Nombre total d\'étudiants:', nombreEtudiants);

      // Optionnel : Vous pouvez également afficher ce nombre dans l'interface utilisateur
      this.nombreEtudiants = nombreEtudiants;
      this.cdr.detectChanges()

      },
      (error) => {
        console.error('Erreur lors de la récupération des étudiants:', error);
        this.errorMessage = 'Erreur de récupération des étudiants';
      }
    );
  }
  

   GetProfesseurs(): void {
    // Charger les étudiants
    this.http.getDataAuth('/professeur/list').subscribe(
      (data) => {
        console.log('Étudiants reçus du backend:', data);
        this.professeurs = data;
               // Calculer le nombre de professeurs
      const nombreProfesseur = this.professeurs.length;
      console.log('Nombre total d\'étudiants:', nombreProfesseur);

      // Optionnel : Vous pouvez également afficher ce nombre dans l'interface utilisateur
      this.nombreProfesseur = nombreProfesseur;
      this.cdr.detectChanges()
      },
      (error) => {
        console.error('Erreur lors de la récupération des étudiants:', error);
        this.errorMessage = 'Erreur de récupération des étudiants';
      }
    );
  }


  GetFormations(): void {
    // Charger les étudiants
    this.http.getDataAuth('/directeur/formation/list').subscribe(
      (data) => {
        console.log('GetFormations reçus du backend:', data);
        this.formations = data;
             // Calculer le nombre d'étudiants
      const nombreFormation = this.formations.length;
      console.log('Nombre total de formation:', nombreFormation);

      // Optionnel : Vous pouvez également afficher ce nombre dans l'interface utilisateur
      this.nombreFormation = nombreFormation;

       // Calculer le nombre total de modules
       let nombreModules = 0;
       this.formations.forEach((formation: any) => {
         formation.semestres.forEach((semestre: any) => {
           nombreModules += semestre.modules.length;
         });
       });
 
       console.log('Nombre total de modules:', nombreModules);
      
        
       // Optionnel : Vous pouvez également afficher ce nombre dans l'interface utilisateur
       this.nombreModules = nombreModules;

       const labels = this.formations.map((f: { label: any; }) => f.label);
       const dataPoints = this.formations.map((f: { etudiants: string | any[]; }) => f.etudiants.length);
 
       console.log('Labels:', labels);  // Vérifiez que les labels sont corrects
       console.log('Data Points:', dataPoints);  // Vérifiez les valeurs des points
 
       // Créez le graphique après récupération des données
       this.createChart(labels, dataPoints);

  

      this.cdr.detectChanges()
      },
      (error) => {
        console.error('Erreur lors de la récupération des étudiants:', error);
        this.errorMessage = 'Erreur de récupération des étudiants';
      }
    );
  }


  formationSemestre : any[] = []

  GetFormationsSemestre(): void {
    // Charger les étudiants
    this.http.getDataAuth('/directeur/formation/list').subscribe(
      (data) => {
        console.log('GetFormations reçus du backend:', data);
        this.formationSemestre = data;
   
     // Ensure proper mapping of labels and data points
     const formationLabels = this.formations.map((f: { label: any; }) => f.label || 'Inconnu'); // Default to 'Inconnu' if label is missing
     const semesterCounts = this.formations.map((f: { semestres: string | any[]; }) => f.semestres ? f.semestres.length : 0);
       // Create the bar chart with the processed data
       this.createBarChart(formationLabels, semesterCounts);

      this.cdr.detectChanges()
      },
      (error) => {
        console.error('Erreur lors de la récupération des étudiants:', error);
        this.errorMessage = 'Erreur de récupération des étudiants';
      }
    );
  }

 


  chart: any;


  createChart(labels: string[], dataPoints: number[]): void {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
  
    // Vérifiez si un graphe existe déjà et détruisez-le
    if (this.chart) {
      this.chart.destroy();
    }
  
    // Créez un nouveau graphe avec des options de layout et taille réduite
    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: dataPoints,
          backgroundColor: [
            'rgba(255, 193, 7)',    // Jaune
            'rgba(0, 0, 0)',        // Noir
            'rgba(10, 64, 134)',    // Bleu ciel
            'rgba(165, 42, 42, 1)',   // Rouge
            'rgba(75, 192, 192)',   // Vert
            'rgba(153, 102, 255)',  // Violet
          ],
          borderColor: [
            'rgba(255, 193, 7)',    // Jaune
            'rgba(0, 0, 0)',        // Noir
            'rgba(10, 64, 134)',    // Bleu ciel
            'rgba(165, 42, 42, 1)',   // Rouge
            'rgba(75, 192, 192)',   // Vert
            'rgba(153, 102, 255)',  // Violet
          ],
          hoverBackgroundColor: [
            'rgba(255, 193, 7)',
            'rgba(0, 0, 0)',
            'rgba(10, 64, 134)',
            'rgba(165, 42, 42, 1)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,  // Maintient un aspect équilibré mais modifiable
        aspectRatio: 1.5,  // Réduit la hauteur du graphe (1.5 ou 2 fonctionnent bien)
        layout: {
          padding: {
            top: 5,
            bottom: 5,
            left: 5,
            right: 5
          }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 10,  // Réduit la taille des boîtes de légende
              padding: 10
            }
          },
          tooltip: {
            enabled: true,
          },
          title: {
            display: true,
            text: 'Répartition des Étudiants par Formation',
            font: {
              size: 16,  // Taille du titre réduite
              weight: 'bold',
            },
            padding: {
              top: 10,
              bottom: 10
            }
          }
        }
      }
    });
  }
  
  chart2: any;
  // Function to create a bar chart for semesters per formation
  createBarChart(labels: string[], dataPoints: number[]): void {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
  
    if (this.chart2) {
      this.chart2.destroy();
    }
  
    this.chart2 = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: dataPoints,
          backgroundColor: [
            'rgba(255, 193, 7)',    // Jaune
            'rgba(0, 0, 0)',        // Noir
            'rgba(10, 64, 134)',    // Bleu ciel
            'rgba(165, 42, 42, 1)',   // Rouge
            'rgba(75, 192, 192)',   // Vert
            'rgba(153, 102, 255)',  // Violet
          ],
          borderColor: [
            'rgba(255, 193, 7)',    // Jaune
            'rgba(0, 0, 0)',        // Noir
            'rgba(10, 64, 134)',    // Bleu ciel
            'rgba(165, 42, 42, 1)',   // Rouge
            'rgba(75, 192, 192)',   // Vert
            'rgba(153, 102, 255)',  // Violet
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false // Disable the legend
          },
          title: {
            display: true,
            text: 'Nombre de Semestres par Formation',
            font: {
              size: 16,
              weight: 'bold'
            },
            padding: {
              top: 10,
              bottom: 10
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              callback: function (value) {
                return Number.isInteger(value) ? value : null;
              }
            },
            title: {
              display: true,
              text: 'Nombre de Semestres',
              font: {
                size: 14
              }
            }
          },
          x: {
            title: {
              display: true,
              text: 'Formations',
              font: {
                size: 14
              }
            }
          }
        }
      }
    });
  }
  
  

}
