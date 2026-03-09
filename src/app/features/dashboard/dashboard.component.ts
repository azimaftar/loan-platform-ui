import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoanService } from '../../core/services/loan.service';
import { Loan } from '../../core/models/loan.model';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, SpinnerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  username = '';
  recentLoans: Loan[] = [];
  totalLoans = 0;
  approvedLoans = 0;
  pendingLoans = 0;
  rejectedLoans = 0;
  loading = true;

  constructor(
    private authService: AuthService,
    private loanService: LoanService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.username = user?.username || '';

    this.loanService.getAll(0, 5).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.recentLoans = response.data.content;
          this.totalLoans = response.data.totalElements;
          this.approvedLoans = this.recentLoans.filter(l => l.status === 'APPROVED').length;
          this.pendingLoans = this.recentLoans.filter(l => l.status === 'PENDING').length;
          this.rejectedLoans = this.recentLoans.filter(l => l.status === 'REJECTED').length;
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
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