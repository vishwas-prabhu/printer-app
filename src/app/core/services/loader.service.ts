import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  isRequestLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  )

  constructor() {}

  setLoading(): void {
    Promise.resolve().then(() => this.isRequestLoading.next(true))
  }

  resetLoading(): void {
    Promise.resolve().then(() => this.isRequestLoading.next(false))
  }
}
