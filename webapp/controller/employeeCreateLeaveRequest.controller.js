sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("leaveappfrontend.controller.employeeCreateLeaveRequest", {
			onInit: function () {

			},
			onSave: function() {
				
                    var obj = JSON.parse(sessionStorage.userData);
                    var ownerId = obj.employeeId;
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

					$.ajax({
						type : "POST",
                        contentType : "application/json",
                        data : JSON.stringify(leaveRequest),
						url : "https://leaveapplication-agile-reedbuck-os.cfapps.us10.hana.ondemand.com/employee/" + ownerId + "/leaveRequest" ,
						dataType : "json",
						async : false,
						success : function(data,textStatus, jqXHR) {
                            
                            window.alert(data);
						},

						error : function(err)
						{
							window.alert(err.responseJSON.message);
							
						}
					});
					this.getView().byId("leaveTypeInput").setValue("");
					this.getView().byId("startDateInput").setValue("");
					this.getView().byId("endDateInput").setValue("");
					this.getView().byId("durationInput").setValue("");
					this.getView().byId("noteInput").setValue("");
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                	oRouter.navTo("employeeRoute", { employeeId: ownerId});
				},

				onCancel : function()
				{
					var obj = JSON.parse(sessionStorage.userData);
					var ownerId = obj.employeeId;
					this.getView().byId("leaveTypeInput").setValue("");
					this.getView().byId("startDateInput").setValue("");
					this.getView().byId("endDateInput").setValue("");
					this.getView().byId("durationInput").setValue("");
					this.getView().byId("noteInput").setValue("");
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("employeeRoute", { employeeId: ownerId});
				}
			});
			
    });
