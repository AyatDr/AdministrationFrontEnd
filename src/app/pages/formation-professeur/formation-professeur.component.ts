import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-formation-professeur',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './formation-professeur.component.html',
  styleUrl: './formation-professeur.component.scss'
})
export class FormationProfesseurComponent implements OnInit {

  authProf = JSON.parse(localStorage.getItem(`${environment.appVersion}-${environment.USERDATA_KEY}`) ?? '{}').user;

  data: any[] = [];

  errorMessage: string = '';

  imageBasePath: string = 'assets/formation/';

  // Number of images available (assuming img1.jpg, img2.jpg, etc.)
  imageCount: number = 5; // Update based on the number of images in the assets folder

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) { }
  
  ngOnInit(): void {

    this.http.get<any[]>(`http://localhost:8081/api/prof/formations/${this.authProf.id}/list`)
      .subscribe(
        (response) => {
          
          this.data = response.map((item: any) => ({
            id: item.id,
            label: item.label,
            initial: this.getInitial( this.authProf.nom ),
            image: this.getRandomImage(),
            backgroundColor: this.getRandomColor(),
          }));
          
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error fetching formations:', error);
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
  navigateToSemestres(formationId: number) {
    this.router.navigate(['/prof/formation', formationId, 'semestres', 'list']);
  }

}
