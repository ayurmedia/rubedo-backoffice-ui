/*
 * File: app/controller/WorkspacesController.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Rubedo.controller.WorkspacesController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.WorkspacesController',

    onWorkspaceAddClick: function(button, e, eOpts) {
        Ext.widget("newWorkspaceWindow").show();
    },

    onWorkspaceRemoveClick: function(button, e, eOpts) {
        var delCon = Ext.widget('delConfirmZ');
        delCon.show();
        Ext.getCmp('delConfirmZOui').on('click', function() { 
            Ext.getStore("WorkspacesStore").remove(Ext.getCmp("workspacesGrid").getSelectionModel().getLastSelected());
            Ext.getCmp('delConfirmZ').close();
        });  
    },

    onWorkspaceSaveClick: function(button, e, eOpts) {
        var target = Ext.getCmp("workspacesGrid").getSelectionModel().getLastSelected();
        var form = Ext.getCmp("workspacesMainForm").getForm();
        if (form.isValid()){
            target.beginEdit();
            target.set(form.getValues());
            Ext.getCmp("workspacesDLSToolbar").persisti18n(target);
            target.endEdit();
        }  
    },

    onWorkspacesGridSelectionChange: function(model, selected, eOpts) {
        if (Ext.isEmpty(selected)){
            Ext.getCmp("workspaceRemove").disable();
            Ext.getCmp("workspaceSave").disable();
            Ext.getCmp("workspacesMainForm").getForm().reset();
            Ext.getCmp("workspacesMainForm").up().disable();
        } else {
            Ext.getCmp("workspaceRemove").enable();
            Ext.getCmp("workspaceSave").enable();
            Ext.getCmp("workspacesMainForm").up().enable();
            Ext.getCmp("workspacesMainForm").getForm().setValues(selected[0].getData());
            if ((selected[0].get("readOnly"))||(!ACL.interfaceRights["write.ui.workspaces"])){
                Ext.Array.forEach(Ext.getCmp("workspacesMainForm").query("field"), function(field){
                    field.setReadOnly(true);
                });
                Ext.getCmp("workspaceRemove").disable();
                Ext.getCmp("workspaceSave").disable();
            } else {
                Ext.Array.forEach(Ext.getCmp("workspacesMainForm").query("field"), function(field){
                    field.setReadOnly(false);
                });
            }
            Ext.getCmp("workspacesDLSToolbar").recievei18n(selected[0].get("i18n"),selected[0].get("locale"));
        }
    },

    onNewWorkspaceSublitBtnClick: function(button, e, eOpts) {
        var form = button.up().getForm();
        if (form.isValid()){
            var newW= Ext.create("Rubedo.model.workspaceModel", form.getValues());
            var nativeLanguage=Ext.getCmp("workingLanguageField").getValue();
            newW.set("nativeLanguage",nativeLanguage);
            var i18n={ };
            i18n[nativeLanguage]=form.getValues();
            newW.set("i18n",i18n);
            Ext.getStore("WorkspacesStore").add(newW);
            Ext.getStore("WorkspacesStore").addListener("datachanged",function(){Ext.getCmp('workspacesGrid').getSelectionModel().select(newW);},this,{single:true});
            button.up().up().close();
        }
    },

    init: function(application) {
        this.control({
            "#workspaceAdd": {
                click: this.onWorkspaceAddClick
            },
            "#workspaceRemove": {
                click: this.onWorkspaceRemoveClick
            },
            "#workspaceSave": {
                click: this.onWorkspaceSaveClick
            },
            "#workspacesGrid": {
                selectionchange: this.onWorkspacesGridSelectionChange
            },
            "#newWorkspaceSublitBtn": {
                click: this.onNewWorkspaceSublitBtnClick
            }
        });
    }

});
