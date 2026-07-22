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
import { InstructorService } from '../../../core/services/instructor.service';
import { Instructor } from '../../../core/models/instructor.model';
import { Trainee } from '../../../core/models/trainee.model';
import { TraineeService } from '../../../core/services/trainee.service';

@Component({
  selector: 'app-center-detail',
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
  templateUrl: './center-detail.html',
  styleUrl: './center-detail.scss',
})
export class CenterDetail implements OnInit {
  center!: Center;
  instructors: Instructor[] = [];
  trainees: Trainee[] = [];
  centerInstructors: Instructor[] = [];
  centerId!: number;
  isLoading = true;
  isSaving = false;

  centerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    city: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]),
    capacity: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    managerId: new FormControl<number | null>(null, [Validators.required]),
    status: new FormControl('', [Validators.required])
  });

  constructor(
    private route: ActivatedRoute,
    private centerService: CenterService,
    private instructorService: InstructorService,
    private router: Router,
    private traineeService: TraineeService
  ) {
    this.centerId = Number(this.route.snapshot.paramMap.get('id'));
    
    if (!this.centerId || isNaN(this.centerId)) {
      console.error('❌ Invalid center ID');
      this.isLoading = false;
      return;
    }
    
    this.loadData();
  }

  ngOnInit(): void {}

  private loadData(): void {
    this.isLoading = true;

    this.centerService.getById(this.centerId).subscribe({
      next: (center) => {
        if (center) {
          this.center = center;
          this.centerForm.patchValue({
            name: center.name,
            city: center.city,
            address: center.address,
            phone: center.phone,
            capacity: center.capacity,
            managerId: center.managerId,
            status: center.status
          });
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Error loading center:', err);
        this.isLoading = false;
      }
    });

    this.instructorService.getAll().subscribe(instructors => {
      this.instructors = instructors.filter(i => i.status === 'active');
    });

    this.traineeService.getAll().subscribe(trainees => {
      this.trainees = trainees.filter(t => t.centerId === this.centerId);
    });

    this.instructorService.getAll().subscribe(instructors => {
      this.centerInstructors = instructors.filter(i => i.centerId === this.centerId);
    });
  }

  onSubmit(): void {
    if (this.centerForm.valid) {
      this.isSaving = true;
      const formValue = this.centerForm.value as Partial<Center>;

      this.centerService.update(this.centerId, formValue).subscribe(() => {
        this.isSaving = false;
        this.router.navigate(['/centers']);
      });
    }
  }

  getManagerName(id: number): string {
    const instructor = this.instructors.find(i => i.id === id);
    return instructor ? instructor.name : 'غير معروف';
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }
}