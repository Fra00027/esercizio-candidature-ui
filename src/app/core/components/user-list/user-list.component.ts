import { Component, inject } from '@angular/core';
import { UserStore } from '../../store/user.store';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  readonly userStore = inject(UserStore);
  
  // Access users directly from the store as a signal
  readonly users = this.userStore.users;
}
