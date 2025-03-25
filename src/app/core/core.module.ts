import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreComponent } from './core.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { coreRoutes } from './core.routes';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostItemComponent } from '../shared/post-item/post-item.component';
import { ApiService } from './services/api.service';
import { UserStore } from './store/user.store';
import { PostStore } from './store/post.store';
import { UserListComponent } from './components/user-list/user-list.component';
import { SnackbarService } from '../shared/snackbar/snackbar.service';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';

@NgModule({
  declarations: [
    CoreComponent,
    NavbarComponent,
    PostListComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(coreRoutes),
    PostItemComponent,
    SnackbarComponent
],
  providers: [ApiService, UserStore, PostStore, SnackbarService]
})
export class CoreModule { }