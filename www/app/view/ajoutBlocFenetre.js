/*
 * File: app/view/ajoutBlocFenetre.js
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

Ext.define('Rubedo.view.ajoutBlocFenetre', {
    extend: 'Ext.window.Window',
    alias: 'widget.ajoutBlocFenetre',

    localiserId: 'addBlockWindow',
    draggable: false,
    height: 346,
    id: 'ajoutBlocFenetre',
    width: 533,
    resizable: false,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },
    constrainHeader: true,
    title: 'Ajouter un bloc',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    id: 'BlocsSelectGrid',
                    title: '',
                    store: 'BlocsDataStore',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            localiserId: 'addBlockTypeColumn',
                            dataIndex: 'type',
                            text: 'Type',
                            flex: 1
                        }
                    ],
                    features: [
                        {
                            ftype: 'grouping',
                            groupHeaderTpl: [
                                '{name}'
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    flex: 1.3,
                    id: 'PaneauBlocsDetail',
                    tpl: [
                        '{description}'
                    ],
                    autoScroll: true,
                    bodyPadding: 10,
                    bodyStyle: '{text-align: justify;}',
                    title: ''
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            localiserId: 'addBtn',
                            id: 'boutonAjouterBloc',
                            iconCls: 'add',
                            text: 'Ajouter'
                        },
                        {
                            xtype: 'button',
                            localiserId: 'addBtn',
                            hidden: true,
                            id: 'addPageBlocBtn',
                            iconCls: 'add',
                            text: 'Ajouter'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});