import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  errorMessage = '';
  constructor(
    private router:Router,
    private authService:AuthService
  ){}
   loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  onSubmit(){
    if(this.loginForm.valid){
      const { username, password } = this.loginForm.value;
      this.authService.login(username!,password!).subscribe(user=>{
        if(user){
         this.router.navigate(['/dashboard']);
        }else{
          this.errorMessage = 'اسم المستخدم أو كلمة السر غير صحيحة';
        }
      })

    }
  }

}
