import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule,DatePipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoanService } from '../../../core/services/loan.service';
import { Loan } from '../../../core/models/loan.model';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-loan-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, SpinnerComponent],
  templateUrl: './loan-detail.component.html',
  styleUrl: './loan-detail.component.scss'
})
export class LoanDetailComponent implements OnInit {
  loan: Loan | null = null;
  loading = true;
  actionLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private loanService: LoanService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loanService.getById(id).subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.loan = response.data;
          }
          this.loading = false;
          this.cdr.detectChanges()
        },
        error: () => { this.loading = false; }
      });
    }
  }

  submitLoan(): void {
    if (!this.loan) return;
    this.actionLoading = true;
    this.loanService.submit(this.loan.id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.loan = response.data;
          this.successMessage = 'Loan submitted successfully. Risk assessment complete.';
        }
        this.actionLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to submit loan.';
        this.actionLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  payLoan(): void {
    if (!this.loan) return;
    this.actionLoading = true;
    this.loanService.pay(this.loan.id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.loan = response.data;
          this.successMessage = 'Loan marked as paid successfully.';
        }
        this.actionLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to mark loan as paid.';
        this.actionLoading = false;
        this.cdr.detectChanges(); 
      }
    });
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      PENDING: 'status-pending',
      UNDER_REVIEW: 'status-review',
      APPROVED: 'status-approved',
      REJECTED: 'status-rejected',
      PAID: 'status-paid'
    };
    return map[status] || '';
  }
}