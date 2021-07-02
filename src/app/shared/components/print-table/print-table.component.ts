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
  pageNo!: number
  totalPages: number[] = []
  sortingColumn!: string

  constructor(
    private printerService: PrinterService,
    private sortService: SortService
  ) {}

  /**
   * Function will load the printer table data from the API
   * @param pageNo request API based on the page number
   * @returns void
   */
  loadPrinterData(pageNo: number): void {
    if (this.paginate && pageNo !== this.pageNo) {
      this.pageNo = pageNo
      this.printerData = []
      this.printerService
        .getPrintersDataByPage(pageNo)
        .subscribe((data: PrinterListResponse) => {
          this.printerData = data.printerList
          this.populateTotalPages(data.totalPages)
        })
    } else if (!this.paginate) {
      this.printerService
        .getPrintersData()
        .subscribe((data: PrinterListResponse) => {
          this.printerData = data.printerList
        })
    }
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

  /**
   * Angular life hook - called when component is loaded
   */
  ngOnInit(): void {
    this.loadPrinterData(1)
  }
}
