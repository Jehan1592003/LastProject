import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { MOCK_USERS } from '../config/mock-data.config';
import { O } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 login(username:string , password: string):Observable<User | null>{
  const user=MOCK_USERS.find(user=>user.username===username&&user.password===password);
  if (user){
  localStorage.setItem('token', JSON.stringify(user));
  return of(user).pipe(delay(600));
  }else{
  return of(null).pipe(delay(600));
  }
 }
 logout():Observable<void>{
  localStorage.removeItem('token');
  return of(undefined).pipe(delay(600));
 }
 isLoggedIn():boolean{
  if(localStorage.getItem('token')){
    return true;
  } else{
    return false;
  } 
 }
 getToken():string|null{
  return localStorage.getItem('token');
 }
}