import { NgModule } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatBadgeModule } from '@angular/material/badge'
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu'
import { MatDividerModule } from '@angular/material/divider'
import { MatProgressBarModule } from '@angular/material/progress-bar'
@NgModule({
  imports: [
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressBarModule,
  ],
  exports: [
    MatTableModule,
    MatSortModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatDividerModule,
    MatProgressBarModule,
  ],
})
export class MaterialModule {}
