import { Injectable } from '@angular/core';
import { delay, Observable, of, retry, throwError } from 'rxjs';
import { Instructor } from '../models/instructor.model';
import { MOCK_INSTRUCTORS } from '../config/mock-data.config';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
    getAll():Observable<Instructor[]>{
        return of(MOCK_INSTRUCTORS).pipe(delay(600));
    }
    getById(id:number):Observable<Instructor|null>{
        const instructor=MOCK_INSTRUCTORS.find(instructor=>instructor.id===id);
        if(instructor){
           return of(instructor).pipe(delay(600)); 
        }else{
            return of(null).pipe(delay(600));
        } 
    }
    add(instructorData:Omit<Instructor, 'id'>):Observable<Instructor>{
        const ids=MOCK_INSTRUCTORS.map(instructor=>instructor.id);
        const maxId=Math.max(...ids);
        const nextId=maxId+1;
        const newInstructor:Instructor={
            ...instructorData,
            id:nextId
        }
        MOCK_INSTRUCTORS.push(newInstructor);
        return of(newInstructor).pipe(delay(600));
    }
   update(id: number, instructorData: Partial<Omit<Instructor, 'id'>>): Observable<Instructor> {
  const index = MOCK_INSTRUCTORS.findIndex(instructor => instructor.id === id);
  if (index === -1) {
    return throwError(() => new Error('المدرب غير موجود'));
  } else {
    MOCK_INSTRUCTORS[index] = {
      ...MOCK_INSTRUCTORS[index],
      ...instructorData
    };
    return of(MOCK_INSTRUCTORS[index]).pipe(delay(600));
  }
}
    delete(id:number):Observable<void>{
        const index=MOCK_INSTRUCTORS.findIndex(instructor=>instructor.id===id);
        if(index===-1){
            return throwError(()=>new Error('المدرب غير موجود'))
        }else{
            MOCK_INSTRUCTORS.splice(index, 1);
            return of(void 0).pipe(delay(600));
        }
    }

}