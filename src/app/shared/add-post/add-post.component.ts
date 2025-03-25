import { Component, OnInit, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '../../model/post.interface';
import { Router, RouterModule } from '@angular/router';
import { SnackbarService } from '../snackbar/snackbar.service';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-post.component.html'
})
export class AddPostComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackbar = inject(SnackbarService);
  
  // Output to emit the new post when the form is saved
  postAdded = output<Post>();
  
  // Reactive form
  postForm!: FormGroup;
  
  // Error handling
  formSubmitted = false;
  errorMessage: string | null = null;
  
  ngOnInit() {
    this.initForm();
  }
  
  // Initialize the form with validations
  private initForm(): void {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      body: ['', [Validators.required, Validators.minLength(10)]],
      userId: [1, Validators.required] // lo prenderei dall'utente autenticato
    });
  }
  
  // Getters
  get title() { return this.postForm.get('title'); }
  get body() { return this.postForm.get('body'); }
  
  isFieldInvalid(fieldName: string): boolean {
    const field = this.postForm.get(fieldName);
    return field ? (field.invalid && (field.touched || this.formSubmitted)) : false;
  }
  
  onSubmit(): void {
    this.formSubmitted = true;
    this.errorMessage = null;
    
    if (this.postForm.valid) {
      this.snackbar.showSuccess('Post saved successfully');
      this.goBack();
    } else {
      this.errorMessage = 'Please correct the errors in the form';
    }
  }

  goBack(): void {
    this.router.navigateByUrl('/posts');
  }
  
  // Reset the form
  resetForm(): void {
    this.postForm.reset({
      title: '',
      body: '',
      userId: 1
    });
    this.formSubmitted = false;
  }
}
