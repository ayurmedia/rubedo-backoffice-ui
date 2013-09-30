/*
 * File: app/view/ApplicationLogsInterface.js
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

Ext.define('Rubedo.view.ApplicationLogsInterface', {
    extend: 'Ext.window.Window',
    alias: 'widget.ApplicationLogsInterface',

    requires: [
        'Rubedo.view.MyTool16',
        'Rubedo.view.MyTool17',
        'Ext.ux.RowExpander'
    ],

    height: 418,
    id: 'ApplicationLogsInterface',
    width: 944,
    layout: {
        type: 'fit'
    },
    constrainHeader: true,
    iconCls: 'process-icon',
    title: 'Application logs',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            tools: [
                {
                    xtype: 'mytool16'
                },
                {
                    xtype: 'mytool17'
                }
            ],
            items: [
                me.processMyGridPanel6({
                    xtype: 'gridpanel',
                    title: '',
                    disableSelection: true,
                    forceFit: false,
                    store: 'ApplicationLogs',
                    viewConfig: {
                        autoScroll: false
                    },
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'message',
                            text: 'Message',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'type',
                            text: 'Type',
                            flex: 0.4
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 200,
                            dataIndex: 'datetime',
                            text: 'Datetime'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 140,
                            dataIndex: 'level_name',
                            text: 'Level'
                        }
                    ]
                })
            ],
            listeners: {
                afterrender: {
                    fn: me.onApplicationLogsInterfaceAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onApplicationLogsInterfaceBeforeClose,
                    scope: me
                }
            },
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: 360,
                    displayInfo: true,
                    store: 'ApplicationLogs'
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'datefield',
                            operator: '$gte',
                            id: 'testerDate1',
                            fieldLabel: 'Show logs between',
                            labelWidth: 110,
                            name: 'datetime'
                        },
                        {
                            xtype: 'datefield',
                            operator: '$lte',
                            fieldLabel: 'and',
                            labelWidth: 30,
                            name: 'datetime'
                        },
                        {
                            xtype: 'combobox',
                            operator: '$gte',
                            fieldLabel: 'of minimal level',
                            labelWidth: 80,
                            name: 'level',
                            value: 100,
                            editable: false,
                            forceSelection: true,
                            store: [
                                [
                                    100,
                                    'DEBUG'
                                ],
                                [
                                    200,
                                    'INFO'
                                ],
                                [
                                    250,
                                    'NOTICE'
                                ],
                                [
                                    300,
                                    'WARNING'
                                ],
                                [
                                    400,
                                    'ERROR'
                                ],
                                [
                                    500,
                                    'CRITICAL'
                                ],
                                [
                                    550,
                                    'ALERT'
                                ],
                                [
                                    600,
                                    'EMERGENCY'
                                ]
                            ]
                        },
                        {
                            xtype: 'button',
                            handler: function(button, event) {
                                var filtersArray=[ ];
                                Ext.Array.forEach(button.up().query("field"),function(field){
                                    if (!Ext.isEmpty(field.getValue())){
                                        var myValue=field.getValue();
                                        if (Ext.isDate(myValue)){
                                            myValue=Ext.Date.format(myValue,"Y-m-d H-i-s");
                                        }
                                        filtersArray.push({property:field.name, operator:field.operator, value: myValue});
                                    }
                                });
                                Ext.getStore("ApplicationLogs").getProxy().extraParams.filter=Ext.JSON.encode(filtersArray);
                                Ext.getStore("ApplicationLogs").load();
                            },
                            iconCls: 'refresh',
                            text: 'Refresh'
                        },
                        {
                            xtype: 'button',
                            handler: function(button, event) {
                                button.up().getComponent(0).setValue(null);
                                button.up().getComponent(1).setValue(null);
                                Ext.getStore("ApplicationLogs").getProxy().extraParams={ };
                                Ext.getStore("ApplicationLogs").loadPage(1);
                            },
                            iconCls: 'close',
                            text: 'Clear filters'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    processMyGridPanel6: function(config) {
        config.plugins=[{
            ptype: 'rowexpander',
            selectRowOnExpand : false,  
            rowBodyTpl:"<div class='specialGridRowDisplay'><pre><code>{detail}</code></pre></div>"
        }];
        return config;
    },

    onApplicationLogsInterfaceAfterRender: function(component, eOpts) {
        Ext.getStore("ApplicationLogs").getProxy().extraParams={ };
        Ext.getStore("ApplicationLogs").loadPage(1);
    },

    onApplicationLogsInterfaceBeforeClose: function(panel, eOpts) {
        Ext.getStore("ApplicationLogs").removeAll();
    }

});