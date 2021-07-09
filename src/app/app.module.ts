import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HashLocationStrategy, LocationStrategy } from '@angular/common'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SidebarComponent } from './core/sidebar/sidebar.component'
import { HeaderComponent } from './core/header/header.component'
import { HttpClientModule } from '@angular/common/http'
import { MaterialModule } from './shared/material.module'
import { CartDialogComponent } from './core/cart-dialog/cart-dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    CartDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
