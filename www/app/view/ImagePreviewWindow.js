/*
 * File: app/view/ImagePreviewWindow.js
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

Ext.define('Rubedo.view.ImagePreviewWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.ImagePreviewWindow',

    localiserId: 'imagePreviewWindow',
    minHeight: 100,
    minWidth: 100,
    autoScroll: true,
    resizable: false,
    constrainHeader: true,
    iconCls: 'imageIco',
    title: 'Full size preview',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'image',
                    resizable: false,
                    src: '%20',
                    listeners: {
                        render: {
                            fn: me.onImageRender,
                            scope: me
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    onImageRender: function(component, eOpts) {
        component.getEl().on("load", function(){
            component.up().doLayout();
            var task2= new Ext.util.DelayedTask(function(){
                var abstractcontainer=component.up();
                var x=(window.innerWidth-abstractcontainer.getWidth())/2;
                var y=(window.innerHeight-abstractcontainer.getHeight())/2;
                abstractcontainer.showAt(x,y);
            });
            task2.delay(400);
        });
    }

});