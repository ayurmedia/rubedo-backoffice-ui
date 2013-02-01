/*
 * File: app/view/TermesTaxonomieTree.js
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

Ext.define('Rubedo.view.TermesTaxonomieTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.TermesTaxonomieTree',

    id: 'TermesTaxonomieTree',
    title: '',
    forceFit: true,
    useArrows: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                disableSelection: false,
                plugins: [
                    Ext.create('Ext.tree.plugin.TreeViewDragDrop', {
                        ptype: 'treeviewdragdrop',
                        pluginId: 'termsDrager'
                    })
                ],
                listeners: {
                    beforedrop: {
                        fn: me.onTreedragdroppluginBeforeDrop,
                        scope: me
                    },
                    drop: {
                        fn: me.onTreedragdroppluginDrop,
                        scope: me
                    }
                }
            },
            columns: [
                {
                    xtype: 'treecolumn',
                    dataIndex: 'text',
                    text: 'Termes',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    onTreedragdroppluginBeforeDrop: function(node, data, overModel, dropPosition, dropFunction, options) {
        if (!ACL.interfaceRights["write.ui.taxonomy"]){
            return(false);
        }
        Ext.getCmp("TermesTaxonomieTree").getStore().suspendAutoSync();
        var movedOne=data.records[0];
        var interm=0;
        var targeted=overModel.get("orderValue");

        if (dropPosition=="before"){
            if ((movedOne.parentNode!=overModel.parentNode)&&(movedOne.parentNode.childNodes.length==1)){
                movedOne.parentNode.set("expandable", false);
            }
            if (!Ext.isEmpty(overModel.previousSibling)){interm=overModel.previousSibling.get("orderValue");}
            movedOne.set("orderValue", (interm+targeted)/2);
        } else if (dropPosition=="after"){
            if ((movedOne.parentNode!=overModel.parentNode)&&(movedOne.parentNode.childNodes.length==1)){
                movedOne.parentNode.set("expandable", false);
            }
            if (!Ext.isEmpty(overModel.nextSibling)){interm=overModel.nextSibling.get("orderValue");}
            else{interm=10000;}
            movedOne.set("orderValue", (interm+targeted)/2);
        } else if (dropPosition=="append"){
            if (movedOne.parentNode.childNodes.length==1){
                movedOne.parentNode.set("expandable", false);
            }

            if (overModel.hasChildNodes()){
                movedOne.set("orderValue", overModel.lastChild.get("orderValue")+100);
            } else {
                movedOne.set("orderValue", 100);
                overModel.set("expandable", true);
            }
        }
    },

    onTreedragdroppluginDrop: function(node, data, overModel, dropPosition, options) {
        var task= new Ext.util.DelayedTask(function(){
            Ext.getCmp("TermesTaxonomieTree").getStore().resumeAutoSync();
            Ext.getCmp("TermesTaxonomieTree").getStore().sync();
        });
        task.delay(50);
    }

});