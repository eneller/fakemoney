import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { APIService } from '../../services/api';

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
    private api: APIService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    this.error = null;
    this.loading = true;

    this.api.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Login failed. Please try again.';
        this.loading = false;
      }
    });
  }
}

