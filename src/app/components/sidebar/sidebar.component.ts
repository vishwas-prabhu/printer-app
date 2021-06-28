import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() showSideBar!: boolean
  @Output() closeSideBar = new EventEmitter<any>()
  constructor() {}

  ngOnInit(): void {}

  close(): void {
    this.closeSideBar.emit()
  }
}
