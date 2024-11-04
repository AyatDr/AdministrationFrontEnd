import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface Cours {
  id: number;
  label: string;
}

interface CreateLienRequest {
  label: string;
  urlLien: string;
  coursId: string | null;
}

@Component({
  selector: 'app-add-lien-professeur',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-lien-professeur.component.html',
  styleUrl: './add-lien-professeur.component.scss'
})
export class AddLienProfesseurComponent implements OnInit {
  cours: Cours | null = null;
  courseForm: FormGroup;
  formationId: string | null = null;
  semestreId: string | null = null;
  moduleId: string | null = null;
  matiereId: string | null = null;
  coursId: string | null = null;

  private urlPattern = /^https?:\/\/.+/;

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    private route: ActivatedRoute, 
    private router: Router, 
    private cdr: ChangeDetectorRef
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.courseForm = this.fb.group({
      label: ['', [Validators.required, Validators.minLength(3)]],
      url: ['', [
        Validators.required, 
        Validators.pattern(this.urlPattern)
      ]]
    });
  }

  ngOnInit(): void {
    this.loadRouteParams();
    this.getCours();
  }

  private loadRouteParams(): void {
    this.formationId = this.route.snapshot.paramMap.get('formation');
    this.semestreId = this.route.snapshot.paramMap.get('semestre');
    this.moduleId = this.route.snapshot.paramMap.get('module');
    this.matiereId = this.route.snapshot.paramMap.get('matiere');
    this.coursId = this.route.snapshot.paramMap.get('cours');
  }

  getCours() {
    if (!this.coursId) {
      console.error('Course ID is missing');
      return;
    }

    this.http.get<Cours>(`http://localhost:8081/api/cours/${this.coursId}/get`)
      .subscribe({
        next: (response) => {
          this.cours = response;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching course:', error);
        }
      });
  }

  onSubmit(): void {
    if (this.courseForm.valid && this.coursId) {
      const formData = this.courseForm.value;
      
      const request: CreateLienRequest = {
        label: formData.label,
        urlLien: formData.url,
        coursId: this.coursId
      };
      
      this.http.post<any>('http://localhost:8081/api/lien/create', request)
        .subscribe({
          next: (response) => {
            console.log('Lien created successfully', response);
            this.navigateToCours();
          },
          error: (error) => {
            console.error('Error creating Lien:', error);
          }
        });
    } else {
      this.markFormAsTouched();
    }
  }

  private markFormAsTouched(): void {
    Object.values(this.courseForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  navigateToCours() {
    this.router.navigate([
      '/prof/formation', 
      this.formationId, 
      'semestre', 
      this.semestreId, 
      'module', 
      this.moduleId, 
      'matiere', 
      this.matiereId, 
      'cours', 
      this.coursId,
      'resources',
      'list'
    ]);
  }
}