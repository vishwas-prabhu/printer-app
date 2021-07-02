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
   * @param reverse specifies whether return data should be reversed or not
   * @returns returns sorted `data`
   * @usage If `reverse` is false return data will be in ascending order and
   * if `reverse` is true return data will be in descending order
   */
  sortData<T>(data: T[], key: string, reverse: boolean): T[] {
    const sortedData = data.sort((a: any, b: any) => {
      return a[key].localeCompare(b[key])
    })
    return reverse ? sortedData.reverse() : sortedData
  }
}
