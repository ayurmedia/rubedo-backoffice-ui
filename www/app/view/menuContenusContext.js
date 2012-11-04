/*
 * File: app/view/menuContenusContext.js
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

Ext.define('Rubedo.view.menuContenusContext', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.menuContenusContext',

    requires: [
        'Rubedo.view.override.menuContenusContext'
    ],

    id: 'ContenusGrid',
    title: '',
    store: 'ContenusDataJson',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {

            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if (record.get("status")=="published") {
                            return('<img src="resources/icones/'+MyPrefData.iconsDir+'/16x16/page_accept.png"> '+value);
                        } else if (record.get("status")=="pending") {
                            return('<img src="resources/icones/'+MyPrefData.iconsDir+'/16x16/page_process.png"> '+value);
                        } else if (record.get("status")=="draft") {
                            return('<img src="resources/icones/'+MyPrefData.iconsDir+'/16x16/page_edit.png"> '+value);
                        }



                    },
                    filter: true,
                    dataIndex: 'text',
                    flex: 1,
                    text: 'Titre'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if (value=="published") {
                            return("publié");
                        } else if (value=="pending") {
                            return("en attente de validation");
                        } else if (value=="draft") {
                            return("brouillon");
                        }
                    },
                    filter: {
                        type: 'combo',
                        store: [
                            [
                                'draft',
                                'brouillon'
                            ],
                            [
                                'pending',
                                'en attente de validation'
                            ],
                            [
                                'published',
                                'publié'
                            ]
                        ]
                    },
                    dataIndex: 'status',
                    flex: 1,
                    text: 'Etat'
                },
                {
                    xtype: 'booleancolumn',
                    filter: {
                        type: 'combo',
                        store: [
                            [
                                true,
                                'Oui'
                            ],
                            [
                                false,
                                'Non'
                            ]
                        ]
                    },
                    width: 60,
                    dataIndex: 'online',
                    text: 'En ligne',
                    falseText: 'Non',
                    trueText: 'Oui'
                }
            ],
            selModel: Ext.create('Ext.selection.CheckboxModel', {

            })
        });

        me.callParent(arguments);
    }

});