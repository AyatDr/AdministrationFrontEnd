import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  




  constructor(private http: HttpService,private cdr: ChangeDetectorRef)  {
   
  }
  
  ngOnInit(): void {
   this.loadData()
  
  }


  data: any; 
  errorMessage: string = '';
  loadData(): void {
    this.http.getData('/formation/list').subscribe(
      (response) => {
        console.log('Données reçues du backend:', response);
        this.data = response; // Stocker les données reçues
        this.cdr.detectChanges()
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);
        this.errorMessage = 'Erreur de récupération des données';
      }
    );
  }

 






  
}