import { Component } from '@angular/core';
import { StatsService } from '../../core/services/stats.service';
import { AsyncPipe } from '@angular/common';
import { map, Observable } from 'rxjs';
import { DashboardStats } from '../../core/models/dashboard-stats.model';
import { InstructorService } from '../../core/services/instructor.service';
import { TraineeService } from '../../core/services/trainee.service';
import { Trainee } from '../../core/models/trainee.model';
import { Instructor } from '../../core/models/instructor.model';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  stats$!: Observable<DashboardStats>;
  recentTrainees$!: Observable<Trainee[]>;
  recentInstructors$!: Observable<Instructor[]>;

  constructor(
    private statsService: StatsService,
    private instructorService: InstructorService,
    private traineeService: TraineeService
  ) {
    this.stats$ = this.statsService.getDashboardStats();
    
    this.recentTrainees$ = this.traineeService.getAll().pipe(
      map(trainees => trainees.slice(-5))
    );
    
    this.recentInstructors$ = this.instructorService.getAll().pipe(
      map(instructors => instructors.slice(-5))
    );
  }
}
