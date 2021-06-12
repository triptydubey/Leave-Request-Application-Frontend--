sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,JSONModel) {
        "use strict";

		return Controller.extend("leaveappfrontend.controller.allLeaveRequests", {

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
                    url : "https://leaveapplication-agile-reedbuck-os.cfapps.us10.hana.ondemand.com/getAllLeaveRequests",
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

            onPressAccept : function(oEvent)
            {
                var leaveDetails = (oEvent.getSource().getBindingContext().getObject());
                var leaveId = leaveDetails.id;
                var oModel;
                var acceptLeaveRequest = {
                    "status" : "Accepted"
                }
                $.ajax({
                    type : "PUT",
                    contentType : "application/json",
                    data : JSON.stringify(acceptLeaveRequest),
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

            onPressReject : function(oEvent)
            {
                var leaveDetails = (oEvent.getSource().getBindingContext().getObject());
                var leaveId = leaveDetails.id;
                var oModel;
                var acceptLeaveRequest = {
                    "status" : "Rejected"
                }
                $.ajax({
                    type : "PUT",
                    contentType : "application/json",
                    data : JSON.stringify(acceptLeaveRequest),
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

            onPressDetails : function(oEvent)
            {
                var leaveDetails = (oEvent.getSource().getBindingContext().getObject());
                sessionStorage.setItem("leaveDetails", JSON.stringify(leaveDetails));
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("detailsLeaveRequestsRoute", { leaveId: leaveDetails.id});
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