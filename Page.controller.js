sap.ui.define(['jquery.sap.global', 'sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel'], function(jQuery, Controller) {
	"use strict";

	var PageController = Controller.extend("sap.m.sample.TileContainer.Page", {
		onInit: function() {
				var that = this;
				var sServiceUrl = "/rim/api/rim-analytics.svc";
				var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl);
				var oJsonModel = new sap.ui.model.json.JSONModel();
				
				oModel.read("/Sensors", null, null, true, function(oData) {
					oJsonModel.setData(oData);
					console.log(oData.results);
				});
				that.getView().setModel(oJsonModel,"JModel");
				this.getView().byId("container").setModel(this.getView().getModel("JModel"));
				
					
		
		},

		handleEditPress: function(evt) {
			var oTileContainer = this.getView().byId("container");
			var newValue = !oTileContainer.getEditable();
			oTileContainer.setEditable(newValue);
			evt.getSource().setText(newValue ? "Done" : "Edit");
		},

		handleBusyPress: function(evt) {
			var oTileContainer = this.getView().byId("container");
			var newValue = !oTileContainer.getBusy();
			oTileContainer.setBusy(newValue);
			evt.getSource().setText(newValue ? "Done" : "Busy state");
		},

		handleTileDelete: function(evt) {
			var tile = evt.getParameter("tile");
			evt.getSource().removeTile(tile);
		}
	});

	return PageController;

});