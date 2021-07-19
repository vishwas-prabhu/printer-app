import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  showSidebar = false

  constructor() {}

  ngOnInit(): void {}

  /**
   * Toggles the value of Sidebar variable value when invoked
   * @params none
   * @returns void
   */
  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar
  }
}
