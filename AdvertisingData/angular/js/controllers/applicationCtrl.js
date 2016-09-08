//Use http://closure-compiler.appspot.com/home with 'whitespace' settings for compression
//Use http://www.jspretty.com with tabs for decompression
Controllers.controller("SignupCtrl", function($scope, $rootScope, $http, restservice) {
	$scope.signupUser = {};	
	$scope.error = {};
	$scope.error.passwordMatched = true;
	$rootScope.uiMessage = "";

	$scope.signup = function() {
		if ($scope.validateSignupForm() == false) {
			$scope.error.emailExist = false;
			return false;
		}	
		$scope.user = angular.copy($scope.signupUser);
		delete $scope.user['confirmPassword'];
		$scope.user.password = CryptoJS.MD5($scope.user.password).toString();
		restservice.post($scope.user, "users", "UserAPI").then(function(data) {
			window.location.href = "login.html";
        });
				
	};
	
	$scope.validateSignupForm = function() {
		$scope.error = {};
		var isValid = true;
		if($scope.signupUser.username==null){
			$scope.error.blankusername = true;
			isValid = false;
		}
		if($scope.signupUser.emailAddress==null){
			$scope.error.blankEmail = true;
			isValid = false;
		}
		if($scope.signupUser.companyName==null){
			$scope.error.blankCompanyName = true;
			isValid = false;
		}
		if($scope.signupUser.password==null){
			$scope.error.blankPassword = true;
			isValid = false;
		}
		if($scope.signupUser.confirmPassword==null){
			$scope.error.blankConfirmPassword = true;
			$scope.error.passwordMatched = true;
			isValid = false;
		}
		if($scope.signupUser.confirmPassword!=null && $scope.signupUser.password!=null){
			$scope.error.passwordMatched = angular.equals($scope.signupUser.confirmPassword, $scope.signupUser.password);
			if(!$scope.error.passwordMatched){
				isValid = false;
			}
		}
		return isValid;
	};

});

Controllers.controller("LoginCtrl", function($scope, $rootScope, $http, restservice, $cookieStore) {
	$scope.user = {};	
	$scope.loggedInUser = {};
	$scope.error = {};
	$scope.userCompanies = [];
	$scope.defaultCompany = {};
	$rootScope.uiMessage = "";

	$scope.login = function() {
		if ($scope.validateLoginForm() == false) {
			return false;
		}
		$rootScope.username = $scope.user.username;
		$rootScope.password = CryptoJS.MD5($scope.user.password).toString();
		$rootScope.addUsernamePasswordRequestHeaders();
		restservice.get("", "users/?username="+$scope.user.username, "UserAPI").then(function(data) {
			$scope.loggedInUser = data[0];
			restservice.get("", "users/"+$scope.loggedInUser.username+"/companies", "UserAPI").then(function(data) {
				$scope.userCompanies = data;
				$rootScope.uiMessage = "";
				if($scope.getDefaultCompany() == true){
					$scope.usr = {};
				 	$scope.usr.username = $scope.loggedInUser.username;		
				 	$scope.usr.defaultCompany = $scope.loggedInUser.defaultCompany;
				 	$scope.usr.admin = $scope.defaultCompany.admin;
				 	$scope.usr.companyId = $scope.defaultCompany.id;				
					$scope.usr.password = $rootScope.password;
					$scope.usr.superAdmin = $scope.loggedInUser.superAdmin;
					$cookieStore.put("__ccbh",$scope.usr);
					window.location.href = "advertising-data.html";
				}
				else{
					$rootScope.uiMessage = "Your Account is Disabled !";
				}
				
				
	        });		
        });			
	};
	
	$scope.validateLoginForm = function() {
		$scope.error = {};
		var isValid = true;
		if($scope.user.username==null){
			$scope.error.blankUsername = true;
			isValid = false;
		}
		if($scope.user.password==null){
			$scope.error.blankPassword = true;
			isValid = false;
		}
		return isValid;
	};
	
	$scope.getDefaultCompany = function() {
		$scope.defaultCompany = {};
		var isCompanyFound = false;
		for(var i = 0;i < $scope.userCompanies.length; i++){
			if($scope.userCompanies[i].status=='Active'){
				if(isCompanyFound == false){
					$scope.defaultCompany = $scope.userCompanies[i]; //! Picked First Active company
				}
				isCompanyFound = true;
		 		if($scope.loggedInUser.defaultCompany == $scope.userCompanies[i].id){
		 			$scope.defaultCompany = $scope.userCompanies[i];
		 		}		
	 		} 		
	 	}
		return isCompanyFound;
	};

});

