import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HashLocationStrategy, LocationStrategy } from '@angular/common'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { MaterialModule } from './shared/material.module'
import { CartDialogComponent } from './core/cart-dialog/cart-dialog.component'
import { HttpInterceptorFiles } from './core/interceptor'

@NgModule({
  declarations: [AppComponent, CartDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [
    HttpInterceptorFiles,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
