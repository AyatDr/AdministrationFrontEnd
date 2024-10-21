
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-semestre-formation-directeur',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './semestre-formation-directeur.component.html',
  styleUrl: './semestre-formation-directeur.component.scss'
})
export class SemestreFormationDirecteurComponent {

  formation: any;
  semestres: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Récupérer l’objet formation depuis l'état de navigation
    this.formation = history.state.formation;
    console.log(this.formation)
    if (!this.formation) {
      this.router.navigate(['/']); // Rediriger si aucune formation n'est reçue
    } else {
      // Charger les semestres depuis l'objet formation
      this.semestres = this.formation.semestres;
      console.log(this.semestres)
    }
  }


  getRandomColor(): string {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFC300', '#DAF7A6'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
}



