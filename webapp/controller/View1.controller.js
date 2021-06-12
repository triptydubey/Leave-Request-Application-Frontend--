sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("leaveappfrontend.controller.View1", {
			onInit: function () {

			},
			onLoginTap: function() {
				var role = this.getView().byId("rid").getValue();
				if (role=="Employee" || role=="employee") {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					var userId = this.getView().byId("uid").getValue();
					$.ajax({
						type : "GET",
						contentType : "application/json",
						url : "https://leaveapplication-agile-reedbuck-os.cfapps.us10.hana.ondemand.com/employee/" + userId,
						dataType : "json",
						success : function(data,textStatus, jqXHR) {
							
							sessionStorage.setItem("userData", JSON.stringify(data));
						//var obj = JSON.parse(sessionStorage.user););
						
							oRouter.navTo("employeeRoute", { employeeId: userId});
						},

						error : function(err)
						{
							window.alert(err.responseJSON.message);
							
						}				
   					
                     });
				  }
				else if(role=="Manager" || role=="manager"){
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("managerRoute", { 
					});
                }
                else{
                    window.alert("Please enter a valid role - Employee or Manager");
                }
			}
		});
	});
