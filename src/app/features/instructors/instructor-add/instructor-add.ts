import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InstructorService } from '../../../core/services/instructor.service';
import { CenterService } from '../../../core/services/center.service';
import { Instructor } from '../../../core/models/instructor.model';
import { Center } from '../../../core/models/center.model';

@Component({
  selector: 'app-instructor-add',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './instructor-add.html',
  styleUrl: './instructor-add.scss',
})
export class InstructorAdd {
  centers: Center[] = [];
  isSaving = false;

  instructorForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]),
    licenseNumber: new FormControl('', [Validators.required]),
    centerId: new FormControl<number | null>(null, [Validators.required]),
    status: new FormControl('active', [Validators.required])
  });

  constructor(
    private instructorService: InstructorService,
    private centerService: CenterService,
    private router: Router
  ) {
    this.centerService.getAll().subscribe(centers => {
      this.centers = centers;
    });
  }

  onSubmit(): void {
    if (this.instructorForm.valid) {
      this.isSaving = true;
      const formValue = this.instructorForm.value as Omit<Instructor, 'id'>;

      this.instructorService.add(formValue).subscribe(() => {
        this.isSaving = false;
        this.router.navigate(['/instructors']);
      });
    }
  }
}
