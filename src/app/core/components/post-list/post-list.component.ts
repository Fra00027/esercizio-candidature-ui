import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Post } from '../../../model/post.interface';
import { User } from '../../../model/user.interface';
import { UserStore } from '../../store/user.store';
import { PostStore } from '../../store/post.store';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  readonly users = this.#userStore.getUsers;
  readonly #postStore = inject(PostStore);
  @ViewChild('postContainer') postContainer?: ElementRef;

  posts: Post[] = [];
  selectedPost: { post: Post, user?: User } | null = null;
  filterForm: FormGroup;
  filteredPostCount = 0;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      titleSearch: [''],
      bodySearch: [''],
      userId: [null]
    });
  }

  ngOnInit(): void {
    this.loadPosts();
    
    // sottoscrivi le modifiche
    this.#postStore.filteredPosts$.subscribe(posts => {
      this.posts = posts;
      this.filteredPostCount = posts.length;
    });
    
    // applica filtri
    this.filterForm.valueChanges.subscribe(filters => {
      this.applyFilters(filters);
    });
  }

  loadPosts(): void {
    this.apiService.getPosts().subscribe(posts => {
      this.#postStore.setPosts(posts);
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
  
  applyFilters(filters: any): void {
    if (filters.titleSearch !== undefined) {
      this.#postStore.setTitleSearchFilter(filters.titleSearch);
    }
    
    if (filters.bodySearch !== undefined) {
      this.#postStore.setBodySearchFilter(filters.bodySearch);
    }
    
    if (filters.userId !== undefined) {
      this.#postStore.setUserIdFilter(filters.userId);
    }
  }
  
  clearFilters(): void {
    this.filterForm.reset({
      titleSearch: '',
      bodySearch: '',
      userId: null
    });
    this.#postStore.clearFilters();
  }
}
