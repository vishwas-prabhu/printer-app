import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserTableComponent } from './components/user-table/user-table.component'
import { JobsTableComponent } from './components/jobs-table/jobs-table.component'
import { PrintTableComponent } from './components/print-table/print-table.component'
import { MaterialModule } from './material.module'

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [UserTableComponent, JobsTableComponent, PrintTableComponent],
  exports: [
    UserTableComponent,
    JobsTableComponent,
    PrintTableComponent,
    MaterialModule,
  ],
})
export class SharedModule {}
