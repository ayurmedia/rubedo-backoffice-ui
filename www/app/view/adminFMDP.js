/*
 * File: app/view/adminFMDP.js
 *
 * This file was generated by Sencha Architect version 2.0.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Rubedo.view.adminFMDP', {
    extend: 'Ext.window.Window',
    alias: 'widget.adminFMDP',
    requires: [
        'Rubedo.view.MyGridPanel3'
    ],

    height: 578,
    id: 'adminFMDP',
    width: 1200,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },
    iconCls: 'masque-icon',
    title: 'Masques de page',
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
                    height: 30,
                    itemId: 'filArianne',
                    flex: 1,
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'origine',
                            iconCls: 'masque-icon',
                            text: 'Masques de page <b>></b> '
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    height: 50,
                    itemId: 'barreMeta',
                    flex: 1,
                    dock: 'bottom',
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
                            tpl: [
                                '<b>{text}</b> </br> <b>Création : </b> {creation} <b>Dernière modification : </b> {derniereModification} <b>Auteur : </b> {auteur}  <b>Version : </b>{version}'
                            ]
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    height: 60,
                    itemId: 'contextBar',
                    enableOverflow: true,
                    flex: 1,
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            id: 'boutonNouveauMasque',
                            iconAlign: 'top',
                            iconCls: 'add_big',
                            scale: 'large',
                            text: 'Ajouter'
                        },
                        {
                            xtype: 'button',
                            id: 'boutonSupprimerMasque',
                            iconAlign: 'top',
                            iconCls: 'remove_big',
                            scale: 'large',
                            text: 'Supprimer'
                        },
                        {
                            xtype: 'buttongroup',
                            title: 'Edition du masque',
                            columns: 4,
                            layout: {
                                columns: 2,
                                type: 'table'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    id: 'newRow',
                                    iconCls: 'window_add_med',
                                    scale: 'medium',
                                    text: 'Nouvelle Ligne'
                                },
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    id: 'newCol',
                                    iconCls: 'window_add_med',
                                    scale: 'medium',
                                    text: 'Nouvelle Colonne'
                                },
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    id: 'newBloc',
                                    iconCls: 'window_add_med',
                                    scale: 'medium',
                                    text: 'Nouveau Bloc'
                                },
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    id: 'deleteElement',
                                    iconCls: 'remove_med',
                                    scale: 'medium',
                                    text: 'Supprimer'
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            id: 'boutonCopierMasque',
                            iconAlign: 'top',
                            iconCls: 'applications_big',
                            scale: 'large',
                            text: 'Copier'
                        },
                        {
                            xtype: 'button',
                            id: 'AdminfMasquesExporter',
                            iconAlign: 'top',
                            iconCls: 'application_down_big',
                            scale: 'large',
                            text: 'Exporter'
                        },
                        {
                            xtype: 'button',
                            id: 'AdminfMasquesImporter',
                            iconAlign: 'top',
                            iconCls: 'application_up_big',
                            scale: 'large',
                            text: 'Importer'
                        },
                        {
                            xtype: 'button',
                            id: 'AdminfMasquesEnregistrer',
                            iconAlign: 'top',
                            iconCls: 'floppy_disc_big',
                            scale: 'large',
                            text: 'Enregistrer'
                        },
                        {
                            xtype: 'button',
                            id: 'AdminfMasquesPublier',
                            autoWidth: false,
                            iconAlign: 'top',
                            iconCls: 'floppy_disc_accept_big',
                            scale: 'large',
                            text: 'Enregistrer et publier'
                        },
                        {
                            xtype: 'button',
                            itemId: 'boutonCreerRaccourci',
                            iconAlign: 'top',
                            iconCls: 'favorite_add_big',
                            scale: 'large',
                            text: 'Ajouter aux favoris'
                        },
                        {
                            xtype: 'button',
                            id: 'ajouterPanierMasques',
                            iconAlign: 'top',
                            iconCls: 'shopping_cart_add_big',
                            scale: 'large',
                            text: 'Ajouter au panier'
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
                    frame: false,
                    id: 'masquesGrid',
                    width: 150,
                    maintainFlex: false,
                    resizable: true,
                    resizeHandles: 'e',
                    title: '',
                    forceFit: false,
                    store: 'MasquesDataJson',
                    viewConfig: {
                        id: 'masquesGridView'
                    },
                    features: [
                        {
                            ftype: 'grouping',
                            groupHeaderTpl: ' {name}',
                            startCollapsed: false
                        }
                    ],
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return('<img src="resources/icones/'+MyPrefData.iconsDir+'/16x16/application.png"> ' + value );
                            },
                            dataIndex: 'text',
                            editor: {
                                xtype: 'textfield',
                                allowBlank: false
                            },
                            flex: 1.2,
                            groupable: false,
                            text: 'Titre'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'etat',
                            flex: 1,
                            groupable: false,
                            text: 'Etat'
                        }
                    ],
                    plugins: [
                        Ext.create('Ext.grid.plugin.CellEditing', {
                            ptype: 'cellediting'
                        })
                    ],
                    selModel: Ext.create('Ext.selection.RowModel', {

                    })
                },
                {
                    xtype: 'tabpanel',
                    activeTab: 0,
                    flex: 1,
                    items: [
                        {
                            xtype: 'panel',
                            layout: {
                                align: 'stretch',
                                type: 'hbox'
                            },
                            iconCls: 'edit',
                            title: 'Edition',
                            items: [
                                {
                                    xtype: 'panel',
                                    border: 0,
                                    frame: false,
                                    id: 'masqueEdition',
                                    autoScroll: false,
                                    layout: {
                                        align: 'stretch',
                                        type: 'vbox'
                                    },
                                    flex: 1
                                },
                                {
                                    xtype: 'panel',
                                    frame: true,
                                    id: 'paneauPropMasque',
                                    width: 300,
                                    autoScroll: true,
                                    resizable: true,
                                    resizeHandles: 'w',
                                    collapseDirection: 'right',
                                    collapsed: false,
                                    collapsible: true,
                                    iconCls: 'parametres',
                                    title: 'Propriétés',
                                    titleCollapse: false,
                                    margins: '0, 0, 0, 2',
                                    items: [
                                        {
                                            xtype: 'hiddenfield',
                                            id: 'elementIdField',
                                            fieldLabel: 'Label'
                                        },
                                        {
                                            xtype: 'form',
                                            id: 'elementEditControl',
                                            margin: '6 0 0 0',
                                            autoScroll: false,
                                            bodyPadding: 10,
                                            iconCls: 'editZone',
                                            title: 'Sélectionnez un élément'
                                        },
                                        {
                                            xtype: 'form',
                                            disabled: false,
                                            margin: '10 0 0 0',
                                            autoScroll: false,
                                            activeItem: 0,
                                            bodyPadding: 10,
                                            iconCls: 'editBloc',
                                            title: 'Bloc',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: 'blocTitleField',
                                                    fieldLabel: 'Titre',
                                                    labelSeparator: ' ',
                                                    labelWidth: 45,
                                                    anchor: '100%'
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    id: 'blocHeightField',
                                                    fieldLabel: 'Hauteur',
                                                    labelSeparator: ' ',
                                                    labelWidth: 45,
                                                    anchor: '100%'
                                                },
                                                {
                                                    xtype: 'hiddenfield',
                                                    id: 'blocIdField',
                                                    fieldLabel: 'Label',
                                                    anchor: '100%'
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: 'modifierPropBloc',
                                                    text: 'Modifier',
                                                    anchor: '100%'
                                                }
                                            ]
                                        }
                                    ],
                                    listeners: {
                                        resize: {
                                            fn: me.onPaneauPropMasqueResize,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            iconCls: 'versions',
                            title: 'Historique',
                            items: [
                                {
                                    xtype: 'mygridpanel3'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onImageRender: function(abstractcomponent, options) {
        abstractcomponent.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/application.png');
    },

    onPaneauPropMasqueResize: function(abstractcomponent, adjWidth, adjHeight, options) {
        this.doLayout();
    }

});