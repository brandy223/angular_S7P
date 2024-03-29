import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {JeuxComponent} from "./jeux/jeux.component";
import {HeroComponent} from "./hero/hero.component";
import {AboutComponent} from "./about/about.component";
import {JeuxDetailsComponent} from "./jeux-details/jeux-details.component";
import {PlatformsComponent} from "./platforms/platforms.component";

const routes: Routes = [
  {path: 'jeux', component: JeuxComponent},
  {path: 'platforms', component: PlatformsComponent},
  {path: 'jeux/:id', component: JeuxDetailsComponent },
  {path: 'accueil', component: HeroComponent},
  {path: 'about', component: AboutComponent},
  {path: '', redirectTo: '/accueil', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
