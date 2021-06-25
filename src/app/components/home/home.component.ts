import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  dashboardData = [
    { name: 'Users', number: 230, colorCode: '#79c179', icon: 'people' },
    { name: 'Printers', number: 80, colorCode: '#d41010', icon: 'storage' },
    { name: 'Jobs', number: 65, colorCode: '#d2c30e', icon: 'device_hub' },
    { name: 'Issues', number: 16, colorCode: '#5b81ec', icon: 'album' },
  ]

  constructor() {}

  ngOnInit(): void {}
}
