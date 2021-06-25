import { Component, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() closeBar = new EventEmitter<any>()
  constructor() {}

  ngOnInit(): void {}

  close(): void {
    this.closeBar.emit()
  }
}
