sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,JSONModel) {
        "use strict";

		return Controller.extend("leaveappfrontend.controller.detailsLeaveRequests", {

			onInit: function () {

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.attachRouteMatched(this.onRouteMatched, this);                                
            },

            onRouteMatched: function(oEvent)
            {
                var leaveDetails = JSON.parse(sessionStorage.leaveDetails);
                this.getView().byId("ownerIdInput").setValue(leaveDetails.ownerId);
                this.getView().byId("leaveTypeInput").setValue(leaveDetails.leaveType);
                this.getView().byId("startDateInput").setValue(leaveDetails.startDate);
                this.getView().byId("endDateInput").setValue(leaveDetails.endDate);
                this.getView().byId("durationInput").setValue(leaveDetails.duration);
                this.getView().byId("noteInput").setValue(leaveDetails.note);
                this.getView().byId("statusInput").setValue(leaveDetails.status);
                this.getView().byId("approverNameInput").setValue(leaveDetails.approverName);

                var employeeId = leaveDetails.ownerId; 
                var oModel;
                $.ajax({
                    type : "GET",
                    contentType : "application/json",
                    url : "https://leaveapplication-agile-reedbuck-os.cfapps.us10.hana.ondemand.com/employee/" + employeeId,
                    dataType : "json",
                    async: false, 
                    success : function(data,textStatus, jqXHR) {
                        sessionStorage.setItem("userData", JSON.stringify(data));
                    },

                    error : function(err)
                    {
                        window.alert(err.responseJSON.message);
                        
                    }
                });
                var empDetails = JSON.parse(sessionStorage.userData);
                this.getView().byId("employeeIdInput").setValue(empDetails.employeeId);
                this.getView().byId("firstNameInput").setValue(empDetails.firstName);
                this.getView().byId("lastNameInput").setValue(empDetails.lastName);
                this.getView().byId("emailIdInput").setValue(empDetails.emailId);
                this.getView().byId("designationInput").setValue(empDetails.designation);
                this.getView().byId("phoneNumberInput").setValue(empDetails.phoneNumber); 
            },

            onPressBack : function()
            {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("allLeaveRequestsRoute", { 
                });
            }
        });
		
	});