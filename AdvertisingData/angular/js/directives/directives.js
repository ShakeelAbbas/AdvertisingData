'use strict';

/* Directives */

var directives = angular.module('chargeback.directives', []);

directives.directive('errorMessage', function($rootScope) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.bind('blur', function() {
				var field = (attrs && attrs.id) ? attrs.id : attrs.name;
				if(field){
					$rootScope.cleanUIMessage(field);
                }
				var value = element.val();
				if(attrs.required == true && value==""){
					$rootScope.addComponentMessage(field,attrs.errorMessage);
				}
			});
		}
	};
}); 

directives.directive('validateForm', function($rootScope) {
	return {		
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.bind('submit', function() {
				
				var field = (attrs && attrs.id) ? attrs.id : attrs.name;
				var self = ($("[id=" + field + "]").length)? $("[id=" + field + "]") : $("[name=" + field + "]") ;
				for(var i = 0; i < self[0].elements.length;i++){
					if(self[0].elements[i].required == true){
						self[0].elements[i].focus();
						self[0].elements[i].blur();
					}
				}
			});
		}
	};
});

directives.directive('fileModel', ['$parse', function ($parse,$rootScope) {
    return {
        restrict: 'A',
        link: function($rootScope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
            	$rootScope.$apply(function(){
                    $rootScope.getFile(element[0].files[0]);
                });
            });
        }
    };
}]);

directives.directive('stringToNumber', function() {
	  return {
	    require: 'ngModel',
	    link: function(scope, element, attrs, ngModel) {
	      ngModel.$parsers.push(function(value) {
	        return '' + value;
	      });
	      ngModel.$formatters.push(function(value) {
	        return parseFloat(value, 10);
	      });
	    }
};
});


