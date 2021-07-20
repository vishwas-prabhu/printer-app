# PrinterApp

This is an assignment project.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.4.

## Folder Structure

```
Printer-app
|
├── src
│   ├── app
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── app-routing.module.ts
│   │   ├── core
│   │   │   ├── authentication
│   │   │   │   └── login
│   │   │   │       ├── login.component.html
│   │   │   │       ├── login.component.scss
│   │   │   │       ├── login.component.spec.ts
│   │   │   │       └── login.component.ts
│   │   │   ├── cart-dialog
│   │   │   │   ├── cart-dialog.component.html
│   │   │   │   ├── cart-dialog.component.scss
│   │   │   │   ├── cart-dialog.component.spec.ts
│   │   │   │   └── cart-dialog.component.ts
│   │   │   ├── guards
│   │   │   │   ├── auth.guard.spec.ts
│   │   │   │   └── auth.guard.ts
│   │   │   ├── mocks
│   │   │   │   └── mock-data.ts
│   │   │   └── services
│   │   │       ├── auth.service.spec.ts
│   │   │       ├── auth.service.ts
│   │   │       ├── cart.service.spec.ts
│   │   │       ├── cart.service.ts
│   │   │       ├── printer.service.spec.ts
│   │   │       ├── printer.service.ts
│   │   │       ├── sort.service.spec.ts
│   │   │       ├── sort.service.ts
│   │   │       ├── user.service.spec.ts
│   │   │       └── user.service.ts
│   │   ├── modules
│   │   │   ├── dashboard
│   │   │   │   ├── components
│   │   │   │   │   ├── header
│   │   │   │   │   │   ├── header.component.html
│   │   │   │   │   │   ├── header.component.scss
│   │   │   │   │   │   ├── header.component.spec.ts
│   │   │   │   │   │   └── header.component.ts
│   │   │   │   │   └── sidebar
│   │   │   │   │       ├── sidebar.component.html
│   │   │   │   │       ├── sidebar.component.scss
│   │   │   │   │       ├── sidebar.component.spec.ts
│   │   │   │   │       └── sidebar.component.ts
│   │   │   │   ├── dashboard.component.html
│   │   │   │   ├── dashboard.component.scss
│   │   │   │   ├── dashboard.component.spec.ts
│   │   │   │   ├── dashboard.component.ts
│   │   │   │   ├── dashboard.module.ts
│   │   │   │   └── dashboard-routing.module.ts
│   │   │   ├── home
│   │   │   │   ├── home.component.html
│   │   │   │   ├── home.component.scss
│   │   │   │   ├── home.component.spec.ts
│   │   │   │   ├── home.component.ts
│   │   │   │   ├── home.module.ts
│   │   │   │   └── home-routing.module.ts
│   │   │   ├── printer
│   │   │   │   ├── printer.component.html
│   │   │   │   ├── printer.component.scss
│   │   │   │   ├── printer.component.spec.ts
│   │   │   │   ├── printer.component.ts
│   │   │   │   ├── printer.module.ts
│   │   │   │   └── printer-routing.module.ts
│   │   │   └── shop
│   │   │       ├── components
│   │   │       │   ├── filter-dialog
│   │   │       │   │   ├── filter-dialog.component.html
│   │   │       │   │   ├── filter-dialog.component.scss
│   │   │       │   │   ├── filter-dialog.component.spec.ts
│   │   │       │   │   └── filter-dialog.component.ts
│   │   │       │   ├── shop-header
│   │   │       │   │   ├── shop-header.component.html
│   │   │       │   │   ├── shop-header.component.scss
│   │   │       │   │   ├── shop-header.component.spec.ts
│   │   │       │   │   └── shop-header.component.ts
│   │   │       │   └── shop-table
│   │   │       │       ├── shop-table.component.html
│   │   │       │       ├── shop-table.component.scss
│   │   │       │       ├── shop-table.component.spec.ts
│   │   │       │       └── shop-table.component.ts
│   │   │       ├── directives
│   │   │       │   ├── scroll.directive.spec.ts
│   │   │       │   └── scroll.directive.ts
│   │   │       ├── shop.component.html
│   │   │       ├── shop.component.scss
│   │   │       ├── shop.component.spec.ts
│   │   │       ├── shop.component.ts
│   │   │       ├── shop.module.ts
│   │   │       └── shop-routing.module.ts
│   │   └── shared
│   │       ├── components
│   │       │   ├── confirm-dialog
│   │       │   │   ├── confirm-dialog.component.html
│   │       │   │   ├── confirm-dialog.component.scss
│   │       │   │   ├── confirm-dialog.component.spec.ts
│   │       │   │   └── confirm-dialog.component.ts
│   │       │   ├── jobs-table
│   │       │   │   ├── jobs-table.component.html
│   │       │   │   ├── jobs-table.component.scss
│   │       │   │   ├── jobs-table.component.spec.ts
│   │       │   │   └── jobs-table.component.ts
│   │       │   ├── print-table
│   │       │   │   ├── print-table.component.html
│   │       │   │   ├── print-table.component.scss
│   │       │   │   ├── print-table.component.spec.ts
│   │       │   │   └── print-table.component.ts
│   │       │   └── user-table
│   │       │       ├── user-table.component.html
│   │       │       ├── user-table.component.scss
│   │       │       ├── user-table.component.spec.ts
│   │       │       └── user-table.component.ts
│   │       ├── interfaces
│   │       │   ├── cart-item.ts
│   │       │   ├── printer-data.ts
│   │       │   ├── shop-data.ts
│   │       │   └── user.ts
│   │       ├── material.module.ts
│   │       ├── shared.module.ts
│   │       └── validators
│   │           └── validation.ts
│   ├── assets
│   │   ├── cart.png
│   │   ├── logo.jpg
│   │   ├── scss
│   │   │   ├── _mixins.scss
│   │   │   └── _variables.scss
│   │   ├── user.json
│   │   └── user.png
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.scss
│   └── test.ts
├── angular.json
├── karma.conf.js
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json
├── tslint.json
└── yarn.lock

```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
