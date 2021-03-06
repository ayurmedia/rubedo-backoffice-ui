/*
 * File: app/view/ViewportPrimaire.js
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

Ext.define('Rubedo.view.ViewportPrimaire', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.ViewportPrimaire',

    requires: [
        'Rubedo.view.EnteteV'
    ],

    id: 'ViewportPrimaire',
    layout: {
        align: 'stretch',
        type: 'vbox'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    id: 'desktopCont',
                    layout: {
                        type: 'absolute'
                    },
                    items: [
                        {
                            xtype: 'image',
                            anchor: '105%',
                            x: 0,
                            y: 0,
                            id: 'desktopBackGround'
                        },
                        {
                            xtype: 'container',
                            x: 0,
                            y: 0,
                            id: 'boiteAIconesBureau',
                            minHeight: 600,
                            layout: {
                                type: 'absolute'
                            }
                        }
                    ]
                },
                {
                    xtype: 'entete'
                }
            ]
        });

        me.callParent(arguments);
    }

});