Controllers.controller("LogoutCtrl", function($scope, $rootScope, $cookieStore) {
	$scope.logout = function() {
		$cookieStore.remove("__ccbh");
		window.location.href = "login.html";
	};
});

Controllers.controller("ResetPasswordCtrl", function($scope, $rootScope, $http, restservice) {			
	$scope.error = {};
	$scope.token = "";
	$scope.value = {};
	$scope.value.email = "";	
	$scope.value.password = "";
	$scope.value.confirmPassword = "";
	$rootScope.uiMessage = "";
	
	if(window.location.href.indexOf("token=")!=-1){
		var no = window.location.href.indexOf("token=");
		$scope.token = window.location.href.substring(no+6, window.location.href.length);
    }
	
	$scope.sendForgetPasswordEmail = function() {
		if ($scope.validateforgotPasswordForm() == false) {
			return false;
		}	
		restservice.post("", "users/"+$scope.value.email+"/send-reset-email", "UserAPI").then(function(data) {
			$rootScope.uiMessage = "Email Sent Successfully!";
				
        });			
	};
	
	$scope.resetPassword = function() {
		if ($scope.validateResetPasswordForm() == false) {
			return false;
		}	
		$scope.obj = {};
		$scope.obj.token = $scope.token;
		$scope.obj.newPassword1 = CryptoJS.MD5($scope.value.password).toString();
		$scope.obj.newPassword2 = CryptoJS.MD5($scope.value.confirmPassword).toString();
		restservice.post($scope.obj, "users/reset-password", "UserAPI").then(function(data) {
			$rootScope.uiMessage = "Password Reset Successfully!";
				
        });			
	};
	
	$scope.validateforgotPasswordForm = function() {
		var isValid = true;	
		if($scope.value.email==null || $scope.value.email==""){
			$scope.error.blankEmail = true;
			isValid = false;
		}
		return isValid;
	};
	
	$scope.validateResetPasswordForm = function() {
		var isValid = true;	
		if($scope.value.password==null || $scope.value.password==""){
			$scope.error.blankPassword = true;
			isValid = false;
		}
		if($scope.value.confirmPassword==null || $scope.value.confirmPassword==""){
			$scope.error.blankConfirmPassword  = true;
			isValid = false;
		}
		return isValid;
	};

});

