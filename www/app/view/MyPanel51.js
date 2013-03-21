/*
 * File: app/view/MyPanel51.js
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

Ext.define('Rubedo.view.MyPanel51', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mypanel51',

    requires: [
        'Rubedo.view.override.MyPanel51'
    ],

    height: 200,
    autoScroll: true,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    bodyPadding: 10,
    title: 'My Panel',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    frame: true,
                    minHeight: 100,
                    width: 100,
                    title: 'My Panel',
                    items: [
                        {
                            xtype: 'textareafield',
                            fieldLabel: 'Label'
                        },
                        {
                            xtype: 'textareafield',
                            fieldLabel: 'Label'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    frame: true,
                    height: 60,
                    width: 100,
                    title: 'My Panel2'
                },
                {
                    xtype: 'panel',
                    frame: true,
                    height: 60,
                    width: 100,
                    title: 'My Panel3'
                }
            ]
        });

        me.callParent(arguments);
    }

});