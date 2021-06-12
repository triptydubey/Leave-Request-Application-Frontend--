sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, JSONModel) {
		"use strict";

		return Controller.extend("leaveappfrontend.controller.employee", {
			onInit: function () {
				var obj = JSON.parse(sessionStorage.userData);
				var oView=this.getView();
				oView.byId("employee").setTitle("Welcome " + obj.firstName + " " +obj.lastName);
			},
			onMoveToViewLeaveRequests: function() {
				//sessionStorage.setItem("userData", JSON.stringify(data));
                var obj = JSON.parse(sessionStorage.userData);
                var userId = obj.employeeId;
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("employeeLeaveRequestsRoute", { employeeId: userId});
                },
                
            onMoveToCreateLeaveRequest: function() {
				//sessionStorage.setItem("userData", JSON.stringify(data));
                var obj = JSON.parse(sessionStorage.userData);
                var userId = obj.employeeId;
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("employeeCreateLeaveRequestRoute", { employeeId: userId});
				},

			onPressLogout: function(){
				sessionStorage.clear();
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("RouteView1", {
				});
			}
		
			});
	});