Controllers.controller("AdvertisingDataCtrl", function($scope, $rootScope, $http, restservice, $cookieStore) {
	$scope.userObj = $rootScope.isLoggedIn();	
	$scope.AdvertisingDataList = [];
	$scope.totalSpent = 0;
	$scope.totalRevenue = 0;
	$scope.totalProfit = 0;
	$scope.apiDates = {};	
	$scope.orderByColumnName = {};
	$scope.SideBarPendingCBList = [];
	$scope.SideBarCompletedCBList = [];
	$scope.SideBarCurrentMonthCBList = [];
	$scope.HeaderCBDataList = [];
	$scope.campaign = {};
	$scope.campaign.category = "";
	$scope.campaign.type = "";
	$scope.showSection = {};
	$scope.showSection.AdvertisingDate = true;
	$scope.campaignCategoryList = [];
	$scope.campaignTypeList = [];
	

	$scope.getStatistics = function() {
		restservice.get("","companies/"+$scope.userObj.companyId+"/statistics?from="+$scope.apiDates.startDateAPI+"&to="+$scope.apiDates.endDateAPI+"&category="+$scope.campaign.category+"&campaignType="+$scope.campaign.type,"AdvertisingDataAPI").then(function(data) {
			$scope.getAdvertisingDataList(data);
        });			
	};
	
	$scope.getAdvertisingDataList = function(data){
		$scope.AdvertisingDataList = [];
		$scope.orderByColumnName.AdvertisingData = "accountName";
		var categrotyArr = [];
		var typeArr = [];
		var index = 0;
		$scope.totalSpent = 0;
		$scope.totalRevenue = 0;
		$scope.totalProfit = 0;
		angular.forEach(data, function(value, key) {
			if(value.campaign != null && value.campaign != undefined){
				categrotyArr[index] = value.campaign.category;
				typeArr[index] = value.campaign.campaignType;
				index++;
				for(var i = 0; i< value.statistics.length;i++){
					$scope.totalSpent = $scope.totalSpent + value.statistics[i].amountSpend;
					$scope.totalRevenue = $scope.totalRevenue + value.statistics[i].revenue;
					$scope.totalProfit = $scope.totalProfit + value.statistics[i].profit;
					$scope.AdvertisingData = {};
					delete value.statistics[i]['id'];
					$scope.AdvertisingData = angular.extend(angular.copy(value.campaign), value.statistics[i]);
					$scope.AdvertisingDataList.push($scope.AdvertisingData);
				}
				if(value.statistics.length == 0){
					$scope.AdvertisingData = {};
					$scope.AdvertisingData = value.campaign;
					$scope.AdvertisingDataList.push($scope.AdvertisingData);
				}

				$.each(categrotyArr, function(i, el){
				    if($.inArray(el, $scope.campaignCategoryList) === -1) $scope.campaignCategoryList.push(el);
				});
				$.each(typeArr, function(i, el){
				    if($.inArray(el, $scope.campaignTypeList) === -1) $scope.campaignTypeList.push(el);
				});
			}
		});
	};
	
	$scope.sortByColumn = function(columnName, tableType){
		if(tableType == 'AdvertisingData'){
			$scope.orderByColumnName.AdvertisingData = columnName;
		}
	};
	
	$scope.AdGroupList = [];
	$scope.showAdGroupSection = function(campaignId){
		for(var i = 0;i<$scope.AdvertisingDataList.length;i++){
			if($scope.AdvertisingDataList[i].id == campaignId){
				$scope.AdvertisingData = angular.copy($scope.AdvertisingDataList[i]);
				restservice.get("","campaigns/"+campaignId+"/adgroups/statistics","AdvertisingDataAPI").then(function(data) {
					$scope.getAdGroupList(data);
					$scope.showSection.AdvertisingDate = false;
					$scope.showSection.AdGroup = true;
					$scope.showSection.Ad = false;
					$( ".search-nav-left-text" ).text(' Summary');
					$(".overall").css("padding-top", "53%");
		        });	
			}
		}
		
	};
	
	$scope.getAdGroupList = function(data){
		$scope.AdGroupList = [];
		$scope.showSection.AdvertisingDate = false;
		$scope.showSection.AdGroup = true;
		angular.forEach(data, function(value, key) {
			if(value.adgroup != null && value.adgroup != undefined){
				for(var i = 0; i< value.statistics.length;i++){
					$scope.AdGroup = {};
					delete value.statistics[i]['id'];
					$scope.AdGroup = angular.extend(angular.copy(value.adgroup), value.statistics[i]);
					$scope.AdGroupList.push($scope.AdGroup);
				}
				if(value.statistics.length == 0){
					$scope.AdGroup = {};
					$scope.AdGroup = value.adgroup;
					$scope.AdGroupList.push($scope.AdGroup);
				}
			}
		});
	};
	
	$scope.AdList = [];
	$scope.showAdSection = function(adGroup){
		$scope.adGroup = angular.copy(adGroup);
		$scope.Adgroup = {};
		var campaignId = $scope.AdvertisingData.id;
		delete $scope.AdvertisingData['id'];
		$scope.Adgroup = angular.extend(angular.copy($scope.adGroup), $scope.AdvertisingData);
		$scope.Adgroup.adgroupName = adGroup.adgroupName;
		$scope.Adgroup.campaignId = campaignId;
		restservice.get("","campaigns/"+$scope.Adgroup.campaignId+"/adgroups/"+adGroup.id+"/ads/statistics","AdvertisingDataAPI").then(function(data) {
			$scope.getAdList(data);
			$scope.showSection.AdvertisingDate = false;
			$scope.showSection.AdGroup = false;
			$scope.showSection.Ad = true;
			$( ".search-nav-left-text" ).text(' Summary');
			$(".overall").css("padding-top", "53%");
        });	
		
	};
	
	$scope.getAdList = function(data){
		$scope.AdList = [];
		angular.forEach(data, function(value, key){
			if(value.ads != null && value.ads != undefined){
				for(var i = 0; i< value.statistics.length;i++){
					$scope.Ads = {};
					delete value.statistics[i]['id'];
					$scope.Ads = angular.extend(angular.copy(value.ads), value.statistics[i]);
					$scope.AdList.push($scope.Ads);
				}
				if(value.statistics.length == 0){
					$scope.Ads = {};
					$scope.Ads = value.ads;
					$scope.AdList.push($scope.Ads);
				}
			}
		});
	};
	
	$scope.returnToDashboard = function(){
		$scope.showSection.AdvertisingDate = true;
		$scope.showSection.AdGroup = false;
		$scope.showSection.Ad = false;
		$(".overall").css("padding-top", "29%");
		$scope.getStatistics();
	};
	
	$scope.returnToAdGroup = function(){
		$scope.showAdGroupSection($scope.Adgroup.campaignId);
	};
	
	$scope.companyInfoObj = {};
	$scope.showCampaignSettingsModal = function(){
		$rootScope.uiMessage = "";
		$rootScope.cleanUIMessageList("spendThreshold,clickDifferentialPercent");
		$('#campaign-settings').modal({show:true,backdrop:true,help:true});
		restservice.get("", "companies/"+$scope.userObj.companyId, "CompanyAPI").then(function(data) {
			$scope.companyInfoObj = data;
        });	
	};
	
	$scope.saveCampaignSettings = function(isValid){
		if (!isValid ) return false;
		if($scope.companyInfoObj.clickDifferentialPercent > 100){
			$rootScope.uiMessage = "Click Differential Percent cannot be greater than 100%";
			return false;
		}
		else if($scope.companyInfoObj.clickDifferentialPercent < 0 || $scope.companyInfoObj.spendThreshold < 0){
			$rootScope.uiMessage = "Click Differential Percent or Spend Threshold cannot be less than 0";
			return false;
		}
		restservice.put($scope.companyInfoObj, "companies/"+$scope.userObj.companyId, "CompanyAPI").then(function(data) {
        });
		$('#campaign-settings').modal("hide");
	};
	
	$scope.AdvertisingData = {};
	$scope.showDeleteConfirmationModal = function(campaignObj){
		$scope.AdvertisingData = campaignObj;
		$scope.AdvertisingData.isDeleteRequest = true;
		$scope.AdvertisingData.isArchiveRequest = false;
		$rootScope.uiMessage = "Are you sure you wish to delete this campaign?";
		$('#modal-confirmation').modal({show:true,backdrop:true,help:true});
	};
	
	$scope.showArchiveConfirmationModal = function(campaignObj){
		$scope.AdvertisingData = campaignObj;
		$scope.AdvertisingData.isDeleteRequest = false;
		$scope.AdvertisingData.isArchiveRequest = true;
		$rootScope.uiMessage = "Are you sure you wish to archive this campaign?";
		$('#modal-confirmation').modal({show:true,backdrop:true,help:true});
	};
	
	$scope.processConfirmationRequest = function(){
		if($scope.AdvertisingData.isDeleteRequest){
			restservice.remove("","campaigns/"+$scope.AdvertisingData.id,"AdvertisingDataAPI").then(function(data) {
				$scope.getStatistics();
				$("#modal-confirmation").modal("hide");
	        });	
		}
		else if($scope.AdvertisingData.isArchiveRequest){
			restservice.post("","campaigns/"+$scope.AdvertisingData.id+"/archive","AdvertisingDataAPI").then(function(data) {
				$scope.getStatistics();
				$("#modal-confirmation").modal("hide");
	        });	
		}

	};
	
});

