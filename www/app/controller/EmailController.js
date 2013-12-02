/*
 * File: app/controller/EmailController.js
 *
 * This file was generated by Sencha Architect version 2.2.3.
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

Ext.define('Rubedo.controller.EmailController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.EmailController',

    onNewETRowBtnClick: function(button, e, eOpts) {
        var newRow=Ext.widget("panel",{
            type:"row",
            flex:1
        });
        Ext.getCmp("mainETHolder").add(newRow);
    },

    onMainETContainerAfterRender: function(component, eOpts) {
        component.getEl().on("click", function(){
            Ext.getCmp("elementETIdField").setValue(component.getComponent(0).getId());
        });
    },

    onMainETHolderAfterRender: function(component, eOpts) {
        component.getEl().on("click", function(e){
            Ext.getCmp("elementETIdField").setValue(component.getId());
            e.stopEvent();
        });
    },

    onElementETIdFieldChange: function(field, newValue, oldValue, eOpts) {
        if (!Ext.isEmpty(oldValue)){
            var oldOne=Ext.getCmp(oldValue);
            if (!Ext.isEmpty(oldOne)){
                oldOne.removeBodyCls('selectedelement');
            }
        }
        if (!Ext.isEmpty(newValue)){
            var newOne=Ext.getCmp(newValue);
            if (!Ext.isEmpty(newOne)){
                newOne.getEl().frame(MyPrefData.themeColor);
                newOne.addBodyCls('selectedelement');
            }
        } else {

        }
        console.log(newValue);
    },

    init: function(application) {
        this.control({
            "#newETRowBtn": {
                click: this.onNewETRowBtnClick
            },
            "#mainETContainer": {
                afterrender: this.onMainETContainerAfterRender
            },
            "#mainETHolder panel": {
                afterrender: this.onMainETHolderAfterRender
            },
            "#elementETIdField": {
                change: this.onElementETIdFieldChange
            }
        });
    }

});