import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SidebarComponent } from './core/sidebar/sidebar.component'
import { HeaderComponent } from './core/header/header.component'
import { HttpClientModule } from '@angular/common/http'
import { MaterialModule } from './shared/material.module'

@NgModule({
  declarations: [AppComponent, SidebarComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
