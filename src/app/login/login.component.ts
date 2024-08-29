import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/user-form']); // Redirect to UserFormComponent
        } else {
          alert('No token received.');
        }
      },
      error: (error) => {
        console.error('Login error', error);
        alert('Login failed. Please try again.');
      }
    });
  }
}
