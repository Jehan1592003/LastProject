import { Injectable } from '@angular/core';
import { TraineeService } from './trainee.service';
import { CenterService } from './center.service';
import { forkJoin, map, Observable } from 'rxjs';
import { DashboardStats } from '../models/dashboard-stats.model';
import { InstructorService } from './instructor.service';

@Injectable({
  providedIn: 'root'
})

export class  StatsService {
    constructor(
     private instructorService: InstructorService,
     private traineeService: TraineeService,
     private centerService: CenterService
    ){}
    getDashboardStats():Observable<DashboardStats>{
      return forkJoin({
        instructors: this.instructorService.getAll(),
        trainees: this.traineeService.getAll(),
        centers: this.centerService.getAll()
      }).pipe(map(result=>{
        return{
        totalInstructors: result.instructors.length,
        totalTrainees: result.trainees.length,
        totalCenters:result.centers.length};
       }));
}
}