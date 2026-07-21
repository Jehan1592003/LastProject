import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CenterService } from '../../../core/services/center.service';
import { Center } from '../../../core/models/center.model';
import { TraineeService } from '../../../core/services/trainee.service';
import { Trainee } from '../../../core/models/trainee.model';
import { InstructorService } from '../../../core/services/instructor.service';
import { Instructor } from '../../../core/models/instructor.model';

@Component({
  selector: 'app-trainee-detail',
  imports: [ReactiveFormsModule],
  templateUrl: './trainee-detail.html',
  styleUrl: './trainee-detail.scss',
})
export class TraineeDetail implements OnInit {
  centers: Center[] = [];
  instructors: Instructor[] = [];
  traineeId!: number;

  constructor(
    private route: ActivatedRoute,
    private traineeService: TraineeService,
    private centerService: CenterService,
    private instructorService: InstructorService,
    private router: Router
  ) {}

  traineeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    nationalId: new FormControl('', [Validators.required, Validators.minLength(9)]),
    instructorId: new FormControl('', [Validators.required]),
    centerId: new FormControl('', [Validators.required]),
    totalSessions: new FormControl('', [Validators.required, Validators.min(1), Validators.max(50)]),
    status: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.traineeId = Number(this.route.snapshot.paramMap.get('id'));

    this.traineeService.getById(this.traineeId).subscribe(trainee => {
  if (trainee) {
    this.traineeForm.patchValue({
      ...trainee,
      instructorId: String(trainee.instructorId),
      centerId: String(trainee.centerId),
      totalSessions: String(trainee.totalSessions)
    });
  }
});

    this.centerService.getAll().subscribe(centers => {
      this.centers = centers;
    });

    this.instructorService.getAll().subscribe(instructors => {
      this.instructors = instructors;
    });
  }

  onSubmit(): void {
  if (this.traineeForm.valid) {
    const formValue = {
      ...this.traineeForm.value,
      instructorId: Number(this.traineeForm.value.instructorId),
      centerId: Number(this.traineeForm.value.centerId),
      totalSessions: Number(this.traineeForm.value.totalSessions)
    };

    this.traineeService.update(this.traineeId, formValue as Partial<Trainee>).subscribe(() => {
      this.router.navigate(['/trainees']);
    });
  }
}
}
