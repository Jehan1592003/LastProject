import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../core/services/auth.service';
import { nameValidator } from '../../core/validators/name.validator';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  user: any;
  isEditing = false;
  isSaving = false;

  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required, nameValidator()]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if (this.user) {
      this.profileForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        username: this.user.username,
        role: this.user.role
      });
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing && this.user) {
      this.profileForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        username: this.user.username,
        role: this.user.role
      });
    }
  }

  onSave(): void {
    if (this.profileForm.valid) {
      this.isSaving = true;
      setTimeout(() => {
        this.isSaving = false;
        this.isEditing = false;
        this.user = { ...this.user, ...this.profileForm.value };
      }, 600);
    }
  }
}
