import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-print-table',
  templateUrl: './print-table.component.html',
  styleUrls: ['./print-table.component.scss'],
})
export class PrintTableComponent implements OnInit {
  @Input() paginate!: boolean

  constructor() {}

  ngOnInit(): void {}
}
