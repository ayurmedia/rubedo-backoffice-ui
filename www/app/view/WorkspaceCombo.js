/*
 * File: app/view/WorkspaceCombo.js
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

Ext.define('Rubedo.view.WorkspaceCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.WorkspaceCombo',

    localiserId: 'workspaceField',
    fieldLabel: 'Espace de travail',
    name: 'workspace',
    editable: false,
    forceSelection: true,
    queryMode: 'local',
    store: 'WorkspacesComboStore',
    valueField: 'id',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            listeners: {
                beforerender: {
                    fn: me.onComboboxBeforeRender,
                    scope: me
                },
                added: {
                    fn: me.onComboboxAdded,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onComboboxBeforeRender: function(component, eOpts) {
        if ((!component.notAutomatic)&&(Ext.isEmpty(component.getValue()))){
            if (component.multiSelect){
                component.setValue([ACL.defaultWorkspace]);
            } else {
                component.setValue(ACL.defaultWorkspace);
            }
        }

    },

    onComboboxAdded: function(component, container, pos, eOpts) {
        if ((component.getStore().storeId=="ContributeWorkspacesCombo")||(component.getStore().storeId=="ContributeWorkspacesComboWithAll")){
            component.canSwitchStore=true;
        }
    },

    setReadOnly: function(readOnly) {
        var me = this,
            old = me.readOnly;
        if (me.canSwitchStore){
            if (readOnly){
                me.bindStore(Ext.getStore("WorkspacesComboStore"));
            } else {
                me.bindStore(Ext.getStore("ContributeWorkspacesCombo"));
            }
        }

        me.callParent(arguments);
        if (readOnly != old) {
            me.updateLayout();
        }
    }

});