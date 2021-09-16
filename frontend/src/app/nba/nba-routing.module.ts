import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FavouritesComponent } from './pages/favourites/favourites.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AddPlayerComponent } from './pages/add-player/add-player.component';
import { PlayersListComponent } from './pages/players-list/players-list.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path:'', component: PlayersListComponent },
      { path:'favourites', component: FavouritesComponent },
      { path:'admin', component: AdminComponent, canActivate: [AdminGuard] },
      { path:'add', component: AddPlayerComponent }
    ]
  },
  { path:'**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NbaRoutingModule { }
