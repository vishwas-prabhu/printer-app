import { Component, OnInit } from '@angular/core'
import { SwUpdate } from '@angular/service-worker'
import { LoaderService } from './core/services/loader.service'
import { ConnectionService } from 'ng-connection-service'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'printer-app'
  constructor(
    public loading: LoaderService,
    private update: SwUpdate,
    private connectionService: ConnectionService,
    private loader: LoaderService,
    private snackbar: MatSnackBar
  ) {
    this.update.available.subscribe(data => {
      console.log('refreshed')
      this.update.activateUpdate().then(() => location.reload())
    })
  }

  ngOnInit(): void {
    this.connectionService.monitor().subscribe((isConnected: boolean) => {
      if (isConnected) {
        this.loader.setToOnline()
        this.openSnackBar('You are now online!', 1000)
      } else {
        this.loader.setToOffline()
        this.openSnackBar(
          'You are offline. Check your connection and retry!',
          3000
        )
      }
    })
  }

  /**
   * Opens a snackbar at the bottom of the screen
   * @param name string to be displayed in the snackbar
   */
  openSnackBar(message: string, duration: number): void {
    this.snackbar.open(message, '', {
      duration,
    })
  }
}
