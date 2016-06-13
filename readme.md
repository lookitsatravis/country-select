# Angular 1.x Country Select

## Installation

Add the package:

`npm install lookitsatravis/country-select --save`

Add script tags or import the library.

Then add it as a dependency for your Angular 1.x module:

```js
  angular.module('myApp', ['country-select']);
```

## Usage

Simply bind the country value to the `country` attribute:

```html
  <country-select name="country" placeholder="Country" country="vm.address.country" required></country-select>
```

You can also restrict the list of available countries using a comma delimited list of ISO country codes

```html
  <country-select name="country" placeholder="Country" country="vm.address.country" restrict="CA,US" required></country-select>
```
