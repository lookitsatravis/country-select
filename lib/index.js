export default angular.module("country-select", [])
  .directive('countrySelect', ['$parse', CountrySelect]);

function CountrySelect($parse) {
  return {
    restrict: 'E',
    scope: {
      country: '=',
      restrict: '@'
    },
    link: link
  };

  function link(scope, element, attrs) {
    //https://gist.github.com/Keeguon/2310008
    var countries = require('./countries.js');

    element.append('<select name="' + attrs.name + '"></select>');
    var select = element.find('select');
    select.append('<option value="" disabled selected>Select a Country</option>');

    var restrict = [];
    if(angular.isDefined(scope.restrict)) {
      restrict = scope.restrict.split(',');
    }

    for(var c in countries) {
      var country = countries[c];
      if(restrict.length > 0) {
        if(restrict.indexOf(country.code) > -1) {
          select.append('<option value="' + country.code + '">' + country.name + '</option>');
        }
      } else {
        select.append('<option value="' + country.code + '">' + country.name + '</option>');
      }
    }

    scope.$watch('country', function(value) {
      select.val(value);
    });

    select.bind('change', function() {
      scope.$apply(function() {
        scope.country = select.val();
      });
    });
  }
}
