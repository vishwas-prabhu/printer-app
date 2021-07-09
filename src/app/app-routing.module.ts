import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'printer',
    loadChildren: () =>
      import('./modules/printer/printer.module').then(m => m.PrinterModule),
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('./modules/shop/shop.module').then(m => m.ShopModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
