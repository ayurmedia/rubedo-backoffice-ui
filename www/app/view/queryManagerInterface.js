/*
 * File: app/view/queryManagerInterface.js
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

Ext.define('Rubedo.view.queryManagerInterface', {
    extend: 'Ext.window.Window',
    alias: 'widget.queryManagerInterface',

    requires: [
        'Rubedo.view.MyTool17'
    ],

    localiserId: 'queryWindow',
    height: 380,
    id: 'queryManagerInterface',
    width: 341,
    layout: {
        type: 'fit'
    },
    constrainHeader: true,
    iconCls: 'database_search',
    title: 'Requêtes',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    height: 64,
                    items: [
                        {
                            xtype: 'button',
                            ACL: 'write.ui.queries',
                            localiserId: 'addBtn',
                            id: 'queryMainAddBtn',
                            iconAlign: 'top',
                            iconCls: 'add_big',
                            scale: 'large',
                            text: 'Ajouter'
                        },
                        {
                            xtype: 'button',
                            ACL: 'write.ui.queries',
                            localiserId: 'removeBtn',
                            disabled: true,
                            id: 'queryMainRemoveBtn',
                            iconAlign: 'top',
                            iconCls: 'remove_big',
                            scale: 'large',
                            text: 'Supprimer'
                        },
                        {
                            xtype: 'button',
                            localiserId: 'editBtn',
                            disabled: true,
                            id: 'queryMainEditBtn',
                            iconAlign: 'top',
                            iconCls: 'pencil_big',
                            scale: 'large',
                            text: 'Editer',
                            listeners: {
                                beforerender: {
                                    fn: me.onQueryMainEditBtnBeforeRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            disabled: true,
                            id: 'queryPlayBtn',
                            iconAlign: 'top',
                            iconCls: 'play_big',
                            scale: 'large',
                            text: 'Preview'
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            RApplication: 'queries',
                            itemId: 'RHelpBtn',
                            iconCls: 'info_big',
                            scale: 'large',
                            text: ''
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'gridpanel',
                    id: 'mainQueriesGrid',
                    title: '',
                    forceFit: true,
                    store: 'MainQueriesStore',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (record.get("readOnly")) {
                                    return("<i style=\"color:#777;\">"+value+"</i>");

                                } else {
                                    return(value);
                                }
                            },
                            localiserId: 'nameColumn',
                            dataIndex: 'name',
                            text: 'Nom'
                        },
                        {
                            xtype: 'gridcolumn',
                            hidden: true,
                            dataIndex: 'averageDuration',
                            text: 'Durée moyenne (s)'
                        },
                        {
                            xtype: 'gridcolumn',
                            hidden: true,
                            dataIndex: 'count',
                            text: 'Compteur'
                        },
                        {
                            xtype: 'gridcolumn',
                            hidden: true,
                            dataIndex: 'usage',
                            text: 'Usage'
                        }
                    ]
                }
            ],
            tools: [
                {
                    xtype: 'mytool17'
                }
            ],
            listeners: {
                render: {
                    fn: me.onQueryManagerInterfaceRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onQueryManagerInterfaceBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onQueryMainEditBtnBeforeRender: function(component, eOpts) {
        if (!ACL.interfaceRights["read.ui.queries"]){
            component.hide();
        } else if (!ACL.interfaceRights["write.ui.queries"]){
            component.setText("Afficher");
            component.ROMode=true;
        }
    },

    onQueryManagerInterfaceRender: function(component, eOpts) {
        Ext.getStore("MainQueriesStore").load();
    },

    onQueryManagerInterfaceBeforeClose: function(panel, eOpts) {
        Ext.getStore("MainQueriesStore").removeAll();
    }

});