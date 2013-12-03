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
            eType:"row",
            plugins:[Ext.create("Ext.ux.BoxReorderer")],
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            flex:1
        });
        Ext.getCmp(Ext.getCmp("elementETIdField").getValue()).add(newRow);
        newRow.getEl().dom.click();
    },

    onMainETContainerAfterRender: function(component, eOpts) {
        component.getComponent(0).addBodyCls('contrastEMBorder');
        component.getEl().on("click", function(){
            Ext.getCmp("elementETIdField").setValue(component.getComponent(0).getId());
        });
    },

    onMainETHolderAfterRender: function(component, eOpts) {
        component.addBodyCls('contrastEMBorder');
        component.getEl().on("click", function(e){
            Ext.getCmp("elementETIdField").setValue(component.getId());
            e.stopEvent();
        });
    },

    onElementETIdFieldChange: function(field, newValue, oldValue, eOpts) {
        var me=this;
        if (!Ext.isEmpty(oldValue)){
            var oldOne=Ext.getCmp(oldValue);
            if (!Ext.isEmpty(oldOne)){
                oldOne.removeBodyCls('selectedEMElement');
                if (oldOne.eType=="col"){
                    oldOne.up().removeBodyCls("contrastEMPadding");
                    oldOne.up().doLayout();
                }
            }
        }
        if (!Ext.isEmpty(newValue)){
            var newOne=Ext.getCmp(newValue);
            if (!Ext.isEmpty(newOne)){
                newOne.getEl().frame(MyPrefData.themeColor);
                newOne.addBodyCls('selectedEMElement');
                if (newOne.eType=="col"){
                    newOne.up().addBodyCls("contrastEMPadding");
                    newOne.up().doLayout();
                }
            }
        } else {

        }
        me.adaptETEditButtons(newValue);
    },

    onNewETColBtnClick: function(button, e, eOpts) {
        var newCol=Ext.widget("panel",{
            eType:"col",
            width:100

        });
        Ext.getCmp(Ext.getCmp("elementETIdField").getValue()).add(newCol);
        newCol.getEl().dom.click();
    },

    onMoveUPETBtnClick: function(button, e, eOpts) {
        var field = Ext.getCmp(Ext.getCmp("elementETIdField").getValue());
        if (!Ext.isEmpty(field)) {
            var pos = field.up().items.indexOf(field);
            if (pos > 0) {
                field.up().move(pos,pos-1);
            }
        }
    },

    onMoveDownETBTnClick: function(button, e, eOpts) {
        var field = Ext.getCmp(Ext.getCmp("elementETIdField").getValue());
        if (!Ext.isEmpty(field)) {
            var pos = field.up().items.indexOf(field);
            field.up().move(pos,pos+1);
        }
    },

    adaptETEditButtons: function(selectedElement) {
        Ext.Array.forEach(Ext.getCmp("eTTopBarBox").query("button"), function(button){button.disable();});
        var thing=Ext.getCmp(selectedElement);
        if (!Ext.isEmpty(thing)){
            if (selectedElement=="mainETHolder"){
                Ext.getCmp("newETRowBtn").enable();
            } else if (thing.eType=="row"){
                Ext.getCmp("newETColBtn").enable();
                Ext.getCmp("moveUPETBtn").enable();
                Ext.getCmp("moveDownETBTn").enable();
            } else if (thing.eType=="col"){
                Ext.getCmp("moveUPETBtn").enable();
                Ext.getCmp("moveDownETBTn").enable();
            }
        }
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
            },
            "#newETColBtn": {
                click: this.onNewETColBtnClick
            },
            "#moveUPETBtn": {
                click: this.onMoveUPETBtnClick
            },
            "#moveDownETBTn": {
                click: this.onMoveDownETBTnClick
            }
        });
    }

});
