import { Component, input, output } from '@angular/core';
import { User } from '../../model/user.interface';
import { CommonModule } from '@angular/common';
import { Post } from '../../model/post.interface';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-item.component.html',
})
export class PostItemComponent {
  post = input.required<Post>();
  user = input<User>()
  squareClicked = output<{post: Post, user?: User}>()

  // Get user initials for display in the colored square
  getUserInitials(): string {
    if (!this.user()) return '';
    const nameParts = this.user()?.name.split(' ') ?? [];
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return nameParts[0][0].toUpperCase();
  }

  // Generate a color based on user ID for consistent avatar colors
  getColorStyle(): { [klass: string]: any } {
    if (!this.user) return {};
    
    // Generate color based on user ID to keep it consistent for the same user
    const userId = this.user()?.id || 0;
    const hue = ((userId * 137.5) % 360); // Simple hash function to get a color
    const saturation = 75;
    const lightness = 60;
    
    return {
      'background-color': `hsl(${hue}, ${saturation}%, ${lightness}%)`
    };
  }

  onSquareClick(): void {
    this.squareClicked.emit({post: this.post(), user: this.user()});
  }
}
