import { fakeAsync, TestBed, tick } from '@angular/core/testing'

import { LoaderService } from './loader.service'

describe('LoaderService', () => {
  let service: LoaderService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(LoaderService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  // tslint:disable-next-line: max-line-length
  it('should set isRequestLoading to true on invoking setLoading', fakeAsync(() => {
    service.setLoading()
    tick()
    service.isRequestLoading.subscribe(data => expect(data).toEqual(true))
  }))

  // tslint:disable-next-line: max-line-length
  it('should set isRequestLoading to false on invoking resetLoading', fakeAsync(() => {
    service.resetLoading()
    tick()
    service.isRequestLoading.subscribe(data => expect(data).toEqual(false))
  }))
})
