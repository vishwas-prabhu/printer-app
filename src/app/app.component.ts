import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'printer-app'
  show = false

  constructor() {}

  toggleMenu(): void {
    this.show = !this.show
  }
}
