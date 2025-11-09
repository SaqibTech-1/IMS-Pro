import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/app/environment';
import { Router } from '@angular/router';
import { Credentials } from '../Interfaces/auth.interface';
import { TokenStorageService } from './token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = environment.apiBaseUrl;
 
  constructor(
    private http: HttpClient,
    private router: Router,
    private TokenStorage: TokenStorageService
  ) {}

  login(credentials: Credentials): Observable<void> {
    return this.http
      .post<{ success: boolean; token: string; userName: string; role: string; expiresInMinutes: number }>(
        `${this.baseUrl}/Auth/Login`,
        credentials
      )
      .pipe(
        tap(res => {
          // ✅ Save token & user directly from response
          this.TokenStorage.saveToken(res.token);
          this.TokenStorage.saveUser({
            userName: res.userName,
            role: res.role,
            expiresInMinutes: res.expiresInMinutes
          });
        }),
        map(() => {})
      );
  }

  logout(): void {
    this.TokenStorage.signOut();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.TokenStorage.isAuthenticated();
  }
 
}
