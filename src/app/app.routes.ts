import { Routes } from '@angular/router';
import { PostListComponent } from './shared/post-list/post-list.component';
import { PostDetailComponent } from './shared/post-detail/post-detail.component';

export const routes: Routes = [
    {
        path: '',
        component: PostListComponent
    },
    {
        path: 'post/:id',
        component: PostDetailComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];