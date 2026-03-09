export interface Loan {
  id: string;
  userId: string;
  username: string;
  amount: number;
  purpose: string;
  status: LoanStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type LoanStatus =
  | 'PENDING'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'PAID';

export interface CreateLoanRequest {
  amount: number;
  purpose: string;
}

export interface UpdateLoanRequest {
  amount?: number;
  purpose?: string;
}   