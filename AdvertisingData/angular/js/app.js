'use strict';

/* App Module */

var Services = angular.module('chargeback.services',[]);
var Controllers = angular.module('chargeback.controllers', []);
var modules = [
               'ngCookies',
               'chargeback.directives',
               'chargeback.controllers',
               'chargeback.services',
               'restangular',
               'ngMessages',	
               'ui.bootstrap'               
           ];

var ppApp = angular.module('chargeback', modules);

//! Backend API URL
var Settings = {};			
Settings.serviceBaseUrl='http://ec2-54-236-109-169.compute-1.amazonaws.com:10090/';

ppApp.config(
    function($httpProvider,RestangularProvider) {
        RestangularProvider.setBaseUrl(Settings.serviceBaseUrl);        
    }
);


ppApp.run(function($rootScope, $location, authService, restservice, $cookieStore, $http) {
	$rootScope.serviceBaseUrl = Settings.serviceBaseUrl;
    authService.setServiceBaseUrl(Settings.serviceBaseUrl);
    
    $http.defaults.headers.common['Content-Type'] = 'application/json';
    $http.defaults.headers.common['api_username'] = 'nanreportingapi';
    $http.defaults.headers.common['api_password'] = 'd60e513234cfe0250a69a6f7e2cb5e02';
    
    var obj = $cookieStore.get("__ccbh");
    if(obj != null){
    	if(obj.password == undefined){
    		$http.defaults.headers.common['accessToken'] = obj.accessToken;
    	}
    	else{
       	 $http.defaults.headers.common['username'] = obj.username;
		 $http.defaults.headers.common['password'] = obj.password;
    	}
    }
   
    
    if(window.location.href.indexOf("AccessToken=")!=-1){
		var no = window.location.href.indexOf("AccessToken=");
		var accessToken = window.location.href.substring(no+12, window.location.href.length);
		$http.defaults.headers.common['accessToken'] = accessToken;
		restservice.get("", "companies", "CompanyAPI").then(function(data) {
			for(var i = 0;i < data.length; i++){
		 		if(data[i].accessToken == accessToken){
		 			var companyId = data[i].id;
		 			restservice.get("", "companies/"+companyId+"/users", "CompanyAPI").then(function(result) {
		 				for(var j = 0;j < result.length; j++){
		 			 		if(result[j].admin == true){
		 			 			$rootScope.usr = {};
		 						$rootScope.usr.username = result[j].username;
		 						$rootScope.usr.admin = result[j].admin;
		 						$rootScope.usr.superAdmin = result[j].superAdmin;
		 						$rootScope.usr.companyId = companyId;
		 						$rootScope.usr.accessToken = accessToken;
		 						$cookieStore.remove("__ccbh");
		 						$cookieStore.put("__ccbh",$rootScope.usr);
		 						window.location.href = "advertising-data.html";
		 			 		}
		 			 	}		 				
		 	        });
		 		}
		 	}
			
        });	
    }
	
	 $rootScope.isLoggedIn = function(){
    	if($cookieStore.get("__ccbh") == null && window.location.href.indexOf("AccessToken=")==-1){
			window.location.href = "login.html";
		}
    	return $cookieStore.get("__ccbh");
    };
    
	 $rootScope.addUsernamePasswordRequestHeaders = function(){
		    $http.defaults.headers.common['username'] = $rootScope.username;
		    $http.defaults.headers.common['password'] = $rootScope.password;
	 };
    
    $rootScope.cleanUIMessages = function(){
    	for ( var field in $rootScope.uiMessages) {
    		$rootScope.cleanUIMessage(field);
		}
    	$rootScope.uiMessages = {};
    };
    
    $rootScope.cleanAllComponentMessage = function(){
    	for ( var field in $rootScope.componentMessages) {
    		$rootScope.cleanComponentMessage(field);
		}
    	$rootScope.componentMessages = {};
    };
    
    $rootScope.getFile = function(file){
    	$rootScope.file = file;
    };
    
    $rootScope.cleanComponentMessage = function( field ){
    	$rootScope.allowToSubmit = true;
    	if(field && field in $rootScope.componentMessages) {
    		$rootScope.cleanUIMessage(field);
			delete $rootScope.componentMessages[field];
			if(Object.keys($rootScope.componentMessages).length > 0){
				$rootScope.allowToSubmit = false;
			}
		}	
    };
    
    $rootScope.cleanUIMessage = function( field ){
    	var self = ($("[id=" + field + "]").length)? $("[id=" + field + "]") : $("[name=" + field + "]") ;
		var selfMessage = $("[message-for=" + field + "]");
		if (selfMessage.length) {
			$(selfMessage).text('');
			$(selfMessage).removeClass("error-text error-modal");
		}
		if (self.length) {
			$(self).removeClass("field-error");
		}
    };
    
    $rootScope.cleanUIMessageList = function( field ){
    	var array = field.split(',');
    	for(var index in array){
    		field = array[index];
	    	var self = ($("[id=" + field + "]").length)? $("[id=" + field + "]") : $("[name=" + field + "]") ;
			var selfMessage = $("[message-for=" + field + "]");
			if (selfMessage.length) {
				$(selfMessage).text('');
				$(selfMessage).removeClass("error-text error-modal");
			}
			if (self.length) {
				$(self).removeClass("field-error");
			}
    	}
    };
    
    $rootScope.addComponentMessage = function( field, message){
    	if(!field) return; 
    	
    	var isFieldMsgUI = false;
    	var self = ($("[id=" + field + "]").length)? $("[id=" + field + "]") : $("[name=" + field + "]") ;
		var selfMessage = $("[message-for=" + field + "]");					
		if (selfMessage.length) {
			$(selfMessage).text(''+message);
			$(selfMessage).addClass("error-text error-modal");
			isFieldMsgUI = true;
		}
		
		if (self.length) {
			$(self).addClass("field-error"); 
		}
		return isFieldMsgUI;
    }; 
	
    $rootScope.getParameterByName = function(sname) {  
    	var params = location.search.substr(location.search.indexOf("?")+1);
		  var sval = "";
		  params = params.split("&");
		    // split param and value into individual pieces
		    for (var i=0; i<params.length; i++)
		       {
		         var temp = params[i].split("=");
		         if ( [temp[0]] == sname ) { sval = temp[1]; }
		       }
		    if(sval == undefined || sval == "" || sval == null){
		    	return undefined;
		    }
		  return sval;
	};
});

