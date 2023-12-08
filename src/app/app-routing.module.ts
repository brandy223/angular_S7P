import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {JeuxComponent} from "./jeux/jeux.component";

const routes: Routes = [
  { path: 'jeux', component: JeuxComponent },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }