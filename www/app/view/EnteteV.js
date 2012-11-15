/*
 * File: app/view/EnteteV.js
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

Ext.define('Rubedo.view.EnteteV', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.entete',

    height: 46,
    id: 'entete',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'button',
                    disabled: true,
                    id: 'boutonPincipalInterface',
                    icon: 'resources/images/logoRubedo.png',
                    scale: 'large'
                },
                {
                    xtype: 'tbseparator'
                },
                {
                    xtype: 'button',
                    id: 'boutonPanierEntete',
                    iconCls: 'shopping_cart_med',
                    scale: 'medium',
                    text: 'Panier'
                },
                {
                    xtype: 'tbseparator'
                },
                {
                    xtype: 'toolbar',
                    flex: 1,
                    border: 0,
                    height: 30,
                    id: 'taskbarPrincipal',
                    enableOverflow: true
                },
                {
                    xtype: 'tbseparator',
                    margins: '0, 0, 0, 20'
                },
                {
                    xtype: 'textfield',
                    id: 'ESSearchField',
                    itemId: 'filterField',
                    value: 'Recherche',
                    fieldLabel: '',
                    labelSeparator: ' ',
                    labelWidth: 68,
                    allowBlank: false,
                    listeners: {
                        focus: {
                            fn: me.onESSearchFieldFocus,
                            single: true,
                            scope: me
                        },
                        specialkey: {
                            fn: me.onESSearchFieldSpecialkey,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'button',
                    id: 'ESSearchButton',
                    iconCls: 'search'
                },
                {
                    xtype: 'tbseparator'
                }
            ]
        });

        me.callParent(arguments);
    },

    onESSearchFieldFocus: function(field, options) {
        field.setValue();
    },

    onESSearchFieldSpecialkey: function(field, e, options) {

        if (e.getKey() == e.ENTER) {
            Ext.getCmp("ESSearchButton").fireEvent("click",Ext.getCmp("ESSearchButton"));
        }
    }

});