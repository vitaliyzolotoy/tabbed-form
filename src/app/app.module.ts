import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { formReducer } from './app.reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ form: formReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
