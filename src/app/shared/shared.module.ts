import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserTableComponent } from './components/user-table/user-table.component'
import { JobsTableComponent } from './components/jobs-table/jobs-table.component'
import { PrintTableComponent } from './components/print-table/print-table.component'
import { MaterialModule } from './material.module'
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component'

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [
    UserTableComponent,
    JobsTableComponent,
    PrintTableComponent,
    ConfirmDialogComponent,
  ],
  exports: [
    UserTableComponent,
    JobsTableComponent,
    PrintTableComponent,
    MaterialModule,
    ConfirmDialogComponent,
  ],
})
export class SharedModule {}
