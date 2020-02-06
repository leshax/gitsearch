import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SuggestboxComponent } from './suggestbox/suggestbox.component';

@NgModule({
  declarations: [
    AppComponent,
    SuggestboxComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
