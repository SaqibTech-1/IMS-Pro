import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import { TokenStorageService } from 'src/app/auth/core/token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate{
   
 constructor(private tokenStorage: TokenStorageService, private router: Router) {}

  canActivate(): boolean {
    if (this.tokenStorage.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }

}