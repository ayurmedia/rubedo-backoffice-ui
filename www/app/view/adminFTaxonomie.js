/*
 * File: app/view/adminFTaxonomie.js
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

Ext.define('Rubedo.view.adminFTaxonomie', {
    extend: 'Ext.window.Window',
    alias: 'widget.adminFTaxonomie',

    requires: [
        'Rubedo.view.TermesTaxonomieTree',
        'Rubedo.view.WorkspaceCombo'
    ],

    favoriteIcon: 'tag.png',
    height: 578,
    id: 'adminFTaxonomie',
    width: 1000,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },
    iconCls: 'page_taxonomy',
    title: 'Taxonomie',
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
                            iconCls: 'page_taxonomy',
                            text: 'Taxonomie <b>></b> '
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
                                    fn: me.onImageRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            itemId: 'boiteBarreMeta',
                            margin: '0 0 0 20',
                            tpl: [
                                '{customMeta}'
                            ]
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'top',
                    itemId: 'contextBar',
                    items: [
                        {
                            xtype: 'button',
                            ACL: 'write.ui.taxonomy',
                            id: 'boutonCreerTaxonomie',
                            iconAlign: 'top',
                            iconCls: 'add_big',
                            scale: 'large',
                            text: 'Ajouter'
                        },
                        {
                            xtype: 'button',
                            ACL: 'write.ui.taxonomy',
                            disabled: true,
                            id: 'boutonSupprimerTaxo',
                            iconAlign: 'top',
                            iconCls: 'remove_big',
                            scale: 'large',
                            text: 'Supprimer'
                        },
                        {
                            xtype: 'button',
                            ACL: 'write.ui.taxonomy',
                            disabled: true,
                            id: 'boutonEnregistrerTaxo',
                            iconAlign: 'top',
                            iconCls: 'floppy_disc_big',
                            scale: 'large',
                            text: 'Enregistrer'
                        },
                        {
                            xtype: 'buttongroup',
                            ACL: 'write.ui.taxonomy',
                            disabled: true,
                            id: 'taxoTermEditBrnGroup',
                            headerPosition: 'bottom',
                            title: 'Edition des termes',
                            columns: 2,
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'taxoOpenInsertBtn',
                                    iconAlign: 'top',
                                    iconCls: 'add_big',
                                    scale: 'large',
                                    text: 'Ajouter'
                                },
                                {
                                    xtype: 'button',
                                    id: 'taxoTermKiller',
                                    iconAlign: 'top',
                                    iconCls: 'remove_big',
                                    scale: 'large',
                                    text: 'Supprimer'
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            hidden: false,
                            itemId: 'boutonCreerRaccourci',
                            iconAlign: 'top',
                            iconCls: 'favorite_add_big',
                            scale: 'large',
                            text: 'Ajouter aux favoris'
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
                }
            ],
            items: [
                {
                    xtype: 'gridpanel',
                    managesStore: true,
                    autoRender: false,
                    autoShow: false,
                    id: 'AdminfTaxonomieGrid',
                    width: 150,
                    resizable: true,
                    resizeHandles: 'e',
                    title: '',
                    store: 'TaxonomieDataJson',
                    viewConfig: {

                    },
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var returner = value;
                                if (record.get("readOnly")){
                                    returner ="<i style=\"color:#777;\">"+value+"</i>";
                                }
                                return('<img src="resources/icones/'+MyPrefData.iconsDir+'/16x16/tag.png"> '+returner);
                            },
                            dataIndex: 'name',
                            flex: 1,
                            text: 'Nom'
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',
                    flex: 1,
                    disabled: true,
                    id: 'taxonomyCenterBox',
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            id: 'conteneurAdminfTaxo',
                            layout: {
                                align: 'stretch',
                                type: 'hbox'
                            },
                            iconCls: 'edit',
                            title: 'Edition',
                            items: [
                                {
                                    xtype: 'form',
                                    id: 'ProprietesTaxonomie',
                                    width: 300,
                                    overflowY: 'auto',
                                    bodyPadding: 10,
                                    collapseDirection: 'left',
                                    collapsed: false,
                                    collapsible: true,
                                    title: 'Propriétés',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            anchor: '100%',
                                            name: 'name',
                                            fieldLabel: 'Nom ',
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'textareafield',
                                            anchor: '100%',
                                            name: 'description',
                                            fieldLabel: 'Description '
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '100%',
                                            name: 'helpText',
                                            fieldLabel: 'Texte d\'aide '
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            anchor: '100%',
                                            name: 'expandable',
                                            fieldLabel: 'Extensible ',
                                            boxLabel: '',
                                            inputValue: 'true',
                                            uncheckedValue: 'false'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            anchor: '100%',
                                            name: 'multiSelect',
                                            fieldLabel: 'Choix multiple ',
                                            boxLabel: '',
                                            inputValue: 'true',
                                            uncheckedValue: 'false'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            anchor: '100%',
                                            name: 'mandatory',
                                            fieldLabel: 'Obligatoire ',
                                            boxLabel: '',
                                            inputValue: 'true',
                                            uncheckedValue: 'false'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'TermesTaxonomieTree',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'form',
                            id: 'taxoRightsBox',
                            bodyPadding: 10,
                            iconCls: 'user',
                            title: 'Droits',
                            items: [
                                {
                                    xtype: 'WorkspaceCombo',
                                    name: 'workspaces',
                                    fieldLabel: 'Espaces de travail',
                                    labelWidth: 120,
                                    multiSelect: true,
                                    store: 'ContributeWorkspacesCombo',
                                    anchor: '100%'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            iconCls: 'versions',
                            title: 'Historique'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onImageRender: function(abstractcomponent, options) {
        abstractcomponent.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/tag.png');
    }

});