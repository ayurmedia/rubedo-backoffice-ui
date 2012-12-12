/*
 * File: app/view/contributionPrevisualisation.js
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

Ext.define('Rubedo.view.contributionPrevisualisation', {
    extend: 'Ext.window.Window',
    alias: 'widget.contributionPrevisualisation',

    requires: [
        'Rubedo.view.MyTool16',
        'Rubedo.view.MyTool17'
    ],

    ACL: 'read.ui.pages',
    height: 548,
    id: 'contributionPrevisualisation',
    width: 1200,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },
    iconCls: 'personalize',
    title: 'Prévisualisation',
    constrainHeader: true,
    maximized: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            tools: [
                {
                    xtype: 'mytool16'
                },
                {
                    xtype: 'mytool17'
                }
            ],
            items: [
                {
                    xtype: 'treepanel',
                    id: 'previewPageTree',
                    width: 225,
                    collapseDirection: 'left',
                    collapsible: true,
                    title: 'Sélecteur de pages',
                    store: 'PagesPreviewStore',
                    useArrows: true,
                    viewConfig: {

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
                                    id: 'previewSitesCombo',
                                    fieldLabel: 'Site ',
                                    labelWidth: 40,
                                    editable: false,
                                    forceSelection: true,
                                    queryMode: 'local',
                                    store: 'SitesComboPreview',
                                    valueField: 'id'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    id: 'contribPreviewMain',
                    layout: {
                        type: 'fit'
                    }
                }
            ]
        });

        me.callParent(arguments);
    }

});