import { TestBed } from '@angular/core/testing'
import { PrinterData } from 'src/app/shared/interfaces/printer-data'

import { SortService } from './sort.service'

const printerData = [
  {
    id: 'HPEPMC10502',
    name: '26.453.126.56',
    status: 'true',
  },
  {
    id: 'HPEPMC10503',
    name: '87.453.126.56',
    status: 'true',
  },
  {
    id: 'HPEPMC10501',
    name: '255.453.126.56',
    status: 'true',
  },
] as PrinterData[]

describe('SortService', () => {
  let service: SortService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(SortService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should return sorted data in ascending order', () => {
    const [data, sortedColumn] = service.sortData(printerData, 'id', 'name')
    expect(data).toEqual(printerData)
    expect(sortedColumn).toEqual('id')
    expect(data[0].id).not.toEqual('HPEPMC10502')
    expect(data[0].id).toEqual('HPEPMC10501')
    expect(data[1].id).toEqual('HPEPMC10502')
    expect(data[1].name).toEqual('26.453.126.56')
  })

  // tslint:disable-next-line: max-line-length
  it('should return sorted data in descending order when reverse set to true', () => {
    const [data, sortedColumn] = service.sortData(printerData, 'id', 'id')
    expect(sortedColumn).toEqual('')
    expect(data).toEqual(printerData)
    expect(data[0].id).not.toEqual('HPEPMC10502')
    expect(data[0].id).toEqual('HPEPMC10503')
    expect(data[1].id).toEqual('HPEPMC10502')
    expect(data[1].name).toEqual('26.453.126.56')
    expect(data[2].id).toEqual('HPEPMC10501')
  })
})
