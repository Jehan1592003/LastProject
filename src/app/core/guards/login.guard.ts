import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const loginGuard:CanActivateFn = (route,state)=> {
    const router =inject(Router);
    const authService=inject(AuthService);
    if(!authService.isLoggedIn()){
        return true;
    }else{
        return router.parseUrl('/dashboard');
    }
}