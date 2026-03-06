import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-screen-login',
  imports: [FormsModule, NgbModule, ReactiveFormsModule, CommonModule],
  templateUrl: './screen-login.html',
  styleUrl: './screen-login.less',
})
export class ScreenLogin {
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  showPassword = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.error = null;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const { email, password, rememberMe } = this.loginForm.value;

    /*
    this.authService.login(email, password, rememberMe).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']); // Redirect after login
      },
      error: (err) => {
        this.error = err.error?.message || 'Login failed. Please try again.';
        this.loading = false;
      }
    });
  */
  }
}

