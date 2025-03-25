import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Post } from '../../../model/post.interface';
import { User } from '../../../model/user.interface';
import { UserStore } from '../../store/user.store';

@Component({
  selector: 'app-post-list',
  standalone: false,
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit {
  readonly #userStore = inject(UserStore);

  posts: Post[] = [];
  selectedPost: { post: Post, user?: User } | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.apiService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  getUserForPost(post: Post): User | undefined {
    return this.#userStore.getUserByIds()(post.userId);
  }

  onPostSelected(data: { post: Post, user?: User }): void {
    this.selectedPost = this.selectedPost?.post.id === data.post.id ? null : data;
  }

  closeDetail(): void {
    this.selectedPost = null;
  }
}
