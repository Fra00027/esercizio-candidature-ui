import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarService } from './snackbar.service';
import { Subscription } from 'rxjs';

export type SnackbarType = 'info' | 'success' | 'warning' | 'error';

export interface SnackbarData {
  message: string;
  type: SnackbarType;
  duration?: number;
  id?: string;
}

interface ActiveSnackbar extends SnackbarData {
  id: string;
  visible: boolean;
}

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-14 right-4 z-50 w-full max-w-sm flex flex-col gap-2">
      <div 
        *ngFor="let snackbar of activeSnackbars"
        class="animate-slide-left"
        role="alert"
        [attr.aria-label]="snackbar.message">
        <div 
          class="alert shadow-lg" 
          [class.alert-info]="snackbar.type === 'info'"
          [class.alert-success]="snackbar.type === 'success'"
          [class.alert-warning]="snackbar.type === 'warning'"
          [class.alert-error]="snackbar.type === 'error'">
          <div class="flex items-center gap-2">
            <!-- Info Icon -->
            <i *ngIf="snackbar.type === 'info'" 
               class="fa-solid fa-circle-info"></i>
            
            <!-- Success Icon -->
            <i *ngIf="snackbar.type === 'success'" 
               class="fa-solid fa-circle-check"></i>
            
            <!-- Warning Icon -->
            <i *ngIf="snackbar.type === 'warning'" 
               class="fa-solid fa-triangle-exclamation"></i>
            
            <!-- Error Icon -->
            <i *ngIf="snackbar.type === 'error'" 
               class="fa-solid fa-circle-exclamation"></i>
            
            <span>{{ snackbar.message }}</span>
          </div>
          <div>
            <button 
              class="btn btn-circle btn-ghost btn-sm"
              (click)="hideSnackbar(snackbar.id)"
              aria-label="Chiudi notifica">
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-slide-left {
      animation: slideLeft 0.3s ease-out;
    }
    
    @keyframes slideLeft {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    :host {
      pointer-events: none;
    }

    .alert {
      pointer-events: auto;
    }
  `]
})
export class SnackbarComponent implements OnInit, OnDestroy {
  activeSnackbars: ActiveSnackbar[] = [];
  private subscription?: Subscription;
  private timeouts: Map<string, any> = new Map();
  private idCounter = 0;

  constructor(private snackbarService: SnackbarService) {}

  ngOnInit() {
    this.subscription = this.snackbarService.snackbar$.subscribe(data => {
      this.showSnackbar(data);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts.clear();
  }

  private generateId(): string {
    this.idCounter += 1;
    return `snackbar-${Date.now()}-${this.idCounter}`;
  }

  private showSnackbar(data: SnackbarData) {
    const id = this.generateId();
    const snackbar: ActiveSnackbar = {
      ...data,
      id,
      visible: true
    };

    this.activeSnackbars.push(snackbar);

    // Auto hide solo se non è un errore e c'è una duration
    if (data.type !== 'error' && data.duration) {
      const timeout = setTimeout(() => {
        this.hideSnackbar(id);
      }, data.duration);
      
      this.timeouts.set(id, timeout);
    }
  }

  hideSnackbar(id: string) {
    const timeout = this.timeouts.get(id);
    if (timeout) {
      clearTimeout(timeout);
      this.timeouts.delete(id);
    }
    
    this.activeSnackbars = this.activeSnackbars.filter(s => s.id !== id);
  }
}
