/*
 * File: app/view/UTFieldAddWindow.js
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

Ext.define('Rubedo.view.UTFieldAddWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.UTFieldAddWindow',

    localiserId: 'addMTFieldWindow',
    height: 300,
    id: 'UTFieldAddWindow',
    width: 500,
    resizable: false,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },
    constrainHeader: true,
    title: 'Ajouter un champ',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    flex: 0.5,
                    id: 'UTFieldSelectGrid',
                    title: '',
                    store: 'UTFieldTypes',
                    viewConfig: {
                        markDirty: false
                    },
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            localiserId: 'typeCol',
                            dataIndex: 'type',
                            text: 'Type',
                            flex: 1
                        }
                    ],
                    listeners: {
                        select: {
                            fn: me.onMTFieldSelectGridSelect,
                            scope: me
                        }
                    },
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
                    flex: 1,
                    id: 'UTFieldDescriber',
                    tpl: [
                        '{description}'
                    ],
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
                            disabled: true,
                            id: 'UTFieldInsertBtn',
                            iconCls: 'add',
                            text: 'Ajouter'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onMTFieldSelectGridSelect: function(rowmodel, record, index, eOpts) {
        Ext.getCmp("UTFieldInsertBtn").enable();
        Ext.getCmp("UTFieldDescriber").update(record.get("description"));
    }

});