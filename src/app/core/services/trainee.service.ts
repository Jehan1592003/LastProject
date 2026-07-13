import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';
import { MOCK_TRAINEES } from '../config/mock-data.config';
import { Trainee } from '../models/trainee.model';

@Injectable({
  providedIn: 'root'
})
export class  TraineeService {
    getAll():Observable<Trainee[]>{
        return of(MOCK_TRAINEES).pipe(delay(600));
    }
    getById(id:number):Observable<Trainee|null>{
        const trainee=MOCK_TRAINEES.find(trainee=>trainee.id===id);
        if(trainee){
           return of(trainee).pipe(delay(600)); 
        }else{
            return of(null).pipe(delay(600));
        } 
    }
    add(traineeData: Omit<Trainee, 'id'>): Observable<Trainee> {
     const maxId = MOCK_TRAINEES.length === 0
    ? 0
    : Math.max(...MOCK_TRAINEES.map(t => t.id));
    const nextId = maxId + 1;
    const newTrainee: Trainee = {
    ...traineeData,
    id: nextId
    };

  MOCK_TRAINEES.push(newTrainee);
  return of(newTrainee).pipe(delay(600));
    }
 
    update(id:number,traineeData:Partial<Omit<Trainee, 'id'> >):Observable<Trainee>{
        const index=MOCK_TRAINEES.findIndex(trainee=>trainee.id===id);
        if(index===-1){
            return throwError(() => new Error('المتدرب غير موجود'));
        }else{
            MOCK_TRAINEES[index]={
                ...MOCK_TRAINEES[index],
                ...traineeData
            }
            return of(MOCK_TRAINEES[index]).pipe(delay(600));
        }

    }
    delete(id:number):Observable<void>{
        const index=MOCK_TRAINEES.findIndex(trainee=>trainee.id===id);
        if(index===-1){
            return throwError(()=>new Error('المتدرب غير موجود'))
        }else{
            MOCK_TRAINEES.splice(index, 1);
            return of(void 0).pipe(delay(600));
        }
    }

}