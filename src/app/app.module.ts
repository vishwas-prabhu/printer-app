import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { MaterialModule } from './shared/material'
import { HeaderComponent } from './components/header/header.component'
import { PrinterComponent } from './components/printer/printer.component'
import { HomeComponent } from './components/home/home.component'
import { UserTableComponent } from './components/tables/user-table/user-table.component'
import { JobsTableComponent } from './components/tables/jobs-table/jobs-table.component'
import { PrintTableComponent } from './components/tables/print-table/print-table.component'
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
