import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Post } from '../../model/post.interface';
import { User } from '../../model/user.interface';
import { switchMap, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-detail.component.html'
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  user: User | null = null;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) {
          return of(null);
        }
        
        const postId = parseInt(id, 10);
        return this.apiService.getPost(postId).pipe(
          switchMap(post => {
            return forkJoin({
              post: of(post),
              user: this.apiService.getUser(post.userId)
            });
          })
        );
      })
    ).subscribe({
      next: (result) => {
        if (result) {
          this.post = result.post;
          this.user = result.user;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading post details:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  getUserInitials(): string {
    if (!this.user) return '';
    const nameParts = this.user.name.split(' ');
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return nameParts[0][0].toUpperCase();
  }

  // Generate a random color based on user ID for the square
  getColorStyle(): { [klass: string]: any } {
    if (!this.user) return {};
    
    // Generate color based on user ID to keep it consistent for the same user
    const hue = ((this.user.id * 137.5) % 360); // Simple hash function to get a color
    const saturation = 65;
    const lightness = 55;
    
    return {
      'background-color': `hsl(${hue}, ${saturation}%, ${lightness}%)`
    };
  }
}
