/*
 * File: app/view/workspacesReplicator.js
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

Ext.define('Rubedo.view.workspacesReplicator', {
    extend: 'Ext.form.Panel',
    alias: 'widget.workspacesReplicator',

    bodyPadding: 10,
    title: '',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textfield',
                    localiserId: 'nameField',
                    anchor: '100%',
                    fieldLabel: 'Nom',
                    name: 'text',
                    allowBlank: false
                }
            ]
        });

        me.callParent(arguments);
    }

});