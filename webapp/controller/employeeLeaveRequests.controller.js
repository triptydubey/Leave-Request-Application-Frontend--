sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,JSONModel) {
        "use strict";

		return Controller.extend("leaveappfrontend.controller.employeeLeaveRequests", {

			onInit: function () {

                //So that page gets refreshed everytime
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.attachRouteMatched(this.onRouteMatched, this);            
            },

            onRouteMatched: function(oEvent)
            {
                var obj = JSON.parse(sessionStorage.userData);
                var userId = obj.employeeId; 
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

            onPressDelete : function(oEvent)
            {
                var leaveDetails = (oEvent.getSource().getBindingContext().getObject());
                var leaveId = leaveDetails.id;
                var oModel;
                $.ajax({
                    type : "DELETE",
                    contentType : "application/json",
                    url : "https://leaveapplication-agile-reedbuck-os.cfapps.us10.hana.ondemand.com/leaveRequest/" + leaveId,
                    dataType : "json",
                    async: false, 
                    success : function(data,textStatus, jqXHR) {
                    
                        oModel = new JSONModel({ myItems : data});
                        window.alert("sucess");
                    },
                    error : function(err)
                    {
                        window.alert(err.responseJSON.message);
                    }
                });
                this.getView().setModel(oModel);
            },

            onPressEdit : function(oEvent)
            {
                var leaveDetails = (oEvent.getSource().getBindingContext().getObject());
                sessionStorage.setItem("leaveDetails", JSON.stringify(leaveDetails));
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("editEmpLeaveRequestRoute", { leaveId: leaveDetails.id});
                console.log("success");
            },

            onPressBack: function()
            {
                var obj = JSON.parse(sessionStorage.userData);
                var userId = obj.employeeId;
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("employeeRoute", { employeeId: userId});
            }
		
	});
});