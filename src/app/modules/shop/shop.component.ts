import { Component, OnInit } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { PrinterService } from 'src/app/core/services/printer.service'
import { ShopDataResponse } from 'src/app/shared/interfaces/shop-data'

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
    this.loadTableData(1)
  }

  /**
   * Loads the shop table data from API
   * @param pageNo represents page number from which data to be fetched from API
   *
   * @usageNotes if `pageNo` is 0 and already fetched page is 3
   * then page 4 will be fetched from API
   */
  loadTableData(pageNo: number): void {
    this.printerService
      .getProductsData(pageNo)
      .subscribe(
        (data: ShopDataResponse) =>
          (this.dataSource.data = [
            ...this.dataSource.data,
            ...data.productList,
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
