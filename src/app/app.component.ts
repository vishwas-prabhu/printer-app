import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'printer-app'
  showDropdown = false

  constructor() {}

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown
  }
}
