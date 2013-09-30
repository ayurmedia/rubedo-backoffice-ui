/*
 * File: app/view/monitoringTools.js
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

Ext.define('Rubedo.view.monitoringTools', {
    extend: 'Ext.window.Window',
    alias: 'widget.monitoringTools',

    requires: [
        'Rubedo.view.MyTool16',
        'Rubedo.view.MyTool17'
    ],

    ACL: 'exe.ui.elasticSearch',
    localiserId: 'monitoringField',
    height: 303,
    id: 'monitoringTools',
    width: 577,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    constrainHeader: true,
    iconCls: 'monitoring',
    title: 'Supervision',

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
                {
                    xtype: 'form',
                    refreshCacheInfo: function() {
                        Ext.Ajax.request({
                            url: 'cache',
                            params: {
                            },
                            success: function(response){
                                var text = Ext.JSON.decode(response.responseText);
                                Ext.getCmp("SupervisionCachePanel").getForm().setValues(text);
                            }
                        });
                    },
                    localiserId: 'cachePanel',
                    flex: 1,
                    id: 'SupervisionCachePanel',
                    bodyPadding: 10,
                    title: 'Cache',
                    items: [
                        {
                            xtype: 'fieldset',
                            localiserId: 'cacheElementFieldSet',
                            title: 'Elements en cache',
                            items: [
                                {
                                    xtype: 'numberfield',
                                    localiserId: 'objectField',
                                    anchor: '100%',
                                    fieldLabel: 'Objets',
                                    name: 'cachedItems',
                                    readOnly: true
                                },
                                {
                                    xtype: 'numberfield',
                                    localiserId: 'urlField',
                                    anchor: '100%',
                                    fieldLabel: 'URL',
                                    name: 'cachedUrl',
                                    readOnly: true
                                }
                            ]
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, event) {
                                        button.up().up().refreshCacheInfo();
                                    },
                                    localiserId: 'refreshBtn',
                                    id: 'supervisionRefreshCacheBtn',
                                    text: '<b>Rafraîchir</b>'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, event) {
                                        Ext.Ajax.request({
                                            url: 'cache/clear',
                                            params: {
                                            },
                                            success: function(response){
                                                button.up().up().refreshCacheInfo();
                                            }
                                        });
                                    },
                                    localiserId: 'clearCacheBtn',
                                    id: 'SupervisionClearCachetn',
                                    text: '<b>Vider le cache</b>'
                                }
                            ]
                        }
                    ],
                    listeners: {
                        afterrender: {
                            fn: me.onSupervisionCachePanelAfterRender,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'form',
                    localiserId: 'elasticSearchPanel',
                    flex: 0.5,
                    layout: {
                        type: 'fit'
                    },
                    bodyPadding: 10,
                    icon: 'resources/images/esLogo.png',
                    title: 'Elastic Search',
                    items: [
                        {
                            xtype: 'toolbar',
                            height: 30,
                            items: [
                                {
                                    xtype: 'button',
                                    handler: function(button, event) {
                                        button.setLoading(true);
                                        Ext.Ajax.request({
                                            url: 'elastic-indexer?option=content',
                                            params:{
                                            },
                                            success: function(response){
                                                var answerMe = Ext.widget("esResponseWindow");
                                                answerMe.getComponent(0).setSource(Ext.JSON.decode(response.responseText));
                                                Ext.getCmp("ViewportPrimaire").add(answerMe);
                                                answerMe.show();
                                                button.setLoading(false);
                                            },
                                            failure: function(response) {
                                                button.setLoading(false);
                                                Ext.Msg.alert(Rubedo.RubedoAutomatedElementsLoc.errorTitle, Ext.JSON.decode(response.responseText).msg);

                                            }
                                        });
                                    },
                                    localiserId: 'indexContentsBtn',
                                    text: '<b>Indexation des contenus</b>'
                                },
                                {
                                    xtype: 'tbspacer',
                                    flex: 1
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, event) {
                                        button.setLoading(true);
                                        Ext.Ajax.request({
                                            url: 'elastic-indexer?option=dam',
                                            params:{
                                            },
                                            success: function(response){
                                                var answerMe = Ext.widget("esResponseWindow");
                                                answerMe.getComponent(0).setSource(Ext.JSON.decode(response.responseText));
                                                Ext.getCmp("ViewportPrimaire").add(answerMe);
                                                answerMe.show();
                                                button.setLoading(false);
                                            },
                                            failure: function(response) {
                                                button.setLoading(false);
                                                Ext.Msg.alert(Rubedo.RubedoAutomatedElementsLoc.errorTitle, Ext.JSON.decode(response.responseText).msg);
                                            }
                                        });
                                    },
                                    localiserId: 'indexMediasBtn',
                                    text: '<b>Indexation des médias</b>'
                                },
                                {
                                    xtype: 'tbspacer',
                                    flex: 1
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, event) {
                                        button.setLoading(true);
                                        Ext.Ajax.request({
                                            url: 'elastic-indexer?option=all',
                                            params:{
                                            },
                                            success: function(response){
                                                var answerMe = Ext.widget("esResponseWindow");
                                                answerMe.getComponent(0).setSource(Ext.JSON.decode(response.responseText));
                                                Ext.getCmp("ViewportPrimaire").add(answerMe);
                                                answerMe.show();
                                                button.setLoading(false);
                                            },
                                            failure: function(response) {
                                                button.setLoading(false);
                                                Ext.Msg.alert(Rubedo.RubedoAutomatedElementsLoc.errorTitle, Ext.JSON.decode(response.responseText).msg);
                                            }
                                        });
                                    },
                                    localiserId: 'indexAllBtn',
                                    text: '<b>Indexation complète</b>'
                                }
                            ]
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            handler: function(button, event) {
                                var theWin =Ext.getCmp("SystemInfoDisplayWindow");
                                if (Ext.isEmpty(theWin)){
                                    Ext.widget("SystemInfoDisplayWindow").show();
                                } else {
                                    theWin.show();
                                }
                            },
                            localiserId: 'systemInformationGetBtn',
                            id: 'getSystemInformationBtn',
                            iconCls: 'help',
                            text: 'Informations système'
                        },
                        me.processGetDatabaseInformationBtn({
                            xtype: 'button',
                            handler: function(button, event) {
                                if (button.canUpdate){
                                    Ext.Msg.confirm(Rubedo.RubedoAutomatedElementsLoc.warningTitle, Rubedo.RubedoAutomatedElementsLoc.databaseUpdateWarning ,function(anser){
                                        if (anser=="yes"){
                                            Ext.getCmp("getDatabaseInformationBtn").setLoading(true);
                                            Ext.Ajax.request({
                                                url: 'update/run',
                                                params: {
                                                },
                                                success: function(response){
                                                    var data = Ext.JSON.decode(response.responseText);
                                                    Ext.getCmp("getDatabaseInformationBtn").setLoading(false);
                                                    Ext.getCmp("getDatabaseInformationBtn").canUpdate=false;
                                                    Ext.getCmp("getDatabaseInformationBtn").setIconCls(null);
                                                    Ext.getCmp("getDatabaseInformationBtn").setText(Rubedo.RubedoAutomatedElementsLoc.databaseIsUpToDateText);
                                                    Ext.Msg.alert(Rubedo.RubedoAutomatedElementsLoc.successTitle, Rubedo.RubedoAutomatedElementsLoc.databaseUpdatedToText+" "+data.version);

                                                }});
                                            }
                                        }
                                        );
                                    }
                            },
                            id: 'getDatabaseInformationBtn',
                            icon: 'resources/icones/generic/database.png',
                            text: 'Database is up to date'
                        })
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onMonitoringToolsAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    processGetDatabaseInformationBtn: function(config) {
        config.text=Rubedo.RubedoAutomatedElementsLoc.databaseIsUpToDateText;
        return config;
    },

    onSupervisionCachePanelAfterRender: function(component, eOpts) {
        component.refreshCacheInfo();
    },

    onMonitoringToolsAfterRender: function(component, eOpts) {
        Ext.getCmp("getSystemInformationBtn").setLoading(true);
        Ext.Ajax.request({
            url: 'rubedo-version',
            params: {
            },
            success: function(response){
                var data = Ext.JSON.decode(response.responseText);
                Ext.getCmp("getSystemInformationBtn").setLoading(false);
                component.retrievedSystemInfo=data;
                if (!(data.IsRubedoLatest)){
                    Ext.getCmp("getSystemInformationBtn").setIconCls("infoWarning");
                    Ext.getCmp("getSystemInformationBtn").setText(Ext.getCmp("getSystemInformationBtn").getText()+" "+Rubedo.RubedoAutomatedElementsLoc.oldVersionText);
                }
            }
        });
        Ext.getCmp("getDatabaseInformationBtn").setLoading(true);
        Ext.Ajax.request({
            url: 'update',
            params: {
            },
            success: function(response){
                var data = Ext.JSON.decode(response.responseText);
                Ext.getCmp("getDatabaseInformationBtn").setLoading(false);
                if (data.needUpdate){
                    Ext.getCmp("getDatabaseInformationBtn").canUpdate=true;
                    Ext.getCmp("getDatabaseInformationBtn").setIconCls("infoWarning");
                    Ext.getCmp("getDatabaseInformationBtn").setText(Rubedo.RubedoAutomatedElementsLoc.databaseNeedsUpdateText);
                }
            }
        });
    }

});