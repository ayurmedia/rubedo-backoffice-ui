/*
 * File: app/view/Panier.js
 *
 * This file was generated by Sencha Architect version 2.0.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('KECMdesktop.view.Panier', {
    extend: 'Ext.window.Window',
    alias: 'widget.panier',

    floating: true,
    height: 300,
    id: 'Panier',
    styleHtmlContent: false,
    width: 600,
    layout: {
        type: 'fit'
    },
    bodyCls: '',
    iconCls: 'cart',
    title: 'Panier',
    constrain: false,
    constrainHeader: true,
    modal: false,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    id: 'PanierGrid',
                    title: '',
                    store: 'PanierDataJson',
                    viewConfig: {

                    },
                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                    }),
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 183,
                            dataIndex: 'text',
                            flex: 1,
                            text: 'Titre'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'etat',
                            flex: 1,
                            text: 'Etat'
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'left',
                    items: [
                        {
                            xtype: 'button',
                            id: 'enleverPanier',
                            iconCls: 'shopping_cart_remove_med',
                            scale: 'medium',
                            text: 'Enlever'
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'pencil_med',
                            scale: 'medium',
                            text: 'Action 1'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'pencil_med',
                            scale: 'medium',
                            text: 'Action 2'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'pencil_med',
                            scale: 'medium',
                            text: 'Action 3'
                        }
                    ]
                }
            ],
            tools: [
                {
                    xtype: 'tool',
                    itemId: 'windowMinimize',
                    type: 'minimize'
                },
                {
                    xtype: 'tool',
                    itemId: 'windowMaximize',
                    type: 'maximize'
                }
            ]
        });

        me.callParent(arguments);
    }

});