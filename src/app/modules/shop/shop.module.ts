import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ShopRoutingModule } from './shop-routing.module'
import { ShopComponent } from './shop.component'
import { HomeHeaderComponent } from './components/home-header/home-header.component'
import { FilterDialogComponent } from './components/filter-dialog/filter-dialog.component'
import { ScrollDirective } from './directives/scroll.directive'
import { PrintTableComponent } from './components/print-table/print-table.component'
import { FormsModule } from '@angular/forms'
import { MaterialModule } from 'src/app/shared/material.module'

@NgModule({
  declarations: [
    ShopComponent,
    HomeHeaderComponent,
    PrintTableComponent,
    FilterDialogComponent,
    ScrollDirective,
  ],
  imports: [CommonModule, ShopRoutingModule, MaterialModule, FormsModule],
})
export class ShopModule {}
