/*
 * File: app/view/languagesInterface.js
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

Ext.define('Rubedo.view.languagesInterface', {
    extend: 'Ext.window.Window',
    alias: 'widget.languagesInterface',

    requires: [
        'Rubedo.view.MyTool16'
    ],

    localiserId: 'languagesInterface4',
    height: 413,
    id: 'languagesInterface',
    width: 435,
    constrain: true,
    layout: {
        type: 'fit'
    },
    iconCls: 'world_small',
    title: 'Languages',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                me.processMyGridPanel1({
                    xtype: 'gridpanel',
                    id: 'mainLanguagesAdminGrid',
                    title: '',
                    forceFit: false,
                    store: 'MainLanguagesStore',
                    viewConfig: {
                        preserveScrollOnRefresh: true
                    },
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (!Ext.isEmpty(value)){
                                    return('<img src="/assets/flags/16/'+value+'.png"> ');
                                } else return(value);
                            },
                            localiserId: 'FlagCol',
                            dataIndex: 'flagCode',
                            text: 'Flag',
                            flex: 1,
                            editor: me.processMyComboBox33({
                                xtype: 'combobox',
                                displayField: 'code',
                                forceSelection: true,
                                minChars: 1,
                                queryMode: 'local',
                                store: 'flagsStore',
                                typeAhead: true,
                                valueField: 'code'
                            })
                        },
                        {
                            xtype: 'gridcolumn',
                            filter: true,
                            localiserId: 'LangNameCol',
                            dataIndex: 'label',
                            text: 'Name',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            filter: true,
                            localiserId: 'OwnNameCol',
                            dataIndex: 'ownLabel',
                            text: 'Own name',
                            flex: 1,
                            editor: {
                                xtype: 'textfield'
                            }
                        }
                    ]
                })
            ],
            tools: [
                {
                    xtype: 'mytool16'
                }
            ],
            listeners: {
                render: {
                    fn: me.onLanguagesInterfaceRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onLanguagesInterfaceBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    processMyComboBox33: function(config) {
        config.tpl=Ext.create('Ext.XTemplate',
        '<tpl for=".">',
        '<div class="x-boundlist-item"><img src="/assets/flags/16/{code}.png"> - {code}</div>',
        '</tpl>'
        );
        return config;
    },

    processMyGridPanel1: function(config) {
        config.columns.push(Ext.create("Ext.ux.CheckColumn",{
            text: 'Active',
            dataIndex: 'active',
            width:60,
            filter:{
                type:"combo",
                store: [
                [true, Rubedo.RubedoAutomatedElementsLoc.yesText],
                [false, Rubedo.RubedoAutomatedElementsLoc.noText]
                ]
            },
            listeners:{
                beforecheckchange:function(cc,ix,isChecked){
                    if((Ext.getCmp("mainLanguagesAdminGrid").getStore().getAt(ix).get("isDefault"))||((!isChecked)&&(Ext.getStore("MainLanguagesStore").query("active",true).items.length<=1))){
                        /*var task = new Ext.util.DelayedTask(function(){
                        Ext.Msg.alert(Rubedo.RubedoAutomatedElementsLoc.errorTitle,Rubedo.RubedoAutomatedElementsLoc.atLeastOneLocError);
                        });
                        task.delay(200);
                        */
                        return(false);
                    }
                }
            }
        }));
        config.plugins=[
        Ext.create('Ext.ux.grid.FilterBar', {renderHidden: false, showShowHideButton: true,showClearAllButton: true}),Ext.create('Ext.grid.plugin.CellEditing')

        ];
        return config;
    },

    onLanguagesInterfaceRender: function(component, eOpts) {
        Ext.getStore("MainLanguagesStore").load();
    },

    onLanguagesInterfaceBeforeClose: function(panel, eOpts) {
        Ext.getStore("MainLanguagesStore").clearFilter();
        Rubedo.controller.LocalisationController.prototype.correctLanguageMenu();
    }

});