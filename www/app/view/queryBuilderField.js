/*
 * File: app/view/queryBuilderField.js
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

Ext.define('Rubedo.view.queryBuilderField', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.queryBuilderField',

    anchor: '90%',
    style: 'float: left;',
    fieldLabel: 'Label',
    editable: false,
    displayField: 'name',
    forceSelection: true,
    queryMode: 'local',
    queryParam: 'specificItem',
    store: 'QueriesStore',
    valueField: 'id',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            listeners: {
                added: {
                    fn: me.onComboboxAdded,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onComboboxBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onComboboxAdded: function(component, container, pos, eOpts) {
        component.getStore().addListener("load",function(){
            var task = new Ext.util.DelayedTask(function(){
                if ((Ext.isEmpty(component.getValue()))&&(!Ext.isEmpty(component.getStore()))){
                    component.getStore().filterBy(function(rec){
                        if ((rec.get("type")=="advanced")) {
                            return(true);
                        }
                        else {
                            return(false);
                        }
                    });
                }
            });
            task.delay(1000);

        }, this, {single:true}); 
            component.getStore().load();
            var companion = Ext.widget("queryFieldComponent");

            companion.getComponent("addBtn").on("click", function(){
                var myWin = Ext.widget("queryTypeChooseWindow");
                myWin.mainFieldId=component.getId();
                myWin.show();
            });
            companion.getComponent("removeBtn").on("click", function(){
                component.setValue(null);
            });
            companion.getComponent("editBtn").on("click", function(){
                var theRec=component.getStore().findRecord("id", component.getValue());
                var initialQuery = Ext.clone(theRec.get("query"));
                var recId = Ext.clone(theRec.get("id"));
                if (theRec.get("type")=="advanced") {
                    Ext.widget("assistantRequetage",{editorMode:true, recId:recId, initialQuery:initialQuery, directToCombo:true, mainFieldId:component.getId()}).show();
                } else if (theRec.get("type")=="simple"){
                    Ext.widget("assistantRequetage",{editorMode:true, simpleMode:true, recId:recId, initialQuery:initialQuery, directToCombo:true, mainFieldId:component.getId()}).show();

                } else if (theRec.get("type")=="manual"){

                    Ext.widget("manualQueryInterface", {editorMode:true, recId:recId, initialQuery:initialQuery}).show();
                }

            });
            companion.getComponent("previewBtn").on("click", function(){
                Ext.widget("QuerySimWindow",{queryId:component.getValue()}).show();
            });
            component.on("change", function(a,newValue,oldValue){


                if (!Ext.isEmpty(oldValue)){
                    var theRec=component.getStore().findRecord("id", oldValue);

                    if ((!Ext.isEmpty(theRec))&&(theRec.get("type")!="advanced")) {
                        component.getStore().remove(theRec);
                    }
                }
                if (Ext.isEmpty(newValue)){
                    companion.getComponent("editBtn").hide();
                    companion.getComponent("removeBtn").hide();
                    companion.getComponent("previewBtn").hide();
                    component.getStore().filterBy(function(rec){
                        if ((rec.get("type")=="advanced")) {
                            return(true);
                        }
                        else {
                            return(false);
                        }
                    });
                } else {
                    companion.getComponent("editBtn").show();
                    companion.getComponent("removeBtn").show();
                    companion.getComponent("previewBtn").show();
                    component.getStore().filterBy(function(rec){
                        if ((rec.get("type")=="advanced")||(rec.get("id")==newValue)) {
                            return(true);
                        }
                        else {
                            return(false);
                        }
                    });
                }

            });
            component.fireEvent("change",component, component.getValue());
            component.up().add(companion);
    },

    onComboboxBeforeDestroy: function(component, eOpts) {
        //component.getStore().removeAll();
    }

});