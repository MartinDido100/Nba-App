import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbaGuard } from './nba/guards/nba.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'nba',
    loadChildren: ()=> import('./nba/nba.module').then( m => m.NbaModule ),
    canLoad: [NbaGuard],
    canActivate: [NbaGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
