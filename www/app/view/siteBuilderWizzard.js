/*
 * File: app/view/siteBuilderWizzard.js
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

Ext.define('Rubedo.view.siteBuilderWizzard', {
    extend: 'Ext.window.Window',
    alias: 'widget.siteBuilderWizzard',

    requires: [
        'Rubedo.view.WorkspaceCombo',
        'Rubedo.view.MyToolbar56'
    ],

    localiserId: 'siteBuilderWizzard',
    height: 330,
    id: 'siteBuilderWizzard',
    width: 464,
    resizable: false,
    layout: {
        type: 'fit'
    },
    title: 'Assistant de création de site',
    constrainHeader: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    layout: {
                        type: 'card'
                    },
                    title: '',
                    items: [
                        {
                            xtype: 'panel',
                            localiserId: 'sbStage2',
                            layout: {
                                type: 'anchor'
                            },
                            bodyPadding: 10,
                            title: 'Etape 1 : Modèle',
                            items: [
                                {
                                    xtype: 'radiofield',
                                    localiserId: 'createEmptySiteField',
                                    anchor: '100%',
                                    id: 'useEmptySiteField',
                                    labelWidth: 110,
                                    name: 'builtOnEmptySite',
                                    boxLabel: 'Créer un site vide',
                                    checked: true,
                                    inputValue: 'true',
                                    listeners: {
                                        change: {
                                            fn: me.onUseEmptySiteFieldChange,
                                            scope: me
                                        },
                                        afterrender: {
                                            fn: me.onUseEmptySiteFieldAfterRender,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'radiofield',
                                    localiserId: 'createSiteFromModelField',
                                    anchor: '100%',
                                    id: 'sitesSecondReplicaterChoice',
                                    labelWidth: 320,
                                    name: 'builtOnEmptySite',
                                    boxLabel: 'Créer un site en utilisant un site existant comme modèle',
                                    inputValue: 'false',
                                    listeners: {
                                        render: {
                                            fn: me.onSitesSecondReplicaterChoiceRender,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'fieldset',
                                    border: 0,
                                    id: 'modelSiteIdFieldset',
                                    padding: 0,
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            localiserId: 'siteMoelField',
                                            anchor: '100%',
                                            id: 'modelSiteIdField',
                                            fieldLabel: 'Site modèle',
                                            name: 'builtOnModelSiteId',
                                            submitValue: false,
                                            allowBlank: false,
                                            queryMode: 'local',
                                            store: 'SitesJson',
                                            valueField: 'id',
                                            listeners: {
                                                change: {
                                                    fn: me.onModelSiteIdFieldChange,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            localiserId: 'sbStage1',
                            autoScroll: true,
                            layout: {
                                type: 'anchor'
                            },
                            bodyPadding: 10,
                            title: 'Etape 2 : Identification',
                            items: [
                                {
                                    xtype: 'textfield',
                                    localiserId: 'domainNameField',
                                    anchor: '100%',
                                    fieldLabel: 'Nom de domaine *',
                                    labelWidth: 110,
                                    name: 'text',
                                    allowBlank: false,
                                    regex: new RegExp(/^([a-z]|[0-9]|[-]|[.]){0,}$/)
                                },
                                {
                                    xtype: 'combobox',
                                    managesStore: true,
                                    localiserId: 'themeField',
                                    anchor: '100%',
                                    fieldLabel: 'Theme ',
                                    labelWidth: 110,
                                    name: 'theme',
                                    value: 'Default',
                                    displayField: 'label',
                                    store: 'SiteThemesStore',
                                    valueField: 'text'
                                },
                                {
                                    xtype: 'combobox',
                                    localiserId: 'protocolField',
                                    anchor: '100%',
                                    fieldLabel: 'Protocole *',
                                    labelWidth: 110,
                                    name: 'protocol',
                                    value: [
                                        'HTTP'
                                    ],
                                    allowBlank: false,
                                    editable: false,
                                    forceSelection: true,
                                    multiSelect: true,
                                    store: [
                                        'HTTP',
                                        'HTTPS'
                                    ]
                                },
                                {
                                    xtype: 'WorkspaceCombo',
                                    labelWidth: 110,
                                    store: 'ContributeWorkspacesCombo',
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'combobox',
                                    validator: function(value) {
                                        var myValue=Ext.getCmp("siteDefaultLanguageField").getValue();
                                        var languagesArray=Ext.getCmp("siteUsedLanguagesField1").getValue();
                                        if ((!Ext.isEmpty(myValue))&&(!Ext.isEmpty(languagesArray))&&(!Ext.Array.contains(languagesArray,myValue))){
                                            return(Rubedo.RubedoAutomatedElementsLoc.siteLanguageChoiceError);
                                        }
                                        return(true);
                                    },
                                    localiserId: 'defaultLanguageField',
                                    anchor: '100%',
                                    id: 'siteDefaultLanguageField1',
                                    fieldLabel: 'Default language *',
                                    labelWidth: 110,
                                    name: 'defaultLanguage',
                                    allowBlank: false,
                                    displayField: 'label',
                                    forceSelection: true,
                                    queryMode: 'local',
                                    store: 'AllLanguagesStore',
                                    typeAhead: true,
                                    valueField: 'locale'
                                }
                            ],
                            listeners: {
                                added: {
                                    fn: me.onPanelAdded,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'panel',
                            localiserId: 'sbStage3',
                            autoScroll: true,
                            layout: {
                                type: 'anchor'
                            },
                            bodyPadding: 10,
                            title: 'Etape 3 : Référencement',
                            items: [
                                {
                                    xtype: 'textfield',
                                    localiserId: 'siteDefaultTitleField',
                                    anchor: '100%',
                                    fieldLabel: 'Titre par défaut',
                                    name: 'title'
                                },
                                {
                                    xtype: 'textareafield',
                                    localiserId: 'defaultDescriptionField',
                                    anchor: '100%',
                                    fieldLabel: 'Description par défaut',
                                    name: 'description',
                                    maxLength: 250
                                },
                                {
                                    xtype: 'textfield',
                                    localiserId: 'defaultAuthorField',
                                    anchor: '100%',
                                    fieldLabel: 'Auteur par défaut',
                                    name: 'author',
                                    value: 'Powered by Rubedo'
                                },
                                {
                                    xtype: 'button',
                                    localiserId: 'siteBuilderWizardSubmit',
                                    anchor: '100%',
                                    id: 'siteWizzardCreateBtn',
                                    margin: '10 0 0 0',
                                    scale: 'large',
                                    text: 'Créer ce site'
                                }
                            ],
                            listeners: {
                                render: {
                                    fn: me.onPanelRender,
                                    scope: me
                                }
                            }
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'mytoolbar56',
                            height: 32,
                            dock: 'bottom'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onUseEmptySiteFieldChange: function(field, newValue, oldValue, eOpts) {
        if (newValue){
            Ext.getCmp("modelSiteIdFieldset").hide();
            Ext.getCmp("modelSiteIdField").setValue(null);
            Ext.getCmp("modelSiteIdField").allowBlank=true;
            Ext.getCmp("modelSiteIdField").submitValue=false;
        } else {
            Ext.getCmp("modelSiteIdFieldset").show();
            Ext.getCmp("modelSiteIdField").allowBlank=false;
            Ext.getCmp("modelSiteIdField").submitValue=true;
        }
    },

    onUseEmptySiteFieldAfterRender: function(component, eOpts) {
        component.fireEvent("change", true);
    },

    onSitesSecondReplicaterChoiceRender: function(component, eOpts) {
        if (Ext.isEmpty(Ext.getStore("SitesJson").getRange())){
            component.hide();
        }
    },

    onModelSiteIdFieldChange: function(field, newValue, oldValue, eOpts) {
        if (!Ext.isEmpty(newValue)){
            var theRec = field.getStore().findRecord("id", newValue).getData();
            Ext.Array.forEach(Ext.getCmp("siteBuilderWizzard").query("field"),function(somefield){
                if ((somefield.name!="builtOnEmptySite")&&(somefield.name!="builtOnModelSiteId")&&(somefield.name!="text")){
                    somefield.setValue(theRec[somefield.name]);
                }
            });
        }
    },

    onPanelAdded: function(component, container, pos, eOpts) {
        var languagesPicker = Ext.create("Ext.ux.form.field.BoxSelect", {
            anchor:"100%",
            name:"languages",
            id:"siteUsedLanguagesField1",
            allowBlank:false,
            labelWidth:110,
            fieldLabel:Rubedo.RubedoAutomatedElementsLoc.languagesText+" *",
            multiSelect:true,
            forceSelection:true,
            store: Ext.getStore("AllLanguagesStore2"),
            displayField:"label",
            valueField:"locale",
            queryMode:"local"
        });
        component.add(languagesPicker);
    },

    onPanelRender: function(component, eOpts) {
        var tagPicker = Ext.create("Ext.ux.form.field.BoxSelect", {
            store:[],
            anchor:"100%",
            name:"keywords",
            fieldLabel:Rubedo.RubedoAutomatedElementsLoc.defaultKeywordsText,
            multiSelect:true,
            forceSelection:false,
            createNewOnEnter:true,
            hideTrigger:true,
            triggerOnClick:false,
            createNewOnBlur:true,
            pinList:false
        });
        component.insert(3,tagPicker);
    }

});