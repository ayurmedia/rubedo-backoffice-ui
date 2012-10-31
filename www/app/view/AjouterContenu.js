/*
 * File: app/view/AjouterContenu.js
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

Ext.define('Rubedo.view.AjouterContenu', {
    extend: 'Ext.window.Window',
    alias: 'widget.ajouterContenu',

    floating: true,
    height: 500,
    id: 'ajouterContenu',
    width: 900,
    resizable: false,
    layout: {
        type: 'fit'
    },
    iconCls: 'content-icon',
    title: 'Nouveau Contenu',
    constrainHeader: true,
    maximizable: true,
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
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            isUpdate: false,
                            id: 'boutonEnregistrerNouveauContenu',
                            iconCls: 'save',
                            text: 'Enregistrer'
                        },
                        {
                            xtype: 'button',
                            isUpdate: false,
                            id: 'boutonPublierNouveauContenu',
                            iconCls: 'publish',
                            text: 'Enregistrer et publier'
                        },
                        {
                            xtype: 'button',
                            id: 'boutonSoumettreNouveauContenu',
                            iconCls: 'save',
                            text: 'Enregistrer et soumettre'
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'tabpanel',
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'fit'
                            },
                            title: 'Edition',
                            items: [
                                {
                                    xtype: 'form',
                                    height: 101,
                                    id: 'boiteAChampsContenus',
                                    autoScroll: true,
                                    bodyPadding: 10,
                                    title: '',
                                    items: [
                                        {
                                            xtype: 'container',
                                            padding: 10,
                                            layout: {
                                                type: 'anchor'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    anchor: '90%',
                                                    style: '{float:left}',
                                                    name: 'text',
                                                    fieldLabel: 'Titre ',
                                                    allowBlank: false
                                                },
                                                {
                                                    xtype: 'button',
                                                    itemId: 'helpBouton',
                                                    style: '{float:right;}',
                                                    handleMouseEvents: false,
                                                    iconCls: 'help',
                                                    pressedCls: 'x-btn',
                                                    text: '',
                                                    tooltip: 'Titre administratif du contenu. Obligatoire.'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'form',
                            id: 'contentMetadataBox',
                            bodyPadding: 10,
                            title: 'Métadonnées',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: 'Publication',
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            anchor: '100%',
                                            name: 'startPublicationDate',
                                            fieldLabel: 'Date de début de publication ',
                                            labelWidth: 200
                                        },
                                        {
                                            xtype: 'datefield',
                                            anchor: '100%',
                                            name: 'endPublicationDate',
                                            fieldLabel: 'Date de fin de publication ',
                                            labelWidth: 200
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'form',
                            id: 'boiteATaxoContenus',
                            bodyPadding: 10,
                            title: 'Taxonomie'
                        },
                        {
                            xtype: 'panel',
                            title: 'Droits'
                        },
                        {
                            xtype: 'panel',
                            title: 'Versions'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});