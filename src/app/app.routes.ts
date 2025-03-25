import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'core',
        loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
    },
    {
        path: '**',
        redirectTo: '/core'
    }
];