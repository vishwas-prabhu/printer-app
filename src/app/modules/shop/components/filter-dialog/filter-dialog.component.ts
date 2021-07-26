import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

interface DialogData {
  selectedTableColumns: any
  positionRelativeToElement: any
}

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss'],
})
export class FilterDialogComponent implements OnInit {
  selectedTableColumns: any

  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    const btn =
      this.data?.positionRelativeToElement.nativeElement.getBoundingClientRect()
    this.selectedTableColumns = { ...this.data.selectedTableColumns }
    this.dialogRef.updatePosition({
      right: `50px`,
      top: `${btn.bottom + 2}px`,
    })
  }
}
