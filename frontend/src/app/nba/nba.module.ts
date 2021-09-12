import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbaRoutingModule } from './nba-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AddPlayerComponent } from './pages/add-player/add-player.component';
import { FavouritesComponent } from './pages/favourites/favourites.component';
import { CardComponent } from './components/card/card.component';
import { SharedModule } from '../shared/shared.module';
import { PlayersListComponent } from './pages/players-list/players-list.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    HomeComponent,
    AdminComponent,
    AddPlayerComponent,
    FavouritesComponent,
    CardComponent,
    PlayersListComponent,
  ],
  imports: [
    CommonModule,
    NbaRoutingModule,
    SharedModule,
    MatIconModule
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class NbaModule { }
