Services.factory('authService', function(Restangular, $rootScope, $cookies) {
	var service = {};
	service.access_token = localStorage.auth || '';
	service.serviceBaseUrl = '';
	$rootScope.access_token = service.access_token;
	var ajaxCount = 0;
	$rootScope.firstTime = true;
	$rootScope.isProcessing = false;
	$rootScope.uiMessages = {};
	$rootScope.componentMessages = {};
	$rootScope.isRequestCompleted = true;
	$rootScope.allowToSubmit = true;
	service.selectChargebackApiByName = function(apiName) {
		return Restangular.withConfig(function(RestangularConfigurer) {
			
			RestangularConfigurer.setErrorInterceptor(function(response, restangularObject) {
				if(response.statusText != undefined){
					$rootScope.uiMessage = response.statusText;
				}
				if (response.status === 400) {
					$rootScope.uiMessage = response.data.message;	
					if($rootScope.uiMessage == "illegal email"){
						$rootScope.uiMessage = "Couldn't find email in System, email not sent!";
					}
				}
				
				else if(response.status === 401){
					$rootScope.uiMessage = response.data.message;	
					if($rootScope.uiMessage == "Illegal credentials"){
						$rootScope.uiMessage = "Username or Password is Incorrect!";
					}
					if($rootScope.uiMessage == "Illegal token"){
						window.location.href = "login.html";
					}
				}
				
				if($rootScope.uiMessage == undefined && response.data.error != undefined){
					$rootScope.uiMessage = response.data.error;
				}
				
				return response;
			});
		});
	};
	service.setAccessToken = function(accessToken) {
		service.access_token = accessToken;
	};
	service.setServiceBaseUrl = function(serviceBaseUrl) {
		service.serviceBaseUrl = serviceBaseUrl;
	};
	return service;
});

Services.factory('restservice', function(authService) {
	var service;
	service = {};

	service.post = function(object, url, apiName) {
		var apiAuth;
		apiAuth = authService.selectChargebackApiByName(apiName);
		if (apiAuth.all) {
			return apiAuth.all(url).post(object);
		} else {
			return false;
		}
	};
	service.put = function(object, url, apiName) {
		var apiAuth;
		apiAuth = authService.selectChargebackApiByName(apiName);
		if (apiAuth.all) {
			return apiAuth.one(url).customPUT(object);
		} else {
			return false;
		}
	};
	service.get = function(object, url, apiName) {
		var apiAuth;
		apiAuth = authService.selectChargebackApiByName(apiName);
		if (apiAuth.all) {
			return apiAuth.all(url).get(object);
		} else {
			return false;
		}
	};
	service.remove = function(object, url, apiName) {
		var apiAuth;
		apiAuth = authService.selectChargebackApiByName(apiName);
		if (apiAuth.all) {
			return apiAuth.one(url).remove(object);
		} else {
			return false;
		}
	};
	return service;
});
