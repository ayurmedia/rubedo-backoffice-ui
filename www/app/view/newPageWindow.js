/*
 * File: app/view/newPageWindow.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
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

Ext.define('Rubedo.view.newPageWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.newPageWindow',

    height: 126,
    id: 'newPageWindow',
    width: 400,
    resizable: false,
    layout: {
        type: 'fit'
    },
    title: 'Nouvelle Page',
    constrain: true,
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
                            xtype: 'textfield',
                            anchor: '100%',
                            name: 'text',
                            fieldLabel: 'Nom  ',
                            labelWidth: 110,
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            anchor: '100%',
                            name: 'maskId',
                            fieldLabel: 'Masque de page ',
                            labelWidth: 110,
                            allowBlank: false,
                            editable: false,
                            forceSelection: true,
                            queryMode: 'local',
                            store: 'MasksComboStore',
                            valueField: 'id'
                        },
                        {
                            xtype: 'button',
                            anchor: '100%',
                            id: 'newPageSubmitBtn',
                            text: 'Créer en tant que fille de la page sélectionnée'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});