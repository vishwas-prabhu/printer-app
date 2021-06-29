import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './views/home/home.component'
import { PrinterComponent } from './views/printer/printer.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/printer',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'printer',
    component: PrinterComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
