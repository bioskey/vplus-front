import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'new-travel',
        pathMatch: 'full'
    },
    {
        path: 'new-travel',
        loadChildren: () => import('./modules/new-travel/new-travel.module').then(m => m.NewTravelModule)
    },
    {
        path: 'travels',
        loadChildren: () => import('./modules/travels/travels.module').then(m => m.TravelsModule)
    },
    {
        path: 'list-of-bus',
        loadChildren: () => import('./modules/management/management.module').then(m => m.ManagementModule)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: 'programming',
        loadChildren: () => import('./modules/programming/programming.module').then(m => m.ProgrammingModule)
    },
    {
        path: 'bus-tracking',
        loadChildren: () => import('./modules/tracking/tracking.module').then(m => m.TrackingModule)
    }
];
