sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,JSONModel) {
        "use strict";

		return Controller.extend("leaveappfrontend.controller.addEmployees", {

			onInit: function () {

            },

            onSave: function () {

                //var employeeId1 = this.getView().byId("employeeIdInput").getValue();
                var firstName1 = this.getView().byId("firstNameInput").getValue();
                var lastName1 = this.getView().byId("lastNameInput").getValue();
                var emailId1 = this.getView().byId("emailIdInput").getValue();
                var designation1 = this.getView().byId("designationInput").getValue();
                var phoneNumber1 = this.getView().byId("phoneNumberInput").getValue();

                var addEmployee = {
                    "firstName" : firstName1,
                    "lastName" : lastName1,
                    "emailId" : emailId1,
                    "designation" : designation1,
                    "phoneNumber" : phoneNumber1
                }
                console.log("reached");
                $.ajax({
                    type : "POST",
                    contentType : "application/json",
                    data : JSON.stringify(addEmployee),
                    url : "https://leaveapplication-agile-reedbuck-os.cfapps.us10.hana.ondemand.com/newEmployee/",
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

                this.getView().byId("firstNameInput").setValue("");
                this.getView().byId("lastNameInput").setValue("");
                this.getView().byId("emailIdInput").setValue("");
                this.getView().byId("designationInput").setValue("");
                this.getView().byId("phoneNumberInput").setValue("");
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("allEmployeesRoute", { 
                });
            },

            onCancel : function()
            {
                this.getView().byId("firstNameInput").setValue("");
                this.getView().byId("lastNameInput").setValue("");
                this.getView().byId("emailIdInput").setValue("");
                this.getView().byId("designationInput").setValue("");
                this.getView().byId("phoneNumberInput").setValue("");
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("allEmployeesRoute", { 
                });
            }
        });
		
	});