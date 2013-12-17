/*
 * File: app/view/TermesTaxonomieTree.js
 *
 * This file was generated by Sencha Architect version 2.2.3.
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

Ext.define('Rubedo.view.TermesTaxonomieTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.TermesTaxonomieTree',

    id: 'TermesTaxonomieTree',
    title: '',
    forceFit: false,
    useArrows: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                disableSelection: false,
                plugins: [
                    Ext.create('Ext.tree.plugin.TreeViewDragDrop', {
                        pluginId: 'termsDrager',
                        ddGroup: 'TaxoDD',
                        dragText: '{0} terme{1} séléctionné{1}'
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
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if (record.isRoot()){
                            return("<i style=\"color:#777;\">"+Rubedo.RubedoAutomatedElementsLoc.rootText+"</i>");
                        }
                        else if ((record.get("readOnly"))||(!ACL.interfaceRights["write.ui.taxonomyTerms"])) {
                            record.data.allowDrop=false;
                            record.data.allowDrag=false;
                            return("<i style=\"color:#777;\">"+value+"</i>");

                        } else {

                            return(value);
                        }
                    },
                    localiserId: 'termsCol',
                    dataIndex: 'text',
                    text: 'Termes',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(record.isRoot()){return("");}
                        try{var myFlagCode=Ext.getStore("AllLanguagesStore3").query("locale",record.get("locale"),false,false,true).items[0].get("flagCode");}
                        catch(err){var myFlagCode="_unknown";}
                        var returner =" <img src=\"/assets/flags/16/"+myFlagCode+".png\"> ";
                        if(!Ext.isEmpty(value)){
                            Ext.Object.each(value, function(key, value, myself) {
                                if (key!=record.get("locale")){
                                    try{var myFlagCode2=Ext.getStore("AllLanguagesStore3").query("locale",key,false,false,true).items[0].get("flagCode");}
                                    catch(err){var myFlagCode2="_unknown";}
                                    if (myFlagCode2!="_unknown"){
                                        returner=returner+" <img src=\"/assets/flags/16/"+myFlagCode2+".png\"> ";
                                    }
                                }
                            });
                        }
                        return(returner);
                    },
                    localiserId: 'languageCoumn',
                    dataIndex: 'i18n',
                    text: 'Languages',
                    flex: 0.5,
                    listeners: {
                        afterrender: {
                            fn: me.onGridcolumnAfterRender,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var lang=Ext.getCmp("specialLangTermColumn").usedLanguage;
                        if (record.isRoot()) {return(null);}
                        else if (!Ext.isEmpty(record.get("i18n")[lang])){
                            return(record.get("i18n")[lang].text);
                        } else {return("");}
                    },
                    usedLanguage: 'en',
                    id: 'specialLangTermColumn',
                    dataIndex: 'decoyField',
                    text: '<img class="header-icon" style="vertical-align:middle;margin-bottom:4px;" src="resources/icones/red/16x16/pencil.png"/> English',
                    flex: 1,
                    editor: {
                        xtype: 'textfield'
                    }
                }
            ],
            listeners: {
                itemclick: {
                    fn: me.onTermesTaxonomieTreeItemClick,
                    scope: me
                }
            },
            plugins: [
                Ext.create('Ext.grid.plugin.BufferedRenderer', {

                })
            ]
        });

        me.callParent(arguments);
    },

    onTreedragdroppluginBeforeDrop: function(node, data, overModel, dropPosition, dropHandlers, eOpts) {
        if (!ACL.interfaceRights["write.ui.taxonomyTerms"]){
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
            if ((movedOne.parentNode.childNodes.length==1)&&(movedOne.parentNode!=overModel)){
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

    onTreedragdroppluginDrop: function(node, data, overModel, dropPosition, eOpts) {
        var task= new Ext.util.DelayedTask(function(){
            Ext.getCmp("TermesTaxonomieTree").getStore().resumeAutoSync();
            Ext.getCmp("TermesTaxonomieTree").getStore().sync();
        });
        task.delay(200);
    },

    onGridcolumnAfterRender: function(component, eOpts) {
        if (Ext.getStore("AllLanguagesStore3").getRange().length==1){
            component.hide();
        }
    },

    onTermesTaxonomieTreeItemClick: function(dataview, record, item, index, e, eOpts) {
        var lang=Ext.getCmp("specialLangTermColumn").usedLanguage;
        if (Ext.isEmpty(record.get("i18n")[lang])){
            record.set("decoyField","");
        } else {
            record.set("decoyField",record.get("i18n")[lang].text);
        }
    }

});