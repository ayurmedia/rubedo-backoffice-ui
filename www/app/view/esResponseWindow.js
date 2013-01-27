/*
 * File: app/view/esResponseWindow.js
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

Ext.define('Rubedo.view.esResponseWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.esResponseWindow',

    height: 250,
    id: 'esResponseWindow',
    width: 400,
    layout: {
        type: 'fit'
    },
    title: 'Contenus et médias indexés',
    constrainHeader: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'propertygrid',
                    overflowY: 'auto',
                    title: '',
                    disableSelection: true,
                    forceFit: true,
                    hideHeaders: true,
                    nameColumnWidth: 250,
                    source: {
                        'Property 1': 'String',
                        'Property 2': true,
                        'Property 3': '2012-11-14T13:46:09',
                        'Property 4': 123
                    },
                    listeners: {
                        beforeedit: {
                            fn: me.onPropertygridBeforeEdit,
                            scope: me
                        }
                    }
                }
            ],
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
                            handler: function(button, event) {
                                button.up().up().close();
                            },
                            text: '<b>OK</b>'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onPropertygridBeforeEdit: function(editor, e, options) {
        return(false);
    }

});