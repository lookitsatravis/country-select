(function() {
  angular.module("country-select", [])
    .directive('countrySelect', CountrySelect);

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

      // Remove classes from the directive, and add them to child
      var classes = element.attr('class').split(' ');
      classes.forEach(function(klass) {
        element.removeClass(klass);
      });

      element.append('<select name="' + attrs.name + '"></select>');
      var select = element.find('select');

      // Add classes
      classes.forEach(function(klass) {
        select.addClass(klass);
      });

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

  CountrySelect.$inject = ['$parse'];
})();
