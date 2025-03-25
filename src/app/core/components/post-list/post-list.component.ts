import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Post } from '../../../model/post.interface';
import { User } from '../../../model/user.interface';

@Component({
  selector: 'app-post-list',
  standalone: false,
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  users: User[] = [];
  selectedPost: { post: Post, user?: User } | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.apiService.getPostsWithUsers().subscribe(data => {
      this.posts = data.posts;
      this.users = data.users;
    });
  }

  getUserForPost(post: Post): User | undefined {
    return this.users.find(user => user.id === post.userId);
  }

  onPostSelected(data: { post: Post, user?: User }): void {
    this.selectedPost = this.selectedPost?.post.id === data.post.id ? null : data;
  }

  closeDetail(): void {
    this.selectedPost = null;
  }
}
