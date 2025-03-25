import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { tap } from 'rxjs';
import { User } from '../../model/user.interface';
import { ApiService } from '../services/api.service';

type UserState = {
  users: User[];
};

const initialState: UserState = {
  users: [],
};

export const UserStore = signalStore(
  withState(initialState),
  withMethods((store, apiService = inject(ApiService)) => ({
    loadUsers() {
      apiService
        .getUsers()
        .pipe(tap((users) => console.log('users loaded:', users)))
        .subscribe((users) => {
          patchState(store, (state) => ({
            ...state,
            users,
          }));
        });
    },

    clearState() {
      patchState(store, initialState);
    },
  })),
  withHooks({
    onInit({ loadUsers }) {
      loadUsers();
    },
  }),
  withComputed((store) => ({
    getUsers: computed(() => store.users()),
    getUserByIds: computed(() => (userId: number) => {
        return store.users().filter(user => user.id == userId)?.[0];
    }),
  }))
);
