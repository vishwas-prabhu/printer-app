import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class BgSyncService {
  constructor() {}

  backgroundSync(): void {
    console.log('background sync called')
    navigator.serviceWorker.ready
      .then(swRegistration => swRegistration.sync.register('post-data'))
      .catch(console.log)
  }
}
