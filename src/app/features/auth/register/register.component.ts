import { Component, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterRequest } from '../../../core/models/auth.model';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  request: RegisterRequest = { username: '', email: '', password: '' };
  errorMessage = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router,private cdr: ChangeDetectorRef) { }

  onSubmit(): void {
    this.loading = true;
    this.errorMessage = '';

    this.authService.register(this.request).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.router.navigate(['/dashboard']);
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
        this.loading = false;
        this.cdr.detectChanges(); 
      }
    });
  }
}