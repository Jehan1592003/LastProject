import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CenterService } from '../../../core/services/center.service';
import { Center } from '../../../core/models/center.model';
import { TraineeService } from '../../../core/services/trainee.service';
import { Trainee } from '../../../core/models/trainee.model';
import { InstructorService } from '../../../core/services/instructor.service';
import { Instructor } from '../../../core/models/instructor.model';
import { nationalIdValidator } from '../../../core/validators/national-id.validator';

@Component({
  selector: 'app-trainee-detail',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './trainee-detail.html',
  styleUrl: './trainee-detail.scss',
})
export class TraineeDetail implements OnInit {
  centers: Center[] = [];
  instructors: Instructor[] = [];
  traineeId!: number;
  isLoading = true;
  isSaving = false;

  traineeForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]),
    nationalId: new FormControl('', [Validators.required, nationalIdValidator()]),
    instructorId: new FormControl<number | null>(null, [Validators.required]),
    centerId: new FormControl<number | null>(null, [Validators.required]),
    totalSessions: new FormControl<number | null>(null, [Validators.required, Validators.min(1), Validators.max(50)]),
    status: new FormControl('', [Validators.required])
  });

  constructor(
    private route: ActivatedRoute,
    private traineeService: TraineeService,
    private centerService: CenterService,
    private instructorService: InstructorService,
    private router: Router
  ) {
    this.traineeId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('🔥 CONSTRUCTOR — ID:', this.traineeId);
    
    if (!this.traineeId || isNaN(this.traineeId)) {
      console.error('❌ Invalid ID');
      this.isLoading = false;
      return;
    }
    
    this.loadData();
  }

  ngOnInit(): void {
    console.log('🔥 NGONINIT');
  }

  private loadData(): void {
    console.log('🔥 LOADDATA START');
    this.isLoading = true;

    this.traineeService.getById(this.traineeId).subscribe({
      next: (trainee) => {
        console.log('✅ TRAINEE LOADED:', trainee);
        if (trainee) {
          this.traineeForm.patchValue({
            name: trainee.name,
            email: trainee.email,
            phone: trainee.phone,
            nationalId: trainee.nationalId,
            instructorId: trainee.instructorId,
            centerId: trainee.centerId,
            totalSessions: trainee.totalSessions,
            status: trainee.status
          });
        }
        this.isLoading = false;
        console.log('✅ LOADING STOPPED');
      },
      error: (err) => {
        console.error('❌ ERROR:', err);
        this.isLoading = false;
      }
    });

    this.centerService.getAll().subscribe(centers => {
      console.log('✅ CENTERS:', centers.length);
      this.centers = centers;
    });

    this.instructorService.getAll().subscribe(instructors => {
      console.log('✅ INSTRUCTORS:', instructors.length);
      this.instructors = instructors.filter(i => i.status === 'active');
    });
  }

  onSubmit(): void {
    if (this.traineeForm.valid) {
      this.isSaving = true;
      const formValue = this.traineeForm.value as Partial<Trainee>;

      this.traineeService.update(this.traineeId, formValue).subscribe(() => {
        this.isSaving = false;
        this.router.navigate(['/trainees']);
      });
    }
  }

  getInstructorName(id: number): string {
    const instructor = this.instructors.find(i => i.id === id);
    return instructor ? instructor.name : 'غير معروف';
  }

  getCenterName(id: number): string {
    const center = this.centers.find(c => c.id === id);
    return center ? center.name : 'غير معروف';
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'enrolled': return 'bg-amber-100 text-amber-700';
      case 'passed': return 'bg-emerald-100 text-emerald-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }
}
