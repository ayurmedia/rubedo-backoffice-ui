/*
 * File: app/view/directoryConfiguratorWindow.js
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

Ext.define('Rubedo.view.directoryConfiguratorWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.directoryConfiguratorWindow',

    requires: [
        'Rubedo.view.WorkspaceCombo'
    ],

    height: 120,
    id: 'directoryConfiguratorWindow',
    width: 400,
    constrain: true,
    resizable: false,
    layout: {
        type: 'fit'
    },
    title: 'Directory settings',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'WorkspaceCombo',
                            fieldLabel: 'Workspace',
                            labelWidth: 160,
                            store: 'ContributeWorkspacesCombo',
                            anchor: '100%'
                        },
                        {
                            xtype: 'checkboxfield',
                            localiserId: 'inheritWorkspaceField',
                            anchor: '100%',
                            fieldLabel: 'Inherits workspace',
                            labelWidth: 160,
                            name: 'inheritWorkspace',
                            boxLabel: '',
                            inputValue: 'true',
                            uncheckedValue: 'false',
                            listeners: {
                                change: {
                                    fn: me.onCheckboxfieldChange1,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            ACL: 'write.ui.directories',
                            anchor: '100%',
                            id: 'directorySettingsApplyBtn',
                            text: 'Apply '
                        }
                    ],
                    listeners: {
                        afterrender: {
                            fn: me.onFormAfterRender,
                            scope: me
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    onCheckboxfieldChange1: function(field, newValue, oldValue, eOpts) {
        if (newValue) {
            field.previousSibling().setReadOnly(true);
            field.previousSibling().setValue(null);
        }else {
            field.previousSibling().setReadOnly(false);
        }
    },

    onFormAfterRender: function(component, eOpts) {
        component.getForm().setValues(Ext.getCmp("mainDirectoriesTree").getSelectionModel().getLastSelected().getData());
        if ((!ACL.interfaceRights['write.ui.directories'])||(Ext.getCmp("mainDirectoriesTree").getSelectionModel().getLastSelected().get("readOnly"))){
            Ext.Array.forEach(component.query("field"),function(field){field.setReadOnly(true);});
            Ext.getCmp("directorySettingsApplyBtn").hide();
        }
    }

});