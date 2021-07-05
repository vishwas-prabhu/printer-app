import { Component, Input, OnInit } from '@angular/core'
import {
  PrinterData,
  PrinterListResponse,
} from 'src/app/shared/interfaces/printer-data'
import { PrinterService } from 'src/app/core/services/printer.service'
import { SortService } from 'src/app/core/services/sort.service'

@Component({
  selector: 'app-print-table',
  templateUrl: './print-table.component.html',
  styleUrls: ['./print-table.component.scss'],
})
export class PrintTableComponent implements OnInit {
  @Input() paginate!: boolean
  printerData: PrinterData[] = []
  allData: PrinterData[] = []
  pageNo!: number
  totalPages: number[] = []
  sortingColumn!: string
  pageOffset = 4

  constructor(
    private printerService: PrinterService,
    private sortService: SortService
  ) {}

  /**
   * Function will load the printer table data from the API
   * @returns void
   */
  loadPrinterData(): void {
    this.printerService
      .getPrintersData()
      .subscribe((data: PrinterListResponse) => {
        this.printerData = data.printerList
        this.allData = this.printerData
        this.paginateAllPrintersData()
      })
  }

  /**
   * Function used to filter the data from all printers data
   * @param pageNo page to be displayed in the table
   */
  loadFilteredData(pageNo: number): void {
    this.pageNo = pageNo
    this.printerData = this.allData.slice(
      (pageNo - 1) * this.pageOffset,
      pageNo * this.pageOffset
    )
  }

  /**
   * Populates the totalPages array with sequential numbers
   * @param totalPages total number of array element required in the array
   *
   * Function will populate array with numbers starting from 1 to totalPages
   * Array will be of length totalPages
   * @example
   * populateTotalPages(4) returns array [1,2,3,4]
   */
  populateTotalPages(totalPages: number): void {
    if (totalPages === this.totalPages.length) {
      return
    }
    this.totalPages.splice(0)
    for (let num = 1; num <= totalPages; num++) {
      this.totalPages.push(num)
    }
  }

  /**
   * Sets pagination for all the printer data available
   */
  paginateAllPrintersData(): void {
    if (this.paginate) {
      this.printerData = []

      // Set the totalPages array with given offset
      this.populateTotalPages(
        this.allData.length % this.pageOffset
          ? Math.floor(this.allData.length / this.pageOffset) + 1
          : this.allData.length / this.pageOffset
      )
      this.loadFilteredData(1)
    }
  }

  /**
   * Function sets the offset for pagination
   * @param offset number of results (rows) to be displayed per page
   * @returns void
   */
  setOffsetValue(offset: any): void {
    this.pageOffset = offset.target.value
    this.paginateAllPrintersData()
  }

  /**
   * Sorts the printer table data based on key
   * @param key represents the column on which sorting should be done
   * @return void
   */
  sort(key: string): void {
    let reverse = false
    if (this.sortingColumn === key) {
      reverse = true
      this.sortingColumn = ''
    } else {
      this.sortingColumn = key
    }

    this.printerData = this.sortService.sortData<PrinterData>(
      this.printerData,
      key,
      reverse
    )
  }

  ngOnInit(): void {
    this.loadPrinterData()
  }
}
