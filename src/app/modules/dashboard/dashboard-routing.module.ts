import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './dashboard.component'

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'printer',
        loadChildren: () =>
          import('../printer/printer.module').then(m => m.PrinterModule),
      },
      {
        path: 'shop',
        loadChildren: () =>
          import('../shop/shop.module').then(m => m.ShopModule),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
