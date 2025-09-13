import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  submitted = false;
  loginError: string = '';
  loginSuccess: string = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      UserName: ['', [Validators.required, Validators.minLength(3)]],
      Password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

 onSubmit(): void {
  this.submitted = true;
  this.loginError = '';
  this.loginSuccess = '';
  this.loginForm.markAllAsTouched();

  if (this.loginForm.invalid) return;

  this.loading = true;

  this.authService.login(this.loginForm.value).subscribe({
    next: () => {
      this.loading = false;
      this.loginSuccess = 'Login successful 🎉';

      setTimeout(() => {
        this.router.navigate(['/layout']);
      }, 1000);
    },
    error: err => {
      this.loading = false;
      this.loginError = err.error?.message || 'Login failed. Check your credentials.';
    }
  });
}
}
