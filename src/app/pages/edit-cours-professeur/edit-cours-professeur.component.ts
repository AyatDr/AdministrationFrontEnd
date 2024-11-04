import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-cours-professeur',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-cours-professeur.component.html',
  styleUrls: ['./edit-cours-professeur.component.scss']
})
export class EditCoursProfesseurComponent implements OnInit {

  courseForm: FormGroup;
  formationId: string | null = null;
  semestreId: string | null = null;
  moduleId: string | null = null;
  matiereId: string | null = null;
  coursId: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    private route: ActivatedRoute, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.courseForm = this.fb.group({
      label: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.formationId = this.route.snapshot.paramMap.get('formation');
    this.semestreId = this.route.snapshot.paramMap.get('semestre');
    this.moduleId = this.route.snapshot.paramMap.get('module');
    this.matiereId = this.route.snapshot.paramMap.get('matiere');
    this.coursId = this.route.snapshot.paramMap.get('cours');

    this.getCours();
  }

  getCours() {
    this.http.get<any>(`http://localhost:8081/api/cours/${this.coursId}/get`)
      .subscribe({
        next: (response) => {
          this.courseForm.patchValue({
            label: response.label
          });
          
          const labelControl = this.courseForm.get('label');
          if (labelControl) {
            labelControl.markAsTouched();
            labelControl.updateValueAndValidity();
          }
          
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching course', error);
        }
      });
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      const label = this.courseForm.get('label')?.value;
      this.http.put('http://localhost:8081/api/cours/update', {
        id: this.coursId,
        label: label
      })
        .subscribe({
          next: (response) => {
            console.log('Course updated successfully', response);
            this.navigateToCours();
          },
          error: (error) => {
            console.error('Error updating course', error);
          }
        });
    } else {
      console.log('Form is invalid');
    }
  }

  navigateToCours() {
    this.router.navigate(['/prof/formation', this.formationId, 'semestre', this.semestreId, 'module', this.moduleId, 'matiere', this.matiereId, 'cours', 'list']);
  }
}