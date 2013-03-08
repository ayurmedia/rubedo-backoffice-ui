/*
 * File: app/view/assistantRequetage.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
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

Ext.define('Rubedo.view.assistantRequetage', {
    extend: 'Ext.window.Window',
    alias: 'widget.assistantRequetage',

    requires: [
        'Rubedo.view.assisstantRE4',
        'Rubedo.view.assisstantRE5',
        'Rubedo.view.assisstantRE6'
    ],

    simpleMode: false,
    height: 400,
    id: 'assistantRequetage',
    width: 539,
    layout: {
        type: 'card'
    },
    iconCls: 'search',
    title: 'Assistant de requêtage ',
    constrainHeader: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'progressbar',
                            flex: 1,
                            id: 'progressAR',
                            animate: true,
                            text: 'Etape 1 sur 5',
                            value: 0.2
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            id: 'boutonPrevRequeteur',
                            iconCls: 'arrow_left',
                            text: 'Précédent'
                        },
                        {
                            xtype: 'button',
                            id: 'boutonNextRequeteur',
                            iconAlign: 'right',
                            iconCls: 'arrow_right',
                            text: 'Suivant'
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'form',
                    etape: '1',
                    id: 'assisstantRE1',
                    bodyPadding: 10,
                    title: 'Choix des types de contenus',
                    items: [
                        {
                            xtype: 'combobox',
                            managesStore: true,
                            anchor: '90%',
                            id: 'champTCRequeteur',
                            style: '{float:left}',
                            name: 'contentTypes',
                            fieldLabel: '',
                            allowBlank: false,
                            editable: false,
                            displayField: 'type',
                            forceSelection: true,
                            multiSelect: true,
                            queryMode: 'local',
                            store: 'TCNDepCombo',
                            valueField: 'id'
                        },
                        {
                            xtype: 'button',
                            id: 'boutonSelectAllTCAR',
                            style: '{float:right;}',
                            iconCls: 'ouiSpetit',
                            text: '',
                            tooltip: 'Tout selectionner'
                        }
                    ]
                },
                {
                    xtype: 'form',
                    etape: '2',
                    id: 'assisstantRE2',
                    overflowY: 'auto',
                    bodyPadding: 10,
                    title: 'Choix des termes de la taxonomie'
                },
                {
                    xtype: 'assisstantRE4'
                },
                {
                    xtype: 'assisstantRE5'
                },
                {
                    xtype: 'assisstantRE6'
                }
            ],
            listeners: {
                render: {
                    fn: me.onAssistantRequetageRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onAssistantRequetageBeforeClose,
                    scope: me
                },
                afterrender: {
                    fn: me.onAssistantRequetageAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onAssistantRequetageRender: function(abstractcomponent, options) {
        Ext.getStore('TCDepForQA').load();
        Ext.getStore('TaxonomyForQA').load();
    },

    onAssistantRequetageBeforeClose: function(panel, options) {
        Ext.getStore('TCDepForQA').removeAll();
        Ext.getStore('TaxonomyForQA').removeAll();
        Ext.getStore("VersioningStore").clearFilter(true);
        Ext.getStore("VersioningStore").removeAll();
    },

    onAssistantRequetageAfterRender: function(abstractcomponent, options) {
        if (abstractcomponent.simpleMode) {
            Ext.getCmp("champTCRequeteur").multiSelect=false;
            Ext.getCmp("boutonSelectAllTCAR").hide();
            Ext.getCmp("assisstantRE4").up().remove(Ext.getCmp("assisstantRE4"));
            Ext.getCmp("assisstantRE5").etape=3;
            Ext.getCmp("assisstantRE6").etape=4;
            Ext.getCmp("progressAR").updateProgress(0.25, "Etape 1 sur 4");
            Ext.getCmp("queryNameField").hide();
        } if (abstractcomponent.editorMode) {
            if (abstractcomponent.simpleMode) {
                Ext.getCmp("assistantRequetage").getLayout().setActiveItem(3);
                Ext.getCmp("progressAR").updateProgress(1, "Etape 4 sur 4");
            }else{
                Ext.getCmp("assistantRequetage").getLayout().setActiveItem(4);
                Ext.getCmp("progressAR").updateProgress(1, "Etape 5 sur 5");
            }
            Ext.getCmp("boutonPrevRequeteur").show();
            Ext.getCmp("boutonNextRequeteur").hide();
            Ext.getCmp("assistantRequetage").setLoading(true);
            if(abstractcomponent.ROMode){
                Ext.getCmp("progressAR").up().hide();
                Ext.getCmp("queryBuildSaveBtn").hide();
                Ext.getCmp("queryNameField").setReadOnly(true);
                Ext.getCmp("assistantRequetage").getLayout().getActiveItem().setTitle(abstractcomponent.initialQuery.queryName);
            }
            var task= new Ext.util.DelayedTask(function(){
                Ext.getCmp("queryNameField").setValue(abstractcomponent.initialQuery.queryName);
                Ext.getCmp("champTCRequeteur").setValue(abstractcomponent.initialQuery.contentTypes);
                Rubedo.controller.assistantRequetageController.prototype.adaptToTCSelect(true);
                Rubedo.controller.assistantRequetageController.prototype.restoreFieldRules(abstractcomponent.initialQuery.fieldRules);
                Ext.getCmp("assistantRequetage").setLoading(false);
                var task2= new Ext.util.DelayedTask(function(){
                    Rubedo.controller.assistantRequetageController.prototype.displayQuery(Rubedo.controller.assistantRequetageController.prototype.readQuery());
                });
                task2.delay(100);
            });
            task.delay(400);
        }
    }

});