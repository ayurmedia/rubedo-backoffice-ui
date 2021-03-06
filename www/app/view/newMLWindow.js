/*
 * File: app/view/newMLWindow.js
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

Ext.define('Rubedo.view.newMLWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.newMLWindow',

    localiserId: 'newMLWindow',
    height: 112,
    id: 'newMLWindow',
    width: 400,
    constrain: true,
    resizable: false,
    layout: {
        type: 'fit'
    },
    title: 'Nouvelle liste de diffusion',
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
                            localiserId: 'nameField',
                            anchor: '100%',
                            fieldLabel: 'Nom',
                            name: 'name',
                            allowBlank: false
                        },
                        {
                            xtype: 'button',
                            localiserId: 'newMLCreateBtn',
                            anchor: '100%',
                            id: 'newMLSubmitBtn',
                            scale: 'medium',
                            text: 'Créer une nouvelle liste de diffusion'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});