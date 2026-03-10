 import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PageResponse } from '../models/api-response.model';
import { CreateLoanRequest, Loan, UpdateLoanRequest } from '../models/loan.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private apiUrl = window.location.hostname === 'localhost' 
  ? 'http://localhost:8080/api/loans'
  : 'https://loan-platform-production.up.railway.app/api/loans';

  constructor(private http: HttpClient) {}

  getAll(page = 0, size = 10): Observable<ApiResponse<PageResponse<Loan>>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<ApiResponse<PageResponse<Loan>>>(this.apiUrl, { params });
  }

  getById(id: string): Observable<ApiResponse<Loan>> {
    return this.http.get<ApiResponse<Loan>>(`${this.apiUrl}/${id}`);
  }

  create(request: CreateLoanRequest): Observable<ApiResponse<Loan>> {
    return this.http.post<ApiResponse<Loan>>(this.apiUrl, request);
  }

  update(id: string, request: UpdateLoanRequest): Observable<ApiResponse<Loan>> {
    return this.http.put<ApiResponse<Loan>>(`${this.apiUrl}/${id}`, request);
  }

  submit(id: string): Observable<ApiResponse<Loan>> {
    return this.http.post<ApiResponse<Loan>>(`${this.apiUrl}/${id}/submit`, {});
  }

  approve(id: string): Observable<ApiResponse<Loan>> {
    return this.http.post<ApiResponse<Loan>>(`${this.apiUrl}/${id}/approve`, {});
  }

  reject(id: string): Observable<ApiResponse<Loan>> {
    return this.http.post<ApiResponse<Loan>>(`${this.apiUrl}/${id}/reject`, {});
  }

  pay(id: string): Observable<ApiResponse<Loan>> {
    return this.http.post<ApiResponse<Loan>>(`${this.apiUrl}/${id}/pay`, {});
  }
}