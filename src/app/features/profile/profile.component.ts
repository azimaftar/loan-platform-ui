import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { User, UpdateUserRequest } from '../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  request: UpdateUserRequest = {};
  loading = true;
  saving = false;
  successMessage = '';
  errorMessage = '';
  isEditing = false;

  constructor(private userService: UserService,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.userService.getMyProfile().subscribe({
      next: (response) => {
        console.log('Profile response:', response);
        if (response.success && response.data) {
          this.user = response.data;
          this.request = {
            username: this.user.username,
            profileInfo: this.user.profileInfo
          };
        }
        this.loading = false;
        this.cdr.detectChanges()
      },
      error: () => { this.loading = false; }
    });
  }
  onSave(): void {
    this.saving = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.userService.updateMyProfile(this.request).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.user = response.data;
          this.successMessage = 'Profile updated successfully.';
          this.isEditing = false;
        }
        this.saving = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to update profile.';
        this.saving = false;
      }
    });
  }
}