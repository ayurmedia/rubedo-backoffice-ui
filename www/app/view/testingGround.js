/*
 * File: app/view/testingGround.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
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

Ext.define('Rubedo.view.testingGround', {
    extend: 'Ext.window.Window',
    alias: 'widget.testingGround',

    requires: [
        'Rubedo.view.ImagePickerField',
        'Rubedo.view.ImageMapField'
    ],

    height: 450,
    id: 'testingGround',
    width: 959,
    layout: {
        type: 'fit'
    },
    title: 'Testing ground',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    title: 'My Form',
                    items: [
                        {
                            xtype: 'ImagePickerField'
                        },
                        {
                            xtype: 'ImageMapField'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});