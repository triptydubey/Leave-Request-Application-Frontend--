sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,JSONModel) {
        "use strict";

		return Controller.extend("leaveappfrontend.controller.detailsEmployees", {

			onInit: function () {

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.attachRouteMatched(this.onRouteMatched, this);                                
            },

            onRouteMatched: function(oEvent)
            {
                var empDetails = JSON.parse(sessionStorage.empDetails);
                this.getView().byId("employeeIdInput").setValue(empDetails.employeeId);
                this.getView().byId("firstNameInput").setValue(empDetails.firstName);
                this.getView().byId("lastNameInput").setValue(empDetails.lastName);
                this.getView().byId("emailIdInput").setValue(empDetails.emailId);
                this.getView().byId("designationInput").setValue(empDetails.designation);
                this.getView().byId("phoneNumberInput").setValue(empDetails.phoneNumber);

                var userId = empDetails.employeeId; 
                var oModel;
                $.ajax({
                    type : "GET",
                    contentType : "application/json",
                    url : "https://leaveapplication-agile-reedbuck-os.cfapps.us10.hana.ondemand.com/leaveRequest/" + userId,
                    dataType : "json",
                    async: false, 
                    success : function(data,textStatus, jqXHR) {
                        oModel = new JSONModel({ myItems : data});
                    },

                    error : function(err)
                    {
                        window.alert(err.responseJSON.message);
                        
                    }
                });
                this.getView().setModel(oModel);   
            },

            onPressBack : function()
            {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("allEmployeesRoute", { 
                });
            }
        });
		
	});