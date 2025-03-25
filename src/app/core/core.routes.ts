import { Routes } from '@angular/router';
import { CoreComponent } from './core.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { UserListComponent } from './components/user-list/user-list.component';

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