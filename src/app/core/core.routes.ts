import { Routes } from '@angular/router';
import { CoreComponent } from './core.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AddPostComponent } from '../shared/add-post/add-post.component';

export const coreRoutes: Routes = [
    {
        path: '',
        component: CoreComponent,
        children: [
            {
                path: 'post-list',
                component: PostListComponent
            },
            {
                path: 'user-list',
                component: UserListComponent
            },
            {
                path: 'add-post',
                component: AddPostComponent
            },
            {
                path: '**',
                redirectTo: 'post-list'
            }
        ]
    },
    
    {
        path: '**',
        redirectTo: ''
    }
];