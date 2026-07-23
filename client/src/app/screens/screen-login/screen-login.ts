import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { APIService } from '../../services/api';
import { GenericMessage } from '@message/Message';

@Component({
  selector: 'app-screen-login',
  imports: [FormsModule, NgbModule, ReactiveFormsModule, CommonModule],
  templateUrl: './screen-login.html',
  styleUrl: './screen-login.less',
})
export class ScreenLogin {
  loginForm: FormGroup;
  submitted = false;
  loading = signal(false);
  showPassword = false;
  error = signal<string|null>(null);

  constructor(
    private api: APIService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    this.error.set(null);
    this.loading.set(true)

    this.api.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      },
      error: (resp) => {
        let msg: GenericMessage = resp.error;
        this.error.set(msg.message || 'Login failed. Please try again.');
        this.loading.set(false);
      }
    });
  }
}

