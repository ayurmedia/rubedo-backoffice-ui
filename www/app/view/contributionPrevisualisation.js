/*
 * File: app/view/contributionPrevisualisation.js
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

Ext.define('Rubedo.view.contributionPrevisualisation', {
    extend: 'Ext.window.Window',
    alias: 'widget.contributionPrevisualisation',

    requires: [
        'Rubedo.view.MyTool16',
        'Rubedo.view.MyTool17'
    ],

    ACL: 'read.ui.pages',
    localiserId: 'previewWindow',
    height: 548,
    id: 'contributionPrevisualisation',
    width: 1200,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },
    constrainHeader: true,
    iconCls: 'personalize',
    title: 'Prévisualisation',
    maximized: true,

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
                    xtype: 'treepanel',
                    localiserId: 'previewPageTree',
                    id: 'previewPageTree',
                    width: 225,
                    collapseDirection: 'left',
                    collapsible: true,
                    title: 'Sélecteur de pages',
                    store: 'PagesPreviewStore',
                    useArrows: true,
                    viewConfig: {

                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'combobox',
                                    managesStore: true,
                                    localiserId: 'siteField',
                                    flex: 1,
                                    id: 'previewSitesCombo',
                                    fieldLabel: 'Site ',
                                    labelWidth: 40,
                                    editable: false,
                                    forceSelection: true,
                                    queryMode: 'local',
                                    store: 'SitesComboPreview',
                                    valueField: 'id'
                                }
                            ]
                        }
                    ],
                    plugins: [
                        Ext.create('Ext.grid.plugin.BufferedRenderer', {

                        })
                    ]
                },
                {
                    xtype: 'panel',
                    flex: 1,
                    id: 'contribPreviewMain',
                    layout: {
                        type: 'fit'
                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'cycle',
                                    localiserId: 'previewDeviceCombo',
                                    id: 'previewDeviceCombo',
                                    margin: '0 20 0 0',
                                    arrowAlign: 'bottom',
                                    menuAlign: 'bl',
                                    scale: 'large',
                                    showText: true,
                                    menu: {
                                        xtype: 'menu',
                                        frame: true,
                                        closeAction: 'hide',
                                        frameHeader: false,
                                        plain: true,
                                        showSeparator: false,
                                        items: [
                                            {
                                                xtype: 'menucheckitem',
                                                deviceValue: 'desktop',
                                                localiserId: 'desktopItem',
                                                iconCls: 'prevDesktop',
                                                plain: true,
                                                text: 'Desktop'
                                            },
                                            {
                                                xtype: 'menucheckitem',
                                                deviceValue: 'iphone',
                                                localiserId: 'phoneItem',
                                                iconCls: 'prevIphone',
                                                plain: true,
                                                text: 'Phone - portrait'
                                            },
                                            {
                                                xtype: 'menucheckitem',
                                                deviceValue: 'iphone-l',
                                                localiserId: 'phoneLItem',
                                                iconCls: 'prevIphoneL',
                                                plain: true,
                                                text: 'Phone - Landscape'
                                            },
                                            {
                                                xtype: 'menucheckitem',
                                                deviceValue: 'ipad',
                                                localiserId: 'tabletItem',
                                                iconCls: 'prevIpad',
                                                plain: true,
                                                text: 'Tablet - Portrait'
                                            },
                                            {
                                                xtype: 'menucheckitem',
                                                deviceValue: 'ipad-l',
                                                localiserId: 'tabletLItem',
                                                iconCls: 'prevIpadL',
                                                plain: true,
                                                text: 'Tablet - Landscape'
                                            }
                                        ]
                                    },
                                    listeners: {
                                        change: {
                                            fn: me.onPreviewDeviceComboChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'tbseparator'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    localiserId: 'draftField',
                                    id: 'advancedPreviewDraftField',
                                    margin: '0 20 0 0',
                                    fieldLabel: 'Mode brouillon',
                                    labelWidth: 90,
                                    boxLabel: '',
                                    inputValue: 'true'
                                },
                                {
                                    xtype: 'datefield',
                                    localiserId: 'dateField',
                                    id: 'advancedPreviewDateField',
                                    fieldLabel: 'Date',
                                    labelWidth: 40
                                },
                                me.processPreviewLanguageCombo({
                                    xtype: 'combobox',
                                    margins: '0 0 0 20',
                                    id: 'previewLanguageCombo',
                                    fieldLabel: 'Language',
                                    labelWidth: 60,
                                    editable: false,
                                    displayField: 'label',
                                    forceSelection: true,
                                    queryMode: 'local',
                                    valueField: 'locale',
                                    listeners: {
                                        afterrender: {
                                            fn: me.onPreviewLanguageComboAfterRender,
                                            scope: me
                                        }
                                    }
                                }),
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'tbseparator'
                                },
                                {
                                    xtype: 'button',
                                    localiserId: 'refreshBtn',
                                    id: 'advancedPreviewPageRefresh',
                                    iconCls: 'refresh_big',
                                    scale: 'large',
                                    text: 'Actualiser'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    processPreviewLanguageCombo: function(config) {
        config.store=Ext.create('Ext.data.Store', {
            fields:[{name:"locale"},{name:"label"},{name:"flagCode"}]
        });
        config.tpl=Ext.create('Ext.XTemplate',
        '<tpl for=".">',
        '<div class="x-boundlist-item"><img src="/assets/flags/16/{flagCode}.png"> {label}</div>',
        '</tpl>'
        );
        return config;
    },

    onPreviewDeviceComboChange: function(cycle, item, eOpts) {
        if (!Ext.isEmpty(Ext.getCmp("advancedPreviewPageRefresh"))){
            Ext.getCmp("advancedPreviewPageRefresh").fireEvent("click", Ext.getCmp("advancedPreviewPageRefresh"));
        }
    },

    onPreviewLanguageComboAfterRender: function(component, eOpts) {
        if (Ext.getStore("AllLanguagesStore3").getRange().length==1){
            component.hide();
        } 
    }

});