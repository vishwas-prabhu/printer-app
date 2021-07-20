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
│   │   │   │       └── login.component.html|scss|spec.ts|ts
│   │   │   ├── cart-dialog
│   │   │   │   └── cart-dialog.component.html|scss|spec.ts|ts
│   │   │   ├── guards
│   │   │   │   └── auth.guard.ts|ts
│   │   │   ├── mocks
│   │   │   │   └── mock-data.ts
│   │   │   └── services
│   │   │       ├── auth.service.spec.ts|ts
│   │   │       ├── cart.service.spec.ts|ts
│   │   │       ├── printer.service.spec.ts|ts
│   │   │       ├── sort.service.spec.ts|ts
│   │   │       └── user.service.spec.ts|ts
│   │   ├── modules
│   │   │   ├── dashboard
│   │   │   │   ├── components
│   │   │   │   │   ├── header
│   │   │   │   │   │   └── header.component.html|scss|spec.ts|ts
│   │   │   │   │   └── sidebar
│   │   │   │   │       └── sidebar.component.html|scss|spec.ts|ts
│   │   │   │   ├── dashboard.component.html|scss|spec.ts|ts
│   │   │   │   ├── dashboard.module.ts
│   │   │   │   └── dashboard-routing.module.ts
│   │   │   ├── home
│   │   │   │   ├── home.component.html|scss|spec.ts|ts
│   │   │   │   ├── home.module.ts
│   │   │   │   └── home-routing.module.ts
│   │   │   ├── printer
│   │   │   │   ├── printer.component.html|scss|spec.ts|ts
│   │   │   │   ├── printer.module.ts
│   │   │   │   └── printer-routing.module.ts
│   │   │   └── shop
│   │   │       ├── components
│   │   │       │   ├── filter-dialog
│   │   │       │   │   └── filter-dialog.component.html|scss|spec.ts|ts
│   │   │       │   ├── shop-header
│   │   │       │   │   └── shop-header.component.html|scss|spec.ts|ts
│   │   │       │   └── shop-table
│   │   │       │       └── shop-table.component.html|scss|spec.ts|ts
│   │   │       ├── directives
│   │   │       │   └── scroll.directive.spec.ts|ts
│   │   │       ├── shop.component.html|scss|spec.ts|ts
│   │   │       ├── shop.module.ts
│   │   │       └── shop-routing.module.ts
│   │   └── shared
│   │       ├── components
│   │       │   ├── confirm-dialog
│   │       │   │   └── confirm-dialog.component.html|scss|spec.ts|ts
│   │       │   ├── jobs-table
│   │       │   │   └── jobs-table.component.html|scss|spec.ts|ts
│   │       │   ├── print-table
│   │       │   │   └── print-table.component.html|scss|spec.ts|ts
│   │       │   └── user-table
│   │       │       └── user-table.component.html|scss|spec.ts|ts
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
