/*
 * File: app/view/SystemInfoDisplayWindow.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
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

Ext.define('Rubedo.view.SystemInfoDisplayWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.SystemInfoDisplayWindow',

    localiserId: 'systemInfoDisplayWindow',
    height: 324,
    id: 'SystemInfoDisplayWindow',
    width: 666,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    iconCls: 'help',
    title: 'Informations Système',

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
                            xtype: 'displayfield',
                            localiserId: 'MongoDBField',
                            anchor: '50%',
                            style: '{float:right;}',
                            fieldLabel: 'MongoDB',
                            name: 'MongoDB'
                        },
                        {
                            xtype: 'displayfield',
                            localiserId: 'rubedoVersionField',
                            anchor: '50%',
                            fieldLabel: 'Rubedo',
                            name: 'RubedoVersion'
                        },
                        {
                            xtype: 'displayfield',
                            localiserId: 'ESVersionField',
                            anchor: '50%',
                            style: '{float:right;}',
                            fieldLabel: 'Elasticsearch',
                            name: 'ElasticSearch'
                        },
                        {
                            xtype: 'displayfield',
                            localiserId: 'ZFVersionField',
                            anchor: '50%',
                            fieldLabel: 'Zend Framework',
                            name: 'ZendFramework'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: {
                        align: 'stretch',
                        type: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'propertygrid',
                            localiserId: 'phpCompoentsPropertyGrid',
                            flex: 1,
                            autoScroll: true,
                            title: 'Composants PHP',
                            disableSelection: true,
                            hideHeaders: true,
                            nameColumnWidth: 240,
                            source: {
                                
                            },
                            listeners: {
                                beforeedit: {
                                    fn: me.onPropertygridBeforeEdit1,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'propertygrid',
                            localiserId: 'frontComponentsPropertyGrid',
                            flex: 1,
                            autoScroll: true,
                            title: 'Composants Front',
                            disableSelection: true,
                            enableColumnMove: true,
                            hideHeaders: true,
                            nameColumnWidth: 240,
                            source: {
                                
                            },
                            listeners: {
                                beforeedit: {
                                    fn: me.onPropertygridBeforeEdit,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onSystemInfoDisplayWindowAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onPropertygridBeforeEdit1: function(editor, e, eOpts) {
        return(false);
    },

    onPropertygridBeforeEdit: function(editor, e, eOpts) {
        return(false);
    },

    onSystemInfoDisplayWindowAfterRender: function(component, eOpts) {
        var data = Ext.getCmp("monitoringTools").retrievedSystemInfo;
        component.getComponent(0).getForm().setValues(data);
        component.getComponent(1).getComponent(0).setSource(data.Components.phpComponents);
        component.getComponent(1).getComponent(1).setSource(data.Components.frontComponents);
    }

});