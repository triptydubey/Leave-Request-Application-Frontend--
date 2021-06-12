sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,JSONModel) {
        "use strict";

		return Controller.extend("leaveappfrontend.controller.editEmpLeaveRequest", {

			onInit: function () {

                //So that page gets refreshed everytime
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.attachRouteMatched(this.onRouteMatched, this); 
                               
            },

            onRouteMatched: function(oEvent)
            {
                var leaveDetails = JSON.parse(sessionStorage.leaveDetails);
                this.getView().byId("leaveTypeInput").setValue(leaveDetails.leaveType);
                this.getView().byId("startDateInput").setValue(leaveDetails.startDate);
                this.getView().byId("endDateInput").setValue(leaveDetails.endDate);
                this.getView().byId("durationInput").setValue(leaveDetails.duration);
                this.getView().byId("noteInput").setValue(leaveDetails.note);
                this.getView().byId("approverInput").setValue(leaveDetails.approverName);
                this.getView().byId("statusInput").setValue(leaveDetails.status);
            },

            onSave: function () {

                var obj = JSON.parse(sessionStorage.leaveDetails);
                var leaveId = obj.id;
                var userId = obj.ownerId;
                var leaveType = this.getView().byId("leaveTypeInput").getValue();
                var duration = this.getView().byId("durationInput").getValue();
                var startDate = this.getView().byId("startDateInput").getValue();
                var endDate = this.getView().byId("endDateInput").getValue();
                var note = this.getView().byId("noteInput").getValue();

                var leaveRequest = {
                    "startDate" : startDate,
                    "endDate" : endDate,
                    "duration" : duration,
                    "leaveType" : leaveType,
                    "note" : note
                }
                console.log("reached");
                $.ajax({
                    type : "PUT",
                    contentType : "application/json",
                    data : JSON.stringify(leaveRequest),
                    url : "https://leaveapplication-agile-reedbuck-os.cfapps.us10.hana.ondemand.com/leaveRequest/" + leaveId ,
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
				oRouter.navTo("employeeLeaveRequestsRoute", { employeeId: userId});
            },

            onCancel : function()
            {
                var obj = JSON.parse(sessionStorage.leaveDetails);
                var leaveId = obj.id;
                var userId = obj.ownerId;
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("employeeLeaveRequestsRoute", { employeeId: userId});
            }
        });
		
	});