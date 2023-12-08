import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { JeuxComponent } from './jeux/jeux.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HttpClientModule} from "@angular/common/http";
import { PaginationComponent } from './pagination/pagination.component';
import { CardComponent } from './card/card.component';
import { HeroComponent } from './hero/hero.component';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule } from '@angular/forms'


@NgModule({
  declarations: [
    AppComponent,
    JeuxComponent,
    HeaderComponent,
    FooterComponent,
    PaginationComponent,
    CardComponent,
    PaginationComponent,
    HeroComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