Controllers.controller("DateSearchCtrl", function($scope, $rootScope, $http, restservice, $cookieStore) {
	$scope.userObj = $rootScope.isLoggedIn();
	$scope.quickDateSelection = {};
	$scope.quickDateSelection.type = "";
	$scope.initializePikadayStartEndDate = function() { // Initializing Pickaday Calendar Control
		 var startDate = document.getElementById('startDate');
	        new Pikaday({
 	        field: startDate,
 	        format: 'D MMM YYYY'
 	    });
	        
	     var endDate = document.getElementById('endDate');
	        new Pikaday({
 	        field: endDate,
 	        format: 'D MMM YYYY'
 	    });
	           
        var date=new Date();
        var startDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDateOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        if(window.location.href.indexOf("daily-dashboard.html")!=-1 || window.location.href.indexOf("advertising-data.html")!=-1){
			$("#start-date-label").text("Select Date:");
			startDateOfMonth = new Date();
			lastDateOfMonth = new Date();
	    } 
        $scope.apiDates.startDate = moment(startDateOfMonth).format('D MMM YYYY');
        $scope.apiDates.endDate = moment(lastDateOfMonth).format('D MMM YYYY');
        var startDateParam = $rootScope.getParameterByName("startDate");
		var endDateParam  = $rootScope.getParameterByName("endDate");
		if(startDateParam != undefined && endDateParam != undefined){
			$scope.apiDates.startDate = moment(startDateParam).format('D MMM YYYY');
	        $scope.apiDates.endDate = moment(endDateParam).format('D MMM YYYY');
		}
        $scope.apiDates.startDateAPI = $scope.convertDateToAPIFormat(new Date($scope.apiDates.startDate));
        $scope.apiDates.endDateAPI = $scope.convertDateToAPIFormat(new Date($scope.apiDates.endDate));
        $scope.getStatistics();

	};
	
	$scope.validateDates = function(){
		$scope.validation = {};
		$scope.validation.success = "true";
		$scope.validation.message = "";
		if(($scope.apiDates.endDate == undefined || $scope.apiDates.endDate == "") && ($scope.apiDates.startDate == undefined || $scope.apiDates.startDate == "")){
			$scope.validation.message = "Please select start and end dates.";
		}
		else if($scope.apiDates.startDate == undefined || $scope.apiDates.startDate == ""){
			$scope.validation.message = "Please select start date.";
		}
		else if($scope.apiDates.endDate == undefined || $scope.apiDates.endDate == ""){
			$scope.validation.message = "Please select end date.";
		}
		
		if($scope.validation.message != ""){
			$scope.validation.success = "false";
			return $scope.validation;
		}

		$scope.apiDates.startDateAPI = $scope.convertDateToAPIFormat(new Date($scope.apiDates.startDate));
		$scope.apiDates.endDateAPI = $scope.convertDateToAPIFormat(new Date($scope.apiDates.endDate));
		
		if($scope.apiDates.startDateAPI == 'Invalid date' && $scope.apiDates.endDateAPI == 'Invalid date'){
			$scope.validation.message = "Please enter valid start and end dates.";
		}
		else if($scope.apiDates.startDateAPI == 'Invalid date'){
			$scope.validation.message = "Please enter valid start date.";
		}
		else if($scope.apiDates.endDateAPI == 'Invalid date'){
			$scope.validation.message = "Please enter valid end date.";
		}
		
		if($scope.validation.message != ""){
			$scope.validation.success = "false";
		}
		
		return $scope.validation;
	};
	
	$scope.initQuickSelection = function(){		
		$scope.quickDateSelection.type = "";
	};
	
	$scope.filterResultsBydate = function(){		
		$scope.isValidDates = $scope.validateDates();
		if($scope.isValidDates.success == "false"){
			$rootScope.uiMessage = $scope.isValidDates.message;
    		$('#modal-message').modal({show:true,backdrop:true,help:true});
			return false;
		}
		
		if(window.location.href.indexOf("daily-dashboard.html")!=-1 && $scope.quickDateSelection.type == ""){
			$scope.apiDates.endDateAPI = $scope.apiDates.startDateAPI;
	    }
		
		$scope.getStatistics();
	};
	
	$scope.convertDateToAPIFormat = function(date){
		return moment(date).format('YYYY-MM-DD');
	};
	
	$scope.handleQuickDateSelection = function(){
		var date=new Date();
        var from =  new Date();;
        var to = new Date();;
 
		if($scope.quickDateSelection.type == "Today"){
			from = new Date();
			to = new Date();
		}
		else if($scope.quickDateSelection.type == "Yesterday"){
			from = new Date();
			from.setDate(from.getDate() - 1);
			to = from;
		}
		else if($scope.quickDateSelection.type == "WeektoDate"){
			from = moment().startOf('week').toDate();
			to = new Date();
		}
		else if($scope.quickDateSelection.type == "MonthtoDate"){
			from = new Date(date.getFullYear(), date.getMonth(), 1);
			to = new Date();
		}
		else if($scope.quickDateSelection.type == "LastMonth"){
			from = new Date(date.getFullYear(), date.getMonth()-1, 1);
			to = new Date(date.getFullYear(), date.getMonth(), 0);
		}

		$scope.apiDates.startDate = moment(from).format('D MMM YYYY');
        $scope.apiDates.endDate = moment(to).format('D MMM YYYY');
        $scope.apiDates.startDateAPI = $scope.convertDateToAPIFormat(new Date($scope.apiDates.startDate));
        $scope.apiDates.endDateAPI = $scope.convertDateToAPIFormat(new Date($scope.apiDates.endDate));

	};
	
});

