import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

// Login sayfası
import { LoginComponent } from './pages/login/login.component';
// Kayıt sayfası
import { RegisterComponent } from './pages/register/register.component';
// Hasta listesi
import { PatientListComponent } from './pages/patient-list/patient-list.component';
// Hasta detayı
import { PatientDetailComponent } from './pages/patient-detail/patient-detail.component';
// Yeni hasta ekleme
import { PatientCreateComponent } from './pages/patient-create/patient-create.component';

export const routes: Routes = [
    // Ana sayfa -> login'e yönlendir
    { path: '', redirectTo: '/login', pathMatch: 'full' },

    // Giriş sayfası
    { path: 'login', component: LoginComponent },

    // Kayıt sayfası
    { path: 'register', component: RegisterComponent },

    // Hasta sayfaları (giriş yapmış olmalı)
    {
        path: 'patients',
        component: PatientListComponent,
        canActivate: [authGuard]  // Giriş kontrolü
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

    // Bilinmeyen sayfalar -> login'e yönlendir
    { path: '**', redirectTo: '/login' }
];
