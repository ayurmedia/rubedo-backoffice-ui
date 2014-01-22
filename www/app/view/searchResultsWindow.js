/*
 * File: app/view/searchResultsWindow.js
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

Ext.define('Rubedo.view.searchResultsWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.searchResultsWindow',

    requires: [
        'Rubedo.view.MyTool16',
        'Rubedo.view.MyTool17'
    ],

    localiserId: 'searchResultsWindow',
    height: 492,
    id: 'searchResultsWindow',
    width: 936,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },
    constrainHeader: true,
    iconCls: 'search',
    title: 'Résultats de recherche',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                me.processSearchFacetBox({
                    xtype: 'form',
                    localiserId: 'filtersPanel',
                    id: 'searchFacetBox',
                    width: 240,
                    overflowY: 'auto',
                    layout: {
                        align: 'stretch',
                        type: 'vbox'
                    },
                    bodyPadding: '0 20 0 10',
                    title: 'Filtres',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    id: 'ESFacetQueryField',
                                    fieldLabel: '',
                                    labelWidth: 40,
                                    name: 'query',
                                    listeners: {
                                        specialkey: {
                                            fn: me.onESFacetQueryFieldSpecialkey,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'tbfill',
                                    flex: 0.01
                                },
                                {
                                    xtype: 'button',
                                    id: 'ESFacetQueryBtn',
                                    iconCls: 'search',
                                    text: ''
                                }
                            ]
                        },
                        {
                            xtype: 'form',
                            localiserId: 'fsGlobalSetPan',
                            flex: 1,
                            dock: 'top',
                            hidden: true,
                            bodyPadding: 10,
                            collapsed: true,
                            collapsible: true,
                            title: 'Global facet settings',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    localiserId: 'displayFacetFieldM',
                                    anchor: '100%',
                                    fieldLabel: 'Display',
                                    name: 'displayFacet',
                                    boxLabel: '',
                                    checked: true,
                                    inputValue: 'true'
                                },
                                me.processFacetOperator({
                                    xtype: 'combobox',
                                    localiserId: 'facetOperatorField',
                                    anchor: '100%',
                                    fieldLabel: 'Facet operator',
                                    name: 'facetOperator',
                                    value: 'AND',
                                    allowBlank: false,
                                    editable: false,
                                    forceSelection: true
                                }),
                                {
                                    xtype: 'button',
                                    anchor: '100%',
                                    id: 'apllyFacetPropsToAllBtn',
                                    text: 'Apply to all',
                                    listeners: {
                                        click: {
                                            fn: me.onApllyFacetPropsToAllBtnClick,
                                            scope: me
                                        }
                                    }
                                }
                            ],
                            listeners: {
                                afterrender: {
                                    fn: me.onFormAfterRender,
                                    scope: me
                                }
                            }
                        }
                    ]
                }),
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    id: 'ResultContentsGrid',
                    title: '',
                    store: 'ESFacetteStore',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            localiserId: 'titleCol',
                            dataIndex: 'text',
                            text: 'Titre',
                            flex: 2
                        },
                        {
                            xtype: 'gridcolumn',
                            localiserId: 'authorCol',
                            dataIndex: 'author',
                            text: 'Auteur',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return(record.get("objectType")+" : "+record.get("type"));
                            },
                            localiserId: 'typeCol',
                            dataIndex: 'type',
                            text: 'Type'
                        },
                        {
                            xtype: 'datecolumn',
                            localiserId: 'lastUpdateCol',
                            dataIndex: 'lastUpdateTime',
                            text: 'Date de dernière modification',
                            flex: 1.2,
                            format: 'F j, Y, G:i '
                        },
                        {
                            xtype: 'numbercolumn',
                            localiserId: 'pertinenceCol',
                            width: 80,
                            dataIndex: 'score',
                            text: 'Pertinence',
                            format: '0'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            width: 360,
                            displayInfo: true,
                            store: 'ESFacetteStore'
                        }
                    ],
                    listeners: {
                        selectionchange: {
                            fn: me.onResultContentsGridSelectionChange,
                            scope: me
                        }
                    }
                }
            ],
            listeners: {
                beforeclose: {
                    fn: me.onSearchResultsWindowBeforeClose,
                    scope: me
                },
                beforerender: {
                    fn: me.onSearchResultsWindowBeforeRender,
                    scope: me
                }
            },
            tools: [
                {
                    xtype: 'mytool16'
                },
                {
                    xtype: 'mytool17'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'top',
                    id: 'ESSearchTopBar',
                    items: [
                        {
                            xtype: 'toolbar',
                            border: 0,
                            height: 32,
                            id: 'SearchActiveFacetBar',
                            enableOverflow: true
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            id: 'ESFavBtn',
                            itemId: 'boutonCreerRaccourci',
                            iconCls: 'favorite_add_med',
                            scale: 'medium',
                            text: ''
                        },
                        {
                            xtype: 'button',
                            localiserId: 'chooseBtn',
                            disabled: true,
                            hidden: true,
                            id: 'selectESEntityBtn',
                            iconCls: 'ouiSpetit',
                            text: '<b>Choose</b>',
                            listeners: {
                                click: {
                                    fn: me.onSelectESEntityBtnClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            localiserId: 'saveQueryBtn',
                            hidden: true,
                            id: 'saveGeoQueryBtn',
                            iconCls: 'ouiSpetit',
                            text: 'Enregistrer la requête',
                            listeners: {
                                click: {
                                    fn: me.onSaveGeoQueryBtnClick,
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

    processSearchFacetBox: function(config) {
        config.plugins=[Ext.create("Ext.ux.BoxReorderer")];
        return config;
    },

    processFacetOperator: function(config) {
        config.store=[["AND",Rubedo.RubedoAutomatedElementsLoc.andText],["OR",Rubedo.RubedoAutomatedElementsLoc.orText]];
        return config;
    },

    onESFacetQueryFieldSpecialkey: function(field, e, eOpts) {
        if (e.getKey() == e.ENTER) {
            Ext.getCmp("ESFacetQueryBtn").fireEvent("click",Ext.getCmp("ESFacetQueryBtn"));
        }
    },

    onApllyFacetPropsToAllBtnClick: function(button, e, eOpts) {
        var values=button.up().getForm().getFieldValues();
        Ext.Array.forEach(button.up().up().items.items,function(fieldset){
            fieldset.getComponent("facetIsDisplayedField").setValue(values.displayFacet);
            fieldset.getComponent("facetOperatorField").setValue(values.facetOperator);
        });
    },

    onFormAfterRender: function(component, eOpts) {
        if (component.up().up().advancedESQMode){

            component.show();
        }
    },

    onSearchResultsWindowBeforeClose: function(panel, eOpts) {
        Ext.getStore("ESFacetteStore").removeAll();
        Ext.getStore("ESFacetteStore").activeFacettes={ };
        Ext.getStore("ESFacetteStore").getProxy().api.read='elastic-search';
    },

    onResultContentsGridSelectionChange: function(model, selected, eOpts) {
        if (Ext.isEmpty(selected)){
            Ext.getCmp("selectESEntityBtn").disable();
        } else {
            Ext.getCmp("selectESEntityBtn").enable();
        }
    },

    onSelectESEntityBtnClick: function(button, e, eOpts) {
        var id=Ext.getCmp("ResultContentsGrid").getSelectionModel().getLastSelected().get("id");
        Ext.getCmp(button.up().up().targetId).setValue(id);
        button.up().up().close();
    },

    onSaveGeoQueryBtnClick: function(button, e, eOpts) {
        var rez = Ext.JSON.encode(Ext.getStore("ESFacetteStore").activeFacettes);
        Ext.getCmp(button.up().up().targetedId).setValue(rez);

        if (button.up().up().advancedESQMode){
            var newDF= [ ];
            Ext.Array.forEach(Ext.getCmp("searchFacetBox").items.items, function(facet){
                if (facet.getComponent("facetIsDisplayedField").getValue()){
                    newDF.push({
                        name:facet.usedProperty,
                        operator:facet.getComponent("facetOperatorField").getValue()
                    });
                }
            });
            newDF=Ext.JSON.encode(newDF);
            Ext.getCmp(button.up().up().targetedId).up().getComponent("displayedFacetsBrotherField").setValue(newDF);
        }

        button.up().up().close();
    },

    onSearchResultsWindowBeforeRender: function(component, eOpts) {
        if(component.advancedESQMode){
            component.defaultFOps={ };
            Ext.Ajax.request({
                url: 'elastic-search/get-default-operators',
                params: {

                },
                success: function(response){
                    var defops = Ext.JSON.decode(response.responseText).data;
                    component.defaultFOps=defops;
                }
            });
        }



        if (component.geoQueryMode){
            component.modal=true;
            component.setTitle(Rubedo.RubedoAutomatedElementsLoc.esGeoQueryText);
            Ext.getStore("ESFacetteStore").activeFacettes={ };
            Ext.getCmp("ESFavBtn").hide();
            Ext.getCmp("saveGeoQueryBtn").show();
            if (!Ext.isEmpty(component.predefFacettes)){
                Ext.getStore("ESFacetteStore").activeFacettes=component.predefFacettes;
            }
            Ext.getStore("ESFacetteStore").getProxy().api.read='elastic-search-geo';
            Ext.getStore("ESFacetteStore").load();
        } else if (component.queryMode){
            component.modal=true;
            component.setTitle(Rubedo.RubedoAutomatedElementsLoc.esQueryText);
            Ext.getStore("ESFacetteStore").activeFacettes={ };
            Ext.getCmp("ESFavBtn").hide();
            Ext.getCmp("saveGeoQueryBtn").show();
            if (!Ext.isEmpty(component.predefFacettes)){
                Ext.getStore("ESFacetteStore").activeFacettes=component.predefFacettes;
            }
            Ext.getStore("ESFacetteStore").getProxy().api.read='elastic-search';
            Ext.getStore("ESFacetteStore").load();

        } else if (component.damQueryMode){
            component.modal=true;
            component.setTitle(Rubedo.RubedoAutomatedElementsLoc.esDAMQueryText);
            Ext.getStore("ESFacetteStore").activeFacettes={ };
            Ext.getCmp("ESFavBtn").hide();
            Ext.getCmp("saveGeoQueryBtn").show();
            if (!Ext.isEmpty(component.predefFacettes)){
                Ext.getStore("ESFacetteStore").activeFacettes=component.predefFacettes;
            }
            Ext.getStore("ESFacetteStore").getProxy().api.read='elastic-search-dam';
            Ext.getStore("ESFacetteStore").load();

        } else if (component.userQueryMode){
            component.modal=true;
            component.setTitle(Rubedo.RubedoAutomatedElementsLoc.esDAMQueryText);
            Ext.getStore("ESFacetteStore").activeFacettes={ };
            Ext.getCmp("ESFavBtn").hide();
            Ext.getCmp("saveGeoQueryBtn").show();
            if (!Ext.isEmpty(component.predefFacettes)){
                Ext.getStore("ESFacetteStore").activeFacettes=component.predefFacettes;
            }
            Ext.getStore("ESFacetteStore").getProxy().api.read='elastic-search-user';
            Ext.getStore("ESFacetteStore").load();

        } else if (component.DCEFMode){
            component.modal=true;
            component.setTitle("Content Selector");
            Ext.getStore("ESFacetteStore").activeFacettes={ };
            if (!Ext.isEmpty(component.allowedCT)){
                Ext.getStore("ESFacetteStore").activeFacettes={type:component.allowedCT};
            }
            Ext.getCmp("ESFavBtn").hide();
            Ext.getCmp("selectESEntityBtn").show();
            Ext.getStore("ESFacetteStore").getProxy().api.read='elastic-search-content';
            Ext.getStore("ESFacetteStore").load();
        }

    }

});