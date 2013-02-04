/*
 * File: app/view/queryTypeChooseWindow.js
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

Ext.define('Rubedo.view.queryTypeChooseWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.queryTypeChooseWindow',

    height: 141,
    id: 'queryTypeChooseWindow',
    width: 235,
    resizable: false,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    title: 'Choisissez un type de requête',
    constrain: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'button',
                    handler: function(button, event) {
                        var myWin = Ext.widget("manualQueryInterface");
                        myWin.mainFieldId=button.up().mainFieldId;
                        myWin.show();
                        button.up().close();
                    },
                    flex: 1,
                    scale: 'large',
                    text: 'Requête manuelle'
                },
                {
                    xtype: 'button',
                    handler: function(button, event) {
                        var myWin = Ext.widget("assistantRequetage");
                        myWin.mainFieldId=button.up().mainFieldId;
                        myWin.simpleMode=true;
                        myWin.show();
                        button.up().close();
                    },
                    flex: 1,
                    scale: 'large',
                    text: 'Requête simple'
                },
                {
                    xtype: 'button',
                    handler: function(button, event) {
                        var myWin = Ext.widget("assistantRequetage");
                        myWin.mainFieldId=button.up().mainFieldId;
                        myWin.show();
                        button.up().close();
                    },
                    flex: 1,
                    scale: 'large',
                    text: 'Requête avancée'
                }
            ]
        });

        me.callParent(arguments);
    }

});