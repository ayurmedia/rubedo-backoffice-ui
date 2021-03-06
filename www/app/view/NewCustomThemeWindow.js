/*
 * File: app/view/NewCustomThemeWindow.js
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

Ext.define('Rubedo.view.NewCustomThemeWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.NewCustomThemeWindow',

    localiserId: 'newCustomThemeWindow',
    height: 112,
    width: 400,
    constrain: true,
    resizable: false,
    layout: {
        type: 'fit'
    },
    title: 'New custom theme',
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
                            localiserId: 'createNewCustomThemeBtn',
                            anchor: '100%',
                            id: 'newCustomThemeSublitBtn',
                            scale: 'medium',
                            text: 'Create new custom theme'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});