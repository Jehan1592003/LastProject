import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { InstructorService } from '../../../core/services/instructor.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Instructor } from '../../../core/models/instructor.model';
import { CenterService } from '../../../core/services/center.service';
import { Center } from '../../../core/models/center.model';

@Component({
  selector: 'app-instructor-detail',
  imports: [ReactiveFormsModule],
  templateUrl: './instructor-detail.html',
  styleUrl: './instructor-detail.scss',
})
export class InstructorDetail implements OnInit {
  centers:Center[]=[];
  instructorId!: number;
  constructor(
    private route:ActivatedRoute,
    private instructorService:InstructorService,
    private centerService:CenterService,
    private router:Router
  ){}
   instructorForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    email: new FormControl('', [Validators.required]),
    licenseNumber: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    centerId: new FormControl('', [Validators.required])
  });
 ngOnInit(): void {
  this.instructorId = Number(this.route.snapshot.paramMap.get('id'));
  
  this.instructorService.getById(this.instructorId).subscribe(instructor => {
    if (instructor) {
      this.instructorForm.patchValue({
        ...instructor,
        centerId: String(instructor.centerId)
      });
    }
  });

  this.centerService.getAll().subscribe(centers => {
    this.centers = centers;
  });
}
onSubmit(): void {
  if (this.instructorForm.valid) {
    const formValue = {
      ...this.instructorForm.value,
      centerId: Number(this.instructorForm.value.centerId)
    };
    
    this.instructorService.update(this.instructorId, formValue as Partial<Instructor>).subscribe(() => {
      this.router.navigate(['/instructors']);
    });
  }
}
}
