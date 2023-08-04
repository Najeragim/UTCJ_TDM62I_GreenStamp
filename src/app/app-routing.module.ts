import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'loader',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'recover',
    loadChildren: () => import('./recover/recover.module').then( m => m.RecoverPageModule)
  },
  {
    path: 'tabnav-admin',
    loadChildren: () => import('./admin-view/tabnav-admin/tabnav-admin.module').then( m => m.TabnavAdminPageModule)
  },
  {
    path: 'alumno',
    loadChildren: () => import('./alumno/alumno.module').then( m => m.AlumnoPageModule)
  },
  {
    path: 'tabnav-alumno',
    loadChildren: () => import('./alumno/tabnav-alumno/tabnav-alumno.module').then( m => m.TabnavAlumnoPageModule)
  },

  {
    path: 'loader',
    loadChildren: () => import('./loader/loader.module').then( m => m.LoaderPageModule)
  },
  {
    path: 'tabnav-tutor',
    loadChildren: () => import('./tutor-view/tabnav-tutor/tabnav-tutor.module').then( m => m.TabnavTutorPageModule)
  },
  {
    path: 'listas',
    loadChildren: () => import('./tutor-view/listas/listas.module').then( m => m.ListasPageModule)
  },
  {
    path: 'clases',
    loadChildren: () => import('./tutor-view/clases/clases.module').then( m => m.ClasesPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
