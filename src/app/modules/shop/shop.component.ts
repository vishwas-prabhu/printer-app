import { Component, OnInit } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { PrinterService } from 'src/app/core/services/printer.service'
import { PrinterDataResponse } from 'src/app/shared/interfaces/printer-data'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  dataSource = new MatTableDataSource()
  columnsToDisplay: string[] = [
    'substrate_name',
    'source',
    'date_modified',
    'installed_in',
    'manufacturer',
    'model_supported',
    'added_to_cart',
  ]

  constructor(private printerService: PrinterService) {}

  ngOnInit(): void {
    this.loadTableData()
  }

  /**
   * Loads the printer table data from API
   */
  loadTableData(): void {
    this.printerService
      .getPrinterData()
      .subscribe(
        (data: PrinterDataResponse) =>
          (this.dataSource.data = [
            ...this.dataSource.data,
            ...data.printerList,
          ])
      )
  }

  /**
   * Updates the columns that are displayed in the table
   * @param object column name to be displayed in the table
   *
   * @example
   * if object is { name: true, id: false }
   * then only name column will be displayed in the table
   */
  updateDisplayColumns(object: any): void {
    this.columnsToDisplay = []
    // tslint:disable-next-line: prefer-const
    for (let item in object) {
      if (object[item]) {
        this.columnsToDisplay.push(item)
      }
    }
  }
}
