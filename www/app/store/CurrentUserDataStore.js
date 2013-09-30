/*
 * File: app/store/CurrentUserDataStore.js
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

Ext.define('Rubedo.store.CurrentUserDataStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CurrentUserDataStore',

    requires: [
        'Rubedo.model.userDataModel'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            autoSync: true,
            model: 'Rubedo.model.userDataModel',
            storeId: 'CurrentUserDataStore',
            proxy: {
                type: 'ajax',
                api: {
                    create: 'current-user/create',
                    read: 'current-user',
                    update: 'current-user/update',
                    destroy: 'current-user/delete'
                },
                reader: {
                    type: 'json',
                    messageProperty: 'message',
                    root: 'data'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                }
            },
            listeners: {
                load: {
                    fn: me.onJsonstoreLoad,
                    single: true,
                    scope: me
                },
                update: {
                    fn: me.onJsonstoreUpdate,
                    scope: me
                }
            }
        }, cfg)]);
    },

    onJsonstoreLoad: function(store, records, successful, eOpts) {

        var mode=records[0].get("interfaceMode");
        if ((!Ext.isEmpty(mode))&&(mode=="simple")){
            MyPrefData.simpleMode=true;
            Rubedo.controller.InterfaceController.prototype.setSimpleInterfaceMode();
        }
        Rubedo.controller.LocalisationController.prototype.updateLocalisationSingletons();
        if (!Ext.isEmpty(Ext.getCmp("workingLanguageField"))){
            var myLanguage=records[0].get("workingLanguage");
            if(Ext.isEmpty(Ext.getStore("AllLanguagesStore3").findRecord("locale",myLanguage))){
                myLanguage=Ext.getStore("AllLanguagesStore3").getRange()[0].get("locale");
            }
            Ext.getCmp("workingLanguageField").setValue(myLanguage);
        }
    },

    onJsonstoreUpdate: function(store, record, operation, modifiedFieldNames, eOpts) {
        if ((!Ext.isEmpty(modifiedFieldNames))&&(!Ext.isEmpty(Ext.Array.intersect(modifiedFieldNames,["workingLanguage","language","interfaceMode"])))){
            Ext.Msg.confirm(Rubedo.RubedoAutomatedElementsLoc.warningTitle, Rubedo.RubedoAutomatedElementsLoc.boReloadRequired ,function(anser){
                if (anser=="yes"){
                    window.onbeforeunload=Ext.emptyFn;
                    window.location.href="login";
                }
            });

        }
    }

});