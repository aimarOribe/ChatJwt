import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SessionStorageConstants } from '../utils/session.storage';

@Injectable({
  providedIn: 'root'
})

export class LoginGuard {

  constructor(
    private readonly router: Router,
    private authService: AuthService
  ){}

  canActivate(): boolean{
    const checkSession = this.authService.readFromSession(SessionStorageConstants.USER_TOKEN);
    console.log(checkSession);
    if(checkSession.user.id !== 0){
      this.router.navigate([""]);
      return false;
    }
    return true;
  }

};