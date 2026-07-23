import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TraineeService } from '../../../core/services/trainee.service';
import { InstructorService } from '../../../core/services/instructor.service';
import { CenterService } from '../../../core/services/center.service';
import { Instructor } from '../../../core/models/instructor.model';
import { Center } from '../../../core/models/center.model';
import { nationalIdValidator } from '../../../core/validators/national-id.validator';
import { Trainee } from '../../../core/models/trainee.model';

@Component({
  selector: 'app-trainee-add',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './trainee-add.html',
  styleUrl: './trainee-add.scss',
})
export class TraineeAdd {
  instructors: Instructor[] = [];
  centers: Center[] = [];
  isSaving = false;

  traineeForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]),
    nationalId: new FormControl('', [Validators.required, nationalIdValidator()]),
    instructorId: new FormControl<number | null>(null, [Validators.required]),
    centerId: new FormControl<number | null>(null, [Validators.required]),
    totalSessions: new FormControl<number | null>(null, [Validators.required, Validators.min(1), Validators.max(50)]),
    status: new FormControl('enrolled', [Validators.required])
  });

  constructor(
    private traineeService: TraineeService,
    private instructorService: InstructorService,
    private centerService: CenterService,
    private router: Router
  ) {
    this.instructorService.getAll().subscribe(instructors => {
      this.instructors = instructors.filter(i => i.status === 'active');
    });
    this.centerService.getAll().subscribe(centers => {
      this.centers = centers;
    });
  }

  onSubmit(): void {
  if (this.traineeForm.valid) {
    this.isSaving = true;
    const formValue = {
      ...this.traineeForm.value,
      enrollDate: new Date().toISOString().split('T')[0], // تاريخ اليوم
      sessionsCompleted: 0
    } as Omit<Trainee, 'id'>;

    this.traineeService.add(formValue).subscribe(() => {
      this.isSaving = false;
      this.router.navigate(['/trainees']);
    });
  }
}
}