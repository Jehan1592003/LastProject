import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Center } from '../../../core/models/center.model';
import { CenterService } from '../../../core/services/center.service';
import { InstructorService } from '../../../core/services/instructor.service';
import { TraineeService } from '../../../core/services/trainee.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-center-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './center-list.html',
  styleUrl: './center-list.scss',
})
export class CenterList implements OnInit {
  centersWithCounts: CenterWithCounts[] = [];

  constructor(
    private centerService: CenterService,
    private instructorService: InstructorService,
    private traineeService: TraineeService
  ) {}

  ngOnInit(): void {
    forkJoin({
      centers: this.centerService.getAll(),
      instructors: this.instructorService.getAll(),
      trainees: this.traineeService.getAll()
    }).subscribe(result => {
      this.centersWithCounts = result.centers.map(center => ({
        ...center,
        instructorCount: result.instructors.filter(i => i.centerId === center.id).length,
        traineeCount: result.trainees.filter(t => t.centerId === center.id).length
      }));
    });
  }
}

interface CenterWithCounts extends Center {
  instructorCount: number;
  traineeCount: number;
}