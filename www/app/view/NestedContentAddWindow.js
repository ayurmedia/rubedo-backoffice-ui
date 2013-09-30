/*
 * File: app/view/NestedContentAddWindow.js
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

Ext.define('Rubedo.view.NestedContentAddWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.NestedContentAddWindow',

    height: 500,
    id: 'NestedContentAddWindow',
    width: 900,
    resizable: false,
    layout: {
        type: 'fit'
    },
    constrainHeader: true,
    iconCls: 'documentDep',
    title: 'Nouveau Contenu Imbriqué',
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
                            id: 'nestedContentRecordBtn',
                            iconCls: 'save',
                            text: 'Enregistrer'
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'form',
                    height: 101,
                    id: 'nestedContentsFieldBox',
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
                                    fieldLabel: 'Titre ',
                                    name: 'text',
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
                                    tooltip: 'Titre du contenu. Obligatoire.'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            padding: 10,
                            layout: {
                                type: 'anchor'
                            },
                            items: [
                                {
                                    xtype: 'textareafield',
                                    anchor: '90%',
                                    style: '{float:left}',
                                    fieldLabel: 'Résumé',
                                    labelSeparator: ' ',
                                    name: 'summary'
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'helpBouton',
                                    style: '{float:right;}',
                                    handleMouseEvents: false,
                                    iconCls: 'help',
                                    pressedCls: 'x-btn',
                                    text: '',
                                    tooltip: 'Résumé facultatif du contenu.'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});