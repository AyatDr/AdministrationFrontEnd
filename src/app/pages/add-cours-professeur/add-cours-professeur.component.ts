import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-cours-professeur',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-cours-professeur.component.html',
  styleUrls: ['./add-cours-professeur.component.scss']
})
export class AddCoursProfesseurComponent implements OnInit {

  courseForm: FormGroup;
  formationId: string | null = null;
  semestreId: string | null = null;
  moduleId: string | null = null;
  matiereId: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.courseForm = this.fb.group({
      label: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.formationId = this.route.snapshot.paramMap.get('formation');
    this.semestreId = this.route.snapshot.paramMap.get('semestre');
    this.moduleId = this.route.snapshot.paramMap.get('module');
    this.matiereId = this.route.snapshot.paramMap.get('matiere');
  }

  onSubmit(): void {
    if (this.courseForm.valid) {

      const label = this.courseForm.get('label')?.value;

      this.http.post('http://localhost:8081/api/cours/create', {
        label: label,
        matiereId: this.matiereId
      })
        .subscribe({
          next: (response) => {
            console.log('Course created successfully', response);
            this.navigateToCours();
          },
          error: (error) => {
            console.error('Error creating course', error);
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