/*
 * File: app/view/optionsLCGrid.js
 *
 * This file was generated by Sencha Architect version 2.2.3.
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

Ext.define('Rubedo.view.optionsLCGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.optionsLCGrid',

    localiserId: 'optionsGrid',
    height: 250,
    id: 'optionsLCGrid',
    margin: '20 0 0 0',
    autoScroll: true,
    title: 'Options',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    localiserId: 'valueCol',
                    dataIndex: 'valeur',
                    text: 'Valeur',
                    flex: 1,
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },
                {
                    xtype: 'gridcolumn',
                    localiserId: 'nameCol',
                    dataIndex: 'nom',
                    text: 'Nom',
                    flex: 1,
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                }
            ],
            plugins: [
                Ext.create('Ext.grid.plugin.RowEditing', {

                })
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'button',
                            localiserId: 'addBtn',
                            iconCls: 'add',
                            text: 'Ajouter',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            localiserId: 'removeBtn',
                            iconCls: 'close',
                            text: 'Supprimer',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick1,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onButtonClick: function(button, e, eOpts) {
        button.up().up().getComponent(0).getStore().add({valeur : 'valeur', nom : 'nom'});
    },

    onButtonClick1: function(button, e, eOpts) {
        button.up().up().getComponent(0).getStore().remove(button.up().up().getComponent(0).getSelectionModel().getLastSelected());
    }

});