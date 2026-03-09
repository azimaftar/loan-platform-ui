import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoanService } from '../../../core/services/loan.service';
import { Loan } from '../../../core/models/loan.model';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-loan-list',
  standalone: true,
  imports: [CommonModule, RouterLink, SpinnerComponent],
  templateUrl: './loan-list.component.html',
  styleUrl: './loan-list.component.scss'
})
export class LoanListComponent implements OnInit {
  loans: Loan[] = [];
  totalPages = 0;
  currentPage = 0;
  loading = true;

  constructor(private loanService: LoanService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.loading = true;
    this.loanService.getAll(this.currentPage).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.loans = response.data.content;
          this.totalPages = response.data.totalPages;
        }
        this.loading = false;
        this.cdr.detectChanges()
      },
      error: () => { this.loading = false; }
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadLoans();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadLoans();
    }
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