sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,JSONModel) {
        "use strict";

		return Controller.extend("leaveappfrontend.controller.editEmployees", {

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
            },

            onSave: function () {

                var empDetails = JSON.parse(sessionStorage.empDetails);
                var empId = empDetails.employeeId;
                var firstName1 = this.getView().byId("firstNameInput").getValue();
                var lastName1 = this.getView().byId("lastNameInput").getValue();
                var emailId1 = this.getView().byId("emailIdInput").getValue();
                var designation1 = this.getView().byId("designationInput").getValue();
                var phoneNumber1 = this.getView().byId("phoneNumberInput").getValue();

                var editEmployee = {
                    "firstName" : firstName1,
                    "lastName" : lastName1,
                    "emailId" : emailId1,
                    "designation" : designation1,
                    "phoneNumber" : phoneNumber1
                }
                console.log("reached");
                $.ajax({
                    type : "PUT",
                    contentType : "application/json",
                    data : JSON.stringify(editEmployee),
                    url : "https://leaveapplication-agile-reedbuck-os.cfapps.us10.hana.ondemand.com/employee/" + empId ,
                    dataType : "json",
                    async : false,
                    success : function(data,textStatus, jqXHR) {
                        
                        window.alert("Success");
                    },
                    error : function(err)
					{
					    window.alert(err.responseJSON.message);
							
					}
                });

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("allEmployeesRoute", { 
                });
            },

            onCancel : function()
            {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("allEmployeesRoute", { 
                });
            }
        });
		
	});