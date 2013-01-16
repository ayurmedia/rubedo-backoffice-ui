/*
 * File: app/view/contributionPages.js
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

Ext.define('Rubedo.view.contributionPages', {
    extend: 'Ext.window.Window',
    alias: 'widget.contributionPages',

    favoriteIcon: 'application.png',
    ACL: 'read.ui.pages',
    height: 578,
    id: 'contributionPages',
    width: 1200,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },
    iconCls: 'masque-icon',
    title: 'Pages',
    constrainHeader: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            tools: [
                {
                    xtype: 'tool',
                    itemId: 'windowMinimize',
                    type: 'minimize'
                },
                {
                    xtype: 'tool',
                    itemId: 'windowMaximize',
                    type: 'maximize'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'top',
                    height: 30,
                    itemId: 'filArianne',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'origine',
                            iconCls: 'masque-icon',
                            text: 'Pages<b> ></b> '
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'top',
                    height: 86,
                    itemId: 'contextBar',
                    items: [
                        {
                            xtype: 'button',
                            disabled: true,
                            id: 'addPageBtn',
                            iconAlign: 'top',
                            iconCls: 'add_big',
                            scale: 'large',
                            text: 'Ajouter'
                        },
                        {
                            xtype: 'button',
                            disabled: true,
                            id: 'removePageBtn',
                            iconAlign: 'top',
                            iconCls: 'remove_big',
                            scale: 'large',
                            text: 'Supprimer'
                        },
                        {
                            xtype: 'buttongroup',
                            ACL: 'write.ui.masks',
                            disabled: true,
                            headerPosition: 'bottom',
                            title: 'Edition',
                            columns: 6,
                            layout: {
                                columns: 2,
                                type: 'table'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    id: 'newPageBloc',
                                    iconAlign: 'top',
                                    iconCls: 'window_add_big',
                                    scale: 'large',
                                    text: 'Nouveau Bloc'
                                },
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    id: 'deletePageElement',
                                    iconAlign: 'top',
                                    iconCls: 'window_remove_big',
                                    scale: 'large',
                                    text: 'Supprimer'
                                },
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    id: 'pageElementUp',
                                    iconAlign: 'top',
                                    iconCls: 'arrow_up_big',
                                    scale: 'large',
                                    text: 'Déplacer'
                                },
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    id: 'pageElementDown',
                                    iconAlign: 'top',
                                    iconCls: 'arrow_down_big',
                                    scale: 'large',
                                    text: 'Déplacer'
                                }
                            ]
                        },
                        {
                            xtype: 'buttongroup',
                            disabled: true,
                            headerPosition: 'bottom',
                            title: 'Presse-papiers',
                            columns: 4,
                            layout: {
                                columns: 2,
                                type: 'table'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    hidden: true,
                                    iconAlign: 'top',
                                    iconCls: 'shopping_cart_add_big',
                                    scale: 'large',
                                    text: 'Ajouter au panier'
                                },
                                {
                                    xtype: 'button',
                                    iconAlign: 'top',
                                    iconCls: 'favorite_add_big',
                                    scale: 'large',
                                    text: 'Ajouter aux favoris'
                                }
                            ]
                        },
                        {
                            xtype: 'buttongroup',
                            ACL: 'write.ui.masks',
                            disabled: true,
                            headerPosition: 'bottom',
                            title: 'Sauvegarde',
                            columns: 4,
                            layout: {
                                columns: 2,
                                type: 'table'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'pageSaveBtn',
                                    iconAlign: 'top',
                                    iconCls: 'floppy_disc_big',
                                    scale: 'large',
                                    text: 'Enregistrer',
                                    listeners: {
                                        afterrender: {
                                            fn: me.onPageSaveBtnAfterRender,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            itemId: 'boutonAide',
                            iconCls: 'info_big',
                            scale: 'large',
                            text: ''
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'bottom',
                    height: 50,
                    itemId: 'barreMeta',
                    items: [
                        {
                            xtype: 'image',
                            height: 45,
                            width: 48,
                            listeners: {
                                render: {
                                    fn: me.onImageRender1,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            itemId: 'boiteBarreMeta',
                            tpl: [
                                '<b>{text}</b> </br> <b>Création : </b> {creation} <b>Dernière modification : </b> {derniereModification} <b>Auteur : </b> {createUser}  <b>Version : </b>{version}'
                            ]
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'treepanel',
                    id: 'mainPageTree',
                    width: 225,
                    title: '',
                    store: 'PagesDataStore',
                    useArrows: true,
                    viewConfig: {
                        plugins: [
                            Ext.create('Ext.tree.plugin.TreeViewDragDrop', {
                                ptype: 'treeviewdragdrop'
                            })
                        ],
                        listeners: {
                            beforedrop: {
                                fn: me.onTreedragdroppluginBeforeDrop,
                                scope: me
                            },
                            drop: {
                                fn: me.onTreedragdroppluginDrop,
                                scope: me
                            }
                        }
                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'combobox',
                                    managesStore: true,
                                    flex: 1,
                                    id: 'pagesSitesCombo',
                                    fieldLabel: 'Site ',
                                    labelWidth: 40,
                                    editable: false,
                                    forceSelection: true,
                                    queryMode: 'local',
                                    store: 'SitesComboPages',
                                    valueField: 'id'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',
                    flex: 1,
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            layout: {
                                align: 'stretch',
                                type: 'hbox'
                            },
                            title: 'Edition',
                            items: [
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    id: 'mainPageEdition',
                                    layout: {
                                        align: 'stretch',
                                        type: 'vbox'
                                    },
                                    title: ''
                                },
                                {
                                    xtype: 'panel',
                                    frame: false,
                                    width: 300,
                                    overflowY: 'auto',
                                    resizable: true,
                                    resizeHandles: 'w',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    bodyPadding: 5,
                                    collapseDirection: 'right',
                                    collapsible: true,
                                    title: 'Propriétés',
                                    items: [
                                        {
                                            xtype: 'form',
                                            flex: 1,
                                            id: 'pageElementPropsPanel',
                                            title: 'Sélectionnez un élément'
                                        },
                                        {
                                            xtype: 'hiddenfield',
                                            id: 'pageElementIdField',
                                            fieldLabel: 'Label'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: 'pagesInternalPreview',
                            layout: {
                                type: 'fit'
                            },
                            title: 'Aperçu',
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    height: 24,
                                    items: [
                                        {
                                            xtype: 'tbtext',
                                            id: 'pagePreviewTextItem',
                                            text: ''
                                        },
                                        {
                                            xtype: 'tbfill'
                                        },
                                        {
                                            xtype: 'button',
                                            id: 'pagePreviewRefreshBtn',
                                            iconCls: 'refresh',
                                            text: 'Actualiser'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'form',
                            disabled: true,
                            id: 'mainPageAttributeForm',
                            overflowY: 'auto',
                            bodyPadding: 10,
                            title: 'Propriétés',
                            items: [
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    name: 'text',
                                    fieldLabel: 'Nom ',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    name: 'pageURL',
                                    fieldLabel: 'URL '
                                },
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    name: 'excludeFromMenu',
                                    fieldLabel: 'Hors navigation',
                                    boxLabel: '',
                                    inputValue: 'true'
                                },
                                {
                                    xtype: 'fieldset',
                                    title: 'Referencement',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            anchor: '100%',
                                            name: 'title',
                                            fieldLabel: 'Titre ',
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'textareafield',
                                            anchor: '100%',
                                            name: 'description',
                                            fieldLabel: 'Description ',
                                            maxLength: 250
                                        }
                                    ],
                                    listeners: {
                                        render: {
                                            fn: me.onMainPageAttributeFormRender,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onPageSaveBtnAfterRender: function(abstractcomponent, options) {
        abstractcomponent.findParentByType("window").getEl().addKeyListener({key:"s", ctrl:true}, function(e,t){
        if (!abstractcomponent.disabled){
            abstractcomponent.fireEvent("click", abstractcomponent);
            t.stopEvent();
        }
    });
    },

    onTreedragdroppluginBeforeDrop: function(node, data, overModel, dropPosition, dropFunction, options) {

        if (!ACL.interfaceRights["write.ui.masks"]){
            return(false);
        }
        Ext.getStore("PagesDataStore").suspendAutoSync();
        var movedOne=data.records[0];
        var interm=0;
        var targeted=overModel.get("orderValue");

        if (dropPosition=="before"){
            if ((movedOne.parentNode!=overModel.parentNode)&&(movedOne.parentNode.childNodes.length==1)){
                movedOne.parentNode.set("expandable", false);
            }
            if (!Ext.isEmpty(overModel.previousSibling)){interm=overModel.previousSibling.get("orderValue");}
            movedOne.set("orderValue", (interm+targeted)/2);
        } else if (dropPosition=="after"){
            if ((movedOne.parentNode!=overModel.parentNode)&&(movedOne.parentNode.childNodes.length==1)){
                movedOne.parentNode.set("expandable", false);
            }
            if (!Ext.isEmpty(overModel.nextSibling)){interm=overModel.nextSibling.get("orderValue");}
            else{interm=10000;}
            movedOne.set("orderValue", (interm+targeted)/2);
        } else if (dropPosition=="append"){
            if (movedOne.parentNode.childNodes.length==1){
                movedOne.parentNode.set("expandable", false);
            }

            if (overModel.hasChildNodes()){
                movedOne.set("orderValue", overModel.lastChild.get("orderValue")+100);
            } else {
                movedOne.set("orderValue", 100);
                overModel.set("expandable", true);
            }
        }
    },

    onTreedragdroppluginDrop: function(node, data, overModel, dropPosition, options) {
        var task= new Ext.util.DelayedTask(function(){
            Ext.getStore("PagesDataStore").resumeAutoSync();
            Ext.getStore("PagesDataStore").sync();
        });
        task.delay(50);
    },

    onMainPageAttributeFormRender: function(abstractcomponent, options) {
        var tagPicker = Ext.create("Ext.ux.form.field.BoxSelect", {
            store:[],
            anchor:"100%",
            name:"keywords",
            fieldLabel:"Mots clés",
            multiSelect:true,
            forceSelection:false,
            createNewOnEnter:true,
            hideTrigger:true,
            triggerOnClick:false,
            createNewOnBlur:true,
            pinList:false
        });
        abstractcomponent.add(tagPicker);
    },

    onImageRender1: function(abstractcomponent, options) {
        abstractcomponent.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/application.png');
    }

});