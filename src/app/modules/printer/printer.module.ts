import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PrinterRoutingModule } from './printer-routing.module'
import { PrinterComponent } from './printer.component'
import { SharedModule } from 'src/app/shared/shared.module'

@NgModule({
  declarations: [PrinterComponent],
  imports: [CommonModule, PrinterRoutingModule, SharedModule],
})
export class PrinterModule {}
