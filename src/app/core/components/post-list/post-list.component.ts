import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Post } from '../../../model/post.interface';
import { User } from '../../../model/user.interface';
import { UserStore } from '../../store/user.store';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-post-list',
  standalone: false,
  templateUrl: './post-list.component.html',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('400ms ease-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class PostListComponent implements OnInit {
  readonly #userStore = inject(UserStore);
  @ViewChild('postContainer') postContainer?: ElementRef;

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
    this.postContainer?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    this.selectedPost = this.selectedPost?.post.id === data.post.id ? null : data;
  }

  closeDetail(): void {
    this.selectedPost = null;
  }
}
