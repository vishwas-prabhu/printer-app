import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SidebarComponent } from './core/sidebar/sidebar.component'
import { MaterialModule } from './shared/material'
import { HeaderComponent } from './core/header/header.component'
import { PrinterComponent } from './views/printer/printer.component'
import { HomeComponent } from './views/home/home.component'
import { UserTableComponent } from './shared/components/user-table/user-table.component'
import { JobsTableComponent } from './shared/components/jobs-table/jobs-table.component'
import { PrintTableComponent } from './shared/components/print-table/print-table.component'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    PrinterComponent,
    HomeComponent,
    UserTableComponent,
    JobsTableComponent,
    PrintTableComponent,
  ],
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
