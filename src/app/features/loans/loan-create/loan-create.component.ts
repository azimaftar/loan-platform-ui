import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoanService } from '../../../core/services/loan.service';
import { CreateLoanRequest } from '../../../core/models/loan.model';

@Component({
  selector: 'app-loan-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './loan-create.component.html',
  styleUrl: './loan-create.component.scss'
})
export class LoanCreateComponent {
  request: CreateLoanRequest = { amount: 0, purpose: '' };
  errorMessage = '';
  loading = false;

  constructor(private loanService: LoanService, private router: Router) {}

  onSubmit(): void {
    this.loading = true;
    this.errorMessage = '';

    this.loanService.create(this.request).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.router.navigate(['/loans', response.data.id]);
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to create loan.';
        this.loading = false;
      },
      complete: () => { this.loading = false; }
    });
  }
}