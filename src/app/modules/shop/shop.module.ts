import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ShopRoutingModule } from './shop-routing.module'
import { ShopComponent } from './shop.component'
import { FilterDialogComponent } from './components/filter-dialog/filter-dialog.component'
import { ScrollDirective } from './directives/scroll.directive'
import { FormsModule } from '@angular/forms'
import { MaterialModule } from 'src/app/shared/material.module'
import { ShopHeaderComponent } from './components/shop-header/shop-header.component'
import { ShopTableComponent } from './components/shop-table/shop-table.component'

@NgModule({
  declarations: [
    ShopComponent,
    FilterDialogComponent,
    ScrollDirective,
    ShopHeaderComponent,
    ShopTableComponent,
  ],
  imports: [CommonModule, ShopRoutingModule, MaterialModule, FormsModule],
})
export class ShopModule {}
