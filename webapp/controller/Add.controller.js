sap.ui.define([
    'com/emc/fin/ap/controller/BaseController',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageBox',
    'sap/m/MessageToast'
], function(BaseController,JSONModel, MessageBox,MessageToast) {
    'use strict';
    return BaseController.extend("com.emc.fin.ap.controller.Add",{
        onInit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("add").attachMatched(this.herculis, this);

            this.oLocalModel = new JSONModel();
            this.oLocalModel.setData({
                "prodData": {
                    "PRODUCT_ID": "",
                    "TYPE_CODE": "",
                    "CATEGORY": "Notebooks",
                    "NAME": "",
                    "DESCRIPTION": "",
                    "SUPPLIER_ID": "0100000051",
                    "SUPPLIER_NAME": "TECUM",
                    "TAX_TARIF_CODE": "1",
                    "MEASURE_UNIT": "EA",
                    "PRICE": "0.00",
                    "CURRENCY_CODE": "EUR",
                    "DIM_UNIT": "CM",
                    "PRODUCT_PIC_URL": "/sap/public/bc/NWDEMO_MODEL/IMAGES/NV-2022.jpg"
                }
            });
            this.getView().setModel(this.oLocalModel,"prod");
        },
        herculis: function(oEvent){
            this.setMode("Create");
        },
        mode: "Create",
        setMode: function(sMode){
            this.mode = sMode;
            if(this.mode === "Create"){
                this.getView().byId("idSave").setText("Save");
                this.getView().byId("idDelete").setEnabled(false);
                this.getView().byId("prodId").setEnabled(true);
            }else{
                this.getView().byId("idSave").setText("Update");
                this.getView().byId("idDelete").setEnabled(true);
                this.getView().byId("prodId").setEnabled(false);
            }
        },
        productId: "",
        onEnter: function(oEvent){
            //Step 1: Get the value entered by user on input field
            this.productId = oEvent.getParameter("value");
            //Step 2: get the OData Model object
            var oDataModel = this.getView().getModel();
            //Step 3: Call teh SAP OData to read single product
            //Since this pointer inside the callback cannot point to the controller object
            //we need to create a local variable which holds this object - https://www.youtube.com/watch?v=RMsTYQe_3Jg
            var that = this;
            //GET - Get Single Entity - pasing key
            oDataModel.read("/ProductSet('" + this.productId + "')",{
                success: function(data){
                    that.oLocalModel.setProperty("/prodData", data);
                    that.setMode("Update");
                },
                error: function(oError){
                    MessageToast.show("Product not found, please create it");
                    that.setMode("Create");
                }
            })
            //Step 4: Handle the callback

        },
        onDelete: function(){
            //Step 1: Get the value from UI for the product ID
            //var productId = this.oLocalModel.getProperty("/prodData/PRODUCT_ID");
            //Step 2: Validate - if product id is empty - error
            if(this.productId === ""){
                MessageBox.error("Please enter a valid product id for delete");
                return;
            }
            //Step 3: Get The odata Model object
            var oDataModel = this.getView().getModel();
            //Step 4: Take confirmation from user
            var that = this;
            MessageBox.confirm("Do you wish to delete?",{
                onClose: function(status){
                    if(status === "OK"){
                        var that2 = that;
                        oDataModel.remove("/ProductSet('" + that.productId + "')",{
                            success: function(){
                                MessageBox.confirm("Delete is now done");
                                that2.onClear();
                            }
                        });
                    }
                }
            });
            //Step 5: Fire delete request to SAP
            //Step 6: Handle success and inform user
        },
        onExpensive: function(){
            //Step 1: get the category from the UI
            var category = this.getView().byId("category").getSelectedKey();
            //Step 2: get the odata model object
            var oDataModel = this.getView().getModel();
            //Step 3: call function import
            var that = this;
            oDataModel.callFunction("/GetMostExpensiveProduct",{
                urlParameters: {
                    "I_CATEGORY" : category
                },
                success : function(data){
                    that.oLocalModel.setProperty("/prodData", data);
                    that.productId = data.PRODUCT_ID;
                    that.setMode("Update");
                }
            });
            //Step 4: set data to local model in callback
        },
        onSave: function(){
            //Step 1: Prepare payload
            var payload = this.oLocalModel.getProperty("/prodData");
            //Step 2: Pre-checks
            if(payload.PRODUCT_ID === ""){
                MessageBox.error("Please enter a valid new product Id");
                return;
            }
            //Step 3: Get the odata model object
            var oDataModel = this.getView().getModel();
            //Step 4: post this data to backend
            if(this.mode === "Create"){
                //POST
                oDataModel.create("/ProductSet", payload,{
                    //Step 5: get the response - success, error
                    success: function(data){
                        MessageToast.show("Congratulations! The data has been posted to SAP");
                    },
                    error: function(oError){
                        //debugger;
                        MessageBox.error(JSON.parse(oError.responseText).error.innererror.errordetails[0].message);
                    }
                });
            }else{
                //PUT
                oDataModel.update("/ProductSet('" + this.productId + "')", payload,{
                    //Step 5: get the response - success, error
                    success: function(data){
                        MessageToast.show("Hey Amigo, The data has been updated");
                    },
                    error: function(oError){
                        //debugger;
                        MessageBox.error(JSON.parse(oError.responseText).error.innererror.errordetails[0].message);
                    }
                });
            }
        },
        onClear: function(){
            this.setMode("Create");
            this.oLocalModel.setProperty("/prodData",{
                "PRODUCT_ID": "",
                "TYPE_CODE": "",
                "CATEGORY": "Notebooks",
                "NAME": "",
                "DESCRIPTION": "",
                "SUPPLIER_ID": "0100000051",
                "SUPPLIER_NAME": "TECUM",
                "TAX_TARIF_CODE": "1",
                "MEASURE_UNIT": "EA",
                "PRICE": "0.00",
                "CURRENCY_CODE": "EUR",
                "DIM_UNIT": "CM",
                "PRODUCT_PIC_URL": "/sap/public/bc/NWDEMO_MODEL/IMAGES/NV-2022.jpg"
            });
        }
    });
});