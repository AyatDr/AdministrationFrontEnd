import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Note {
  idNote: number;
  etudiant: string;
  valeur: number;
}

@Component({
  selector: 'app-etudiant-professeur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './etudiant-professeur.component.html',
  styleUrl: './etudiant-professeur.component.scss'
})
export class EtudiantProfesseurComponent implements OnInit {
  authProf = JSON.parse(localStorage.getItem(`${environment.appVersion}-${environment.USERDATA_KEY}`) ?? '{}').user;
  data: any = null;
  showModal = false;
  selectedNote: Note | null = null;
  updatedMark: number | null = null;

  formationId: string | null = null;
  semestreId: string | null = null;
  moduleId: string | null = null;
  matiereId: string | null = null;

  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient, 
    private router: Router, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.formationId = this.route.snapshot.paramMap.get('formation');
    this.semestreId = this.route.snapshot.paramMap.get('semestre');
    this.moduleId = this.route.snapshot.paramMap.get('module');
    this.matiereId = this.route.snapshot.paramMap.get('matiere');
    this.loadEtudiants();
  }

  loadEtudiants() {
    this.http.get<any>(`http://localhost:8081/api/matiere/${this.matiereId}/notes`)
      .subscribe(
        (response) => {
          this.data = response;
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error fetching cours:', error);
        }
      );
  }

  navigateToMatieres() {
    this.router.navigate(['/prof/formation', this.formationId, 'semestre', this.semestreId, 'module', this.moduleId, 'matieres', 'list']);
  }

  openEditModal(note: Note) {
    this.selectedNote = note;
    this.updatedMark = note.valeur;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedNote = null;
    this.updatedMark = null;
  }

  updateNote() {
    if (this.selectedNote && this.updatedMark !== null) {
      this.http.put(`http://localhost:8081/api/note/${this.selectedNote.idNote}/update`, {
        valeur: this.updatedMark
      }).subscribe(
        () => {
          this.loadEtudiants();
          this.closeModal();
        },
        (error) => {
          console.error('Error updating note:', error);
        }
      );
    }
  }
}