Controllers.controller("ManageAccountCtrl", function($scope, $rootScope, $http, restservice, $cookieStore) {
	$scope.userObj = $rootScope.isLoggedIn();
	$scope.userCompanyList = [];
	$rootScope.uiMessage = "";
	$scope.user = {};
	
	$scope.getUserAndCompany = function() {
		$scope.userCompanyList = [];
		restservice.get("", "users/"+$scope.userObj.username+"/companies", "UserAPI").then(function(data) {
			$scope.userCompanyList = data;
        });	
		restservice.get("", "companies/"+$scope.userObj.companyId+"/users", "CompanyAPI").then(function(result) {
			for(var j = 0;j < result.length; j++){
		 		if(result[j].username == $scope.userObj.username){
		 			$scope.user = result[j];
		 		}
		 	}		 				
        });
		
	};
	
	$scope.showDeleteConfirmationModal = function(user){
		$scope.userObj = $rootScope.isLoggedIn();
		$rootScope.uiMessage = "Are you sure you want to disable this account?";
		$('#modal-confirmation').modal({show:true,backdrop:true,help:true});
	};
	
	$scope.processConfirmationRequest = function(){
		$scope.userCompany = {};
		$scope.userCompany.userId = $scope.user.id;
		$scope.userCompany.companyId = $scope.userObj.companyId;
		$scope.userCompany.admin = $scope.userObj.admin;
		$scope.userCompany.status = 'Disabled';
		restservice.put($scope.userCompany, "companies/"+$scope.userObj.companyId+"/users/"+$scope.user.username, "CompanyAPI").then(function(result1) {
			$scope.user.cancelled = true;
			restservice.put($scope.user, "users/"+$scope.user.username, "UserAPI").then(function(result) {
				$scope.user.status = 'Disabled';
				$("#modal-confirmation").modal("hide");
				$cookieStore.remove("__ccbh");
	        });	
        });
	};
	
	$scope.userToEdit = {};
    $scope.showEditUserModal = function(){
    	$scope.userObj = $rootScope.isLoggedIn();
    	$scope.userToEdit = {};
    	$scope.userToEdit = angular.copy($scope.user);
    	$scope.userToEdit.confirmPassword = null;
    	$rootScope.cleanUIMessageList("password,confirmPassword,emailAddress");
    	$rootScope.uiMessage = "";
    	$('#edit-user').modal({show:true,backdrop:true,help:true});
    };
    
    $scope.editUser = function(isValid){
    	if (!isValid) return false;
    	
    	if($scope.validateEditUserForm() == false) return false;
    	
    	if($scope.userToEdit.password != null && $scope.userToEdit.password != "" )
    		$scope.userToEdit.password = CryptoJS.MD5($scope.userToEdit.password).toString();
    	restservice.get("", "users/?email="+$scope.userToEdit.emailAddress, "UserAPI").then(function(data) {
			if(data[0] == undefined || data[0].id == $scope.userToEdit.id){
				delete $scope.userToEdit['confirmPassword'];
				restservice.put($scope.userToEdit, "users/"+$scope.userToEdit.username, "UserAPI").then(function(result) {
 					$scope.userObj.password= $scope.userToEdit.password;
 					$cookieStore.put("__ccbh",$scope.userObj);
 					$rootScope.username = $scope.userToEdit.username;
 					$rootScope.password = $scope.userToEdit.password;
 					$rootScope.addUsernamePasswordRequestHeaders();
					$scope.getUserAndCompany();
					$("#edit-user").modal("hide");
		        });	
			}
			else{
				$rootScope.uiMessage = "This Email Address is already exist ";
			}
        });
    };
    
	$scope.validateEditUserForm = function() {
		var valid = true;
		$rootScope.uiMessage = "";
		if($scope.userToEdit.password == "")
			$scope.userToEdit.password = null;
		if($scope.userToEdit.confirmPassword == "")
			$scope.userToEdit.confirmPassword = null;
		
		var result = angular.equals($scope.userToEdit.confirmPassword, $scope.userToEdit.password);
		if(!result){
			valid = false;
			$rootScope.uiMessage = "Password and Confirm Pasword doesn't match!";
		}
		return valid;
	};

	$scope.getUserAndCompany();

});
