/*
 * File: app/view/contributionContenus.js
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

Ext.define('KECMdesktop.view.contributionContenus', {
    extend: 'Ext.window.Window',
    alias: 'widget.contributionContenus',

    height: 578,
    id: 'contributionContenus',
    width: 650,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },
    iconCls: 'content-icon',
    title: 'Contenus',
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
                            iconCls: 'content-icon',
                            text: 'Contenus <b>></b> '
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
                    height: 54,
                    itemId: 'contextBar',
                    flex: 1,
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            id: 'boutonAjouterContenu',
                            iconCls: 'add_big',
                            scale: 'large',
                            text: 'Ajouter'
                        },
                        {
                            xtype: 'button',
                            id: 'boutonModifierContenu',
                            iconCls: 'pencil_big',
                            scale: 'large',
                            text: 'Modifier'
                        },
                        {
                            xtype: 'button',
                            id: 'boutonSupprimerContenu',
                            iconCls: 'remove_big',
                            scale: 'large',
                            text: 'Supprimer'
                        },
                        {
                            xtype: 'button',
                            itemId: 'boutonCreerRaccourci',
                            iconCls: 'favorite_add_big',
                            scale: 'large',
                            text: 'Ajouter aux favoris'
                        },
                        {
                            xtype: 'button',
                            id: 'ajoutPanierContenus',
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
                    id: 'TypesContenusGrid',
                    width: 150,
                    autoScroll: true,
                    resizable: true,
                    resizeHandles: 'e',
                    title: '',
                    store: 'TypesContenusDataJson',
                    viewConfig: {
                        id: 'TypesContenusGridView'
                    },
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return ('<img src="resources/icones/'+MyPrefData.iconsDir+'/16x16/folder.png"> '+value);
                            },
                            width: 672,
                            dataIndex: 'type',
                            flex: 1,
                            text: 'Type'
                        }
                    ],
                    selModel: Ext.create('Ext.selection.RowModel', {

                    })
                },
                {
                    xtype: 'gridpanel',
                    id: 'ContenusGrid',
                    title: '',
                    store: 'ContenusDataJson',
                    flex: 1,
                    viewConfig: {

                    },
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return('<img src="resources/icones/'+MyPrefData.iconsDir+'/16x16/page_full.png"> '+value);
                            },
                            dataIndex: 'text',
                            flex: 1,
                            text: 'Titre'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'etat',
                            flex: 1,
                            text: 'Etat'
                        }
                    ],
                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                    })
                }
            ]
        });

        me.callParent(arguments);
    },

    onImageRender: function(abstractcomponent, options) {
        abstractcomponent.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/page_full.png');
    }

});