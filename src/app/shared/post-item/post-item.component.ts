import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { User } from '../../model/user.interface';
import { CommonModule } from '@angular/common';
import { Post } from '../../model/post.interface';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-item.component.html'
})
export class PostItemComponent {
  post = input.required<Post>();
  user = input<User>();
  @Output() squareClicked = new EventEmitter<{post: Post, user?: User}>();

  // Get user initials for display in the colored square
  getUserInitials(): string {
    if (!this.user()) return '';
    const nameParts = this.user()?.name.split(' ') ?? 'non trovato';
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return nameParts[0][0].toUpperCase();
  }

  // Generate a random color based on user ID for the square
  getColorStyle(): { [klass: string]: any } {
    if (!this.user) return {};

    return {
      'background-color': `primary`
    };
  }

  onSquareClick() {
    this.squareClicked.emit({post: this.post(), user: this.user()});
  }
}
