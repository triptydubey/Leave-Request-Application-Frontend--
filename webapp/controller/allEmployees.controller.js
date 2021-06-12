sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,JSONModel) {
        "use strict";

		return Controller.extend("leaveappfrontend.controller.allEmployees", {

			onInit: function () {

                //So that page gets refreshed everytime
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.attachRouteMatched(this.onRouteMatched, this);            
            },

            onRouteMatched: function(oEvent)
            {
                var oModel;
                $.ajax({
                    type : "GET",
                    contentType : "application/json",
                    url : "https://leaveapplication-agile-reedbuck-os.cfapps.us10.hana.ondemand.com/getAllEmployees",
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

            moveToAddEmployee: function()
            {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("addEmployeesRoute", { 
					});
            },

            onPressDelete : function(oEvent)
            {
                var empDetails = (oEvent.getSource().getBindingContext().getObject());
                var empId = empDetails.employeeId;
                var oModel;
                $.ajax({
                    type : "DELETE",
                    contentType : "application/json",
                    url : "https://leaveapplication-agile-reedbuck-os.cfapps.us10.hana.ondemand.com/employee/" + empId,
                    dataType : "json",
                    async: false, 
                    success : function(data,textStatus, jqXHR) {
                        //window.alert("sucess");
                        oModel = new JSONModel({ myItems : data});
                    },
                    error : function(err)
                    {
                        //window.alert(err.responseJSON.message);
                    }
                });
                this.getView().setModel(oModel);
            },

            onPressEdit : function(oEvent)
            {
                var empDetails = (oEvent.getSource().getBindingContext().getObject());
                sessionStorage.setItem("empDetails", JSON.stringify(empDetails));
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("editEmployeesRoute", { employeeId: empDetails.employeeId});
                console.log("success");
            },

            onPressDetails : function(oEvent)
            {
                var empDetails = (oEvent.getSource().getBindingContext().getObject());
                sessionStorage.setItem("empDetails", JSON.stringify(empDetails));
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("detailsEmployeesRoute", { employeeId: empDetails.employeeId});
                console.log("success");
            },

            onPressBack: function()
            {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("managerRoute", { 
					});
            }
		
	});
});