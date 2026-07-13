import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';
import { Center } from '../models/center.model';
import { MOCK_CENTERS } from '../config/mock-data.config';
@Injectable({
  providedIn: 'root'
})
export class CenterService {
    getAll():Observable<Center[]>{
        return of(MOCK_CENTERS).pipe(delay(600));
    }
    getById(id:number):Observable<Center|null>{
        const center=MOCK_CENTERS.find(center=>center.id===id);
        if(center){
           return of(center).pipe(delay(600)); 
        }else{
            return of(null).pipe(delay(600));
        } 
    }
    update(id:number,centerData:Partial<Omit<Center, 'id'> >):Observable<Center>{
        const index=MOCK_CENTERS.findIndex(center=>center.id===id);
        if(index===-1){
            return throwError(() => new Error('المركز غير موجود'));
        }else{
            MOCK_CENTERS[index]={
                ...MOCK_CENTERS[index],
                ...centerData
            }
            return of(MOCK_CENTERS[index]).pipe(delay(600));
        }

    }
}