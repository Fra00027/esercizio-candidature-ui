import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SnackbarData, SnackbarType } from './snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackbarSubject = new Subject<SnackbarData>();
  snackbar$ = this.snackbarSubject.asObservable();

  private show(message: string, type: SnackbarType, duration?: number) {
    this.snackbarSubject.next({ message, type, duration });
  }

  showInfo(message: string) {
    this.show(message, 'info', 3000);
  }

  showSuccess(message: string) {
    this.show(message, 'success', 3000);
  }

  showWarning(message: string) {
    this.show(message, 'warning', 3000);
  }

  showError(message: string) {
    // Gli errori non hanno duration, quindi rimarranno visibili fino alla chiusura manuale
    this.show(message, 'error');
  }

  showErrorForm(message: string) {
    this.showError(message);
  }
}