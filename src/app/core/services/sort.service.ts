import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class SortService {
  constructor() {}

  /**
   * @description
   * Function used to sort the table data based on selected property
   * @param data Array to be sorted
   * @param key property used for sorting the data
   * @param sortedColumn column which is already sorted
   * @returns sorted `data`
   * @usageNotes If `sortedColumn` is same as `key`
   * return data will be in descending order and
   * if `sortedColumn` is other than `key`
   * return data will be in ascending order
   */
  sortData<T>(data: T[], key: string, sortedColumn: string): [T[], string] {
    let reverse = false
    if (sortedColumn === key) {
      reverse = true
      sortedColumn = ''
    } else {
      sortedColumn = key
    }

    const ascendingSort = (a: any, b: any) => a[key].localeCompare(b[key])
    const reverseSort = (a: any, b: any) => b[key].localeCompare(a[key])

    const sortedData = data.sort(reverse ? reverseSort : ascendingSort)

    return [sortedData, sortedColumn]
  }
}
