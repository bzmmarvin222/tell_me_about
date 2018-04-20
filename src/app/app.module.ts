import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_LABEL_GLOBAL_OPTIONS, MatButtonModule, MatInputModule, MatListModule, MatToolbarModule} from '@angular/material';
import { TellMeComponent } from './components/tell-me/tell-me.component';
import {FormsModule} from '@angular/forms';
import { DescriptionComponent } from './components/tell-me/description/description.component';
import {AdjectiveService} from './services/adjective.service';


@NgModule({
  declarations: [
    AppComponent,
    TellMeComponent,
    DescriptionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatListModule
  ],
  providers: [
    {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}},
    AdjectiveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
