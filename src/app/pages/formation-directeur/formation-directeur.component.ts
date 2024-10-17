import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formation-directeur',
  standalone: true,
  imports: [CommonModule], // Import CommonModule her
  templateUrl: './formation-directeur.component.html',
  styleUrls: ['./formation-directeur.component.scss'],
})
export class FormationDirecteurComponent implements OnInit {
  data: any[] = [];
  errorMessage: string = '';

  // Base path to the formation images folder
  imageBasePath: string = 'assets/formation/';

  // Number of images available (assuming img1.jpg, img2.jpg, etc.)
  imageCount: number = 5; // Update based on the number of images in the assets folder

  constructor(private http: HttpService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.http.getData('/formation/list').subscribe(
      (response) => {
        console.log('Données reçues du backend:', response);
        this.data = response.map((item: any) => ({
          title: item.title,
          subtitle: item.subtitle || '',
          instructor: item.instructor || 'N/A',
          initial: this.getInitial(item.instructor),
          image: this.getRandomImage(), // Assign a random image
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
    return name ? name.charAt(0).toUpperCase() : '?';
  }

  getRandomImage(): string {
    const randomIndex = Math.floor(Math.random() * this.imageCount) + 1;
    return `${this.imageBasePath}img${randomIndex}.jpg`; // Example: 'assets/formation/img3.jpg'
  }
  getRandomColor(): string {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFC300', '#DAF7A6']; // Example colors
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
}
