import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../auth/core/token-storage.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenStorageService, private router: Router) { }

  canActivate(): boolean{
    const token = this.tokenService.getToken();
    if(!token){
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }

}
