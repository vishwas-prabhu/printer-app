import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component'

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss'],
})
export class HomeHeaderComponent implements OnInit {
  @Output() updateColumn = new EventEmitter<object>()

  selectedTableColumns = {
    substrate_name: true,
    source: true,
    date_modified: true,
    installed_in: true,
    manufacturer: true,
    model_supported: true,
    added_to_cart: true,
  }

  @ViewChild('myButton') public myButtonRef!: ElementRef

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.setLocalStorage()
  }

  /**
   * Opens a filter dialog to select the columns need to be displayed
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: `250px`,
      data: {
        positionRelativeToElement: this.myButtonRef,
        selectedTableColumns: this.selectedTableColumns,
      },
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedTableColumns = result
        localStorage.setItem(
          'selectedColumns',
          JSON.stringify(this.selectedTableColumns)
        )
        this.updateColumn.emit(this.selectedTableColumns)
      }
    })
  }

  /**
   * Saves the selected columns in Local Storage
   *
   * @use saves the settings of user
   */
  setLocalStorage(): void {
    const selectedColumns = localStorage.getItem('selectedColumns')
    if (selectedColumns) {
      this.selectedTableColumns = JSON.parse(selectedColumns)
      this.updateColumn.emit(this.selectedTableColumns)
    } else {
      localStorage.setItem(
        'selectedColumns',
        JSON.stringify(this.selectedTableColumns)
      )
    }
  }
}
