import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class SortService {
  constructor() {}

  sortData<T>(data: T[], key: string, reverse: boolean): T[] {
    const sortedData = data.sort((a: any, b: any) => {
      return a[key].localeCompare(b[key])
    })
    return reverse ? sortedData.reverse() : sortedData
  }
}
