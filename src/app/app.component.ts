import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'printer-app'
  showSidebar = false

  constructor() {}

  /**
   * Toggles the value of Sidebar variable value when invoked
   * @params none
   * @returns void
   */
  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar
  }
}
