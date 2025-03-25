import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../../model/post.interface';

interface PostFilters {
  userId?: number;
  titleSearch?: string;
  bodySearch?: string;
}

// Store usato solo per i Filtri
@Injectable()
export class PostStore {
  #posts = new BehaviorSubject<Post[]>([]);
  #filters = new BehaviorSubject<PostFilters>({});
  
  // Getter per tutti i post non filtrati
  get posts$(): Observable<Post[]> {
    return this.#posts.asObservable();
  }
  
  // Getter per i filtri correnti
  get filters$(): Observable<PostFilters> {
    return this.#filters.asObservable();
  }
  
  // Getter per i post filtrati
  get filteredPosts$(): Observable<Post[]> {
    return new Observable<Post[]>(observer => {
      this.#posts.subscribe(posts => {
        observer.next(this.applyFilters(posts, this.#filters.value));
      });
      
      this.#filters.subscribe(filters => {
        observer.next(this.applyFilters(this.#posts.value, filters));
      });
    });
  }
  
  // Setter per i post
  setPosts(posts: Post[]): void {
    this.#posts.next(posts);
  }
  
  // Metodi per impostare i filtri
  setUserIdFilter(userId: number | null): void {
    const currentFilters = this.#filters.value;
    this.#filters.next({
      ...currentFilters,
      userId: userId || undefined
    });
  }
  
  setTitleSearchFilter(search: string): void {
    const currentFilters = this.#filters.value;
    this.#filters.next({
      ...currentFilters,
      titleSearch: search || undefined
    });
  }
  
  setBodySearchFilter(search: string): void {
    const currentFilters = this.#filters.value;
    this.#filters.next({
      ...currentFilters,
      bodySearch: search || undefined
    });
  }
  
  clearFilters(): void {
    this.#filters.next({});
  }
  
  // Metodo privato per applicare i filtri
  private applyFilters(posts: Post[], filters: PostFilters): Post[] {
    if (!filters || Object.keys(filters).length === 0) {
      return posts;
    }
    
    return posts.filter(post => {
      // Filtro per userId
      if (filters.userId !== undefined && post.userId !== filters.userId) {
        return false;
      }
      
      // Filtro per ricerca nel titolo
      if (filters.titleSearch && !post.title.toLowerCase().includes(filters.titleSearch.toLowerCase())) {
        return false;
      }
      
      // Filtro per ricerca nel corpo
      if (filters.bodySearch && !post.body.toLowerCase().includes(filters.bodySearch.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }
}
