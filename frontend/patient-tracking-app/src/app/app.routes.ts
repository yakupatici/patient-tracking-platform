import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PatientListComponent } from './pages/patient-list/patient-list.component';
import { PatientDetailComponent } from './pages/patient-detail/patient-detail.component';
import { PatientCreateComponent } from './pages/patient-create/patient-create.component';

export const routes: Routes = [
    // Home -> redirect to login
    { path: '', redirectTo: '/login', pathMatch: 'full' },

    // Login page
    { path: 'login', component: LoginComponent },

    // Register page
    { path: 'register', component: RegisterComponent },

    // Patient pages (requires authentication)
    {
        path: 'patients',
        component: PatientListComponent,
        canActivate: [authGuard]
    },
    {
        path: 'patients/new',
        component: PatientCreateComponent,
        canActivate: [authGuard]
    },
    {
        path: 'patients/:id',
        component: PatientDetailComponent,
        canActivate: [authGuard]
    },

    // Unknown pages -> redirect to login
    { path: '**', redirectTo: '/login' }
];
