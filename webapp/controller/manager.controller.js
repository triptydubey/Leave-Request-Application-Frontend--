sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("leaveappfrontend.controller.manager", {
			onInit: function () {

			},
			moveToViewLeaveRequests: function() {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("allLeaveRequestsRoute", { 
                });
            },
            moveToListOfEmployees: function() {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("allEmployeesRoute", { 
                });
			},
			onPressLogout: function(){
				sessionStorage.clear();
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("RouteView1", {
				});
			}
		});
	});
