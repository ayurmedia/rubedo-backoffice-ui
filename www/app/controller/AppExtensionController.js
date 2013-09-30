/*
 * File: app/controller/AppExtensionController.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Rubedo.controller.AppExtensionController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.AppExtensionController',

    onLaunch: function() {
        var me=this;
        Ext.Ajax.request({
            url: 'app-extension',
            method:'GET',
            params: {
            },
            success: function(response){
                var extensionConfigs = Ext.JSON.decode(response.responseText).data;
                Ext.Array.forEach(extensionConfigs,function(extension){
                    me.processAppExtensions(extension);
                });

            },
            failure:function(response){
                Ext.Msg.alert(Rubedo.RubedoAutomatedElementsLoc.errorTitle, "Failed to retrieve extensions");
            }
        });
    },

    processAppExtensions: function(extensionConfigs) {
        var me=this;
        if (!Ext.isEmpty(extensionConfigs)){
            //get extension name
            var myName=extensionConfigs.extensionName;
            //get models
            if(!Ext.isEmpty(extensionConfigs.models)){
                Ext.Array.forEach(extensionConfigs.models, function(model){
                    Ext.syncRequire("app.appextensions."+myName+".model."+model);
                });
            }
            //get stores
            if(!Ext.isEmpty(extensionConfigs.stores)){
                Ext.Array.forEach(extensionConfigs.stores, function(store){
                    Ext.syncRequire("app.appextensions."+myName+".store."+store);
                    var newStore=Ext.create("Rubedo.store."+store);
                    me.getController("MainStoresController").registerStore(newStore);
                });
            }
            //get views
            if(!Ext.isEmpty(extensionConfigs.views)){
                Ext.Array.forEach(extensionConfigs.views, function(view){
                    Ext.syncRequire("app.appextensions."+myName+".view."+view);
                });
            }

            //get controllers
            if(!Ext.isEmpty(extensionConfigs.controllers)){
                Ext.Array.forEach(extensionConfigs.controllers, function(controller){
                    Ext.syncRequire("app.appextensions."+myName+".controller."+controller);
                    me.getController(controller).init();
                    me.getController(controller).onLaunch();
                });
            }

            //register launch buttons
            if(!Ext.isEmpty(extensionConfigs.launchButtons)){
                Ext.Object.each(extensionConfigs.launchButtons, function(key, value, myself) {
                    AppExtensions.launchButtons[key]=Ext.Array.merge(AppExtensions.launchButtons[key],value);
                });
            }
        }
    },

    init: function(application) {
        Ext.define('AppExtensions', {
            singleton:true,
            launchButtons:{
                studio: [ ],
                administration:[ ]
            }
        });
    }

});
