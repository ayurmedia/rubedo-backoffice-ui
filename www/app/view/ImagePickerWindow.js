/*
 * File: app/view/ImagePickerWindow.js
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

Ext.define('Rubedo.view.ImagePickerWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.ImagePickerWindow',

    requires: [
        'Rubedo.view.MyTool17'
    ],

    localiserId: 'damPickerWindow',
    height: 406,
    id: 'ImagePickerWindow',
    width: 600,
    layout: {
        type: 'fit'
    },
    constrainHeader: true,
    title: 'Choix DAM',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            listeners: {
                render: {
                    fn: me.onImagePickerWindowRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onImagePickerWindowBeforeClose,
                    scope: me
                }
            },
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: 360,
                    displayInfo: true,
                    store: 'DAMPickerStore',
                    items: [
                        {
                            xtype: 'button',
                            localiserId: 'chooseBtn',
                            disabled: true,
                            id: 'imagePickerAcceptBtn',
                            iconCls: 'ouiSpetit',
                            text: 'Choisir',
                            listeners: {
                                click: {
                                    fn: me.onImagePickerAcceptBtnClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            localiserId: 'addBtn',
                            id: 'DAMPickerAddBtn',
                            iconCls: 'add',
                            text: 'Ajouter',
                            listeners: {
                                click: {
                                    fn: me.onDAMPickerAddBtnClick,
                                    scope: me
                                },
                                render: {
                                    fn: me.onDAMPickerAddBtnRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            handler: function(button, event) {
                                this.up().up().close();
                            },
                            localiserId: 'cancelBtn',
                            iconCls: 'close',
                            text: 'Annuler'
                        }
                    ]
                }
            ],
            tools: [
                {
                    xtype: 'mytool17'
                }
            ]
        });

        me.callParent(arguments);
    },

    onImagePickerWindowRender: function(component, eOpts) {
        Ext.getStore("DAMPickerStore").clearFilter(true);
        Ext.getStore('TaxonomyForDam2').load();
        var allowedTypes=Ext.getCmp(component.targetField).allowedDAMTypes;
        if ((!Ext.isEmpty(allowedTypes))&&(!Ext.isArray(allowedTypes))){
            allowedTypes=[allowedTypes];
        }
        this.allowedTypes=allowedTypes;
        var allowedFileType=Ext.getCmp(component.targetField).allowedFileType;
        var columnsOver= [
        {
            xtype: 'gridcolumn',
            filter: true,
            dataIndex: 'title',
            text: 'Titre'
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                return(value.fullName);
            },
            dataIndex: 'createUser',
            text: 'Auteur'
        },
        {
            xtype: 'datecolumn',
            dataIndex: 'createTime',
            text: 'Date de création',
            format: 'd-m-Y'
        }
        ];
        if (Ext.isEmpty(allowedTypes)){
            if (Ext.isEmpty(allowedFileType)){
                delete Ext.getStore("MediaTypesFORDAMPicker").getProxy().extraParams.filter;
                Ext.getStore("MediaTypesFORDAMPicker").load();
                columnsOver.push({
                    xtype:'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if (Ext.isEmpty(Ext.getStore("MediaTypesFORDAMPicker").findRecord("id",value))) {
                            return(value);
                        } else {
                            return(Ext.getStore("MediaTypesFORDAMPicker").findRecord("id",value).get("type"));
                        }
                    },
                    filter: {
                        type: 'combo',
                        valueField: 'id',
                        id:'chooseMTInPickerCombo',
                        displayField: 'type',
                        store: 'MediaTypesFORDAMPicker'
                    },
                    dataIndex: 'typeId',

                    text: 'Type'
                });
                delete Ext.getStore("DAMPickerStore").getProxy().extraParams.tFilter;
                Ext.getStore("DAMPickerStore").load();   
            } else {
                Ext.getStore("MediaTypesFORDAMPicker").getProxy().extraParams.filter="[{\"property\":\"mainFileType\",\"value\":\""+allowedFileType+"\"}]";
                Ext.getStore("MediaTypesFORDAMPicker").load();
                columnsOver.push({
                    xtype:'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if (Ext.isEmpty(Ext.getStore("MediaTypesFORDAMPicker").findRecord("id",value))) {
                            return(value);
                        } else {
                            return(Ext.getStore("MediaTypesFORDAMPicker").findRecord("id",value).get("type"));
                        }
                    },
                    filter: {
                        type: 'combo',
                        valueField: 'id',
                        displayField: 'type',
                        id:'chooseMTInPickerCombo',
                        store: 'MediaTypesFORDAMPicker'
                    },
                    dataIndex: 'typeId',

                    text: 'Type'
                });
                Ext.getStore("DAMPickerStore").getProxy().extraParams.tFilter="[{\"property\":\"mainFileType\",\"value\":\""+allowedFileType+"\"}]";
                Ext.getStore("DAMPickerStore").load();
            }
        }else if (allowedTypes.length==1){
            Ext.getStore("DAMPickerStore").getProxy().extraParams.tFilter="[{\"property\":\"typeId\",\"value\":\""+allowedTypes[0]+"\"}]";
            Ext.getStore("DAMPickerStore").load();
            Ext.getStore("MediaTypesFORDAMPicker").getProxy().extraParams.filter="[{\"property\":\"id\",\"operator\":\"$in\",\"value\":"+Ext.JSON.encode(allowedTypes)+"}]";
            Ext.getStore("MediaTypesFORDAMPicker").load();
        } else {
            Ext.getStore("MediaTypesFORDAMPicker").getProxy().extraParams.filter="[{\"property\":\"id\",\"operator\":\"$in\",\"value\":"+Ext.JSON.encode(allowedTypes)+"}]";
            Ext.getStore("MediaTypesFORDAMPicker").load();
            columnsOver.push({
                xtype:'gridcolumn',
                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                    if (Ext.isEmpty(Ext.getStore("MediaTypesFORDAMPicker").findRecord("id",value))) {
                        return(value);
                    } else {
                        return(Ext.getStore("MediaTypesFORDAMPicker").findRecord("id",value).get("type"));
                    }
                },
                filter: {
                    type: 'combo',
                    valueField: 'id',
                    displayField: 'type',
                    store: 'MediaTypesFORDAMPicker'
                },
                dataIndex: 'typeId',

                text: 'Type'
            });

            Ext.getStore("DAMPickerStore").getProxy().extraParams.tFilter="[{\"property\":\"typeId\",\"operator\":\"$in\",\"value\":"+Ext.JSON.encode(allowedTypes)+"}]";
            Ext.getStore("DAMPickerStore").load();
        }
        var DAMPicker = Ext.widget("DAMMainView", {id:"DAMPickerView", store:Ext.getStore("DAMPickerStore"),columns:columnsOver, multiSelect:false, plugins:[
            Ext.create('Ext.ux.grid.FilterBar', {renderHidden: false, showShowHideButton: true,showClearAllButton: true})

            ], features: [Ext.create('Ext.ux.grid.feature.Tileview', {
                viewMode: 'tileIcons',
                getAdditionalData: function(data, index, record, orig)
                {



                    generateThumbnail = function()
                    {
                        return "dam/get-thumbnail?id="+record.get("id");
                    };

                    if(this.viewMode)
                    {
                        return {
                            thumbnails: generateThumbnail(),
                            author:record.get("createUser").fullName,
                            date: Ext.Date.format(record.get("createTime"), 'd-m-Y'),
                            filename:record.get("title"),
                            fileSize:Ext.util.Format.fileSize(record.get("fileSize"))
                        };
                    }
                    return {};
                },
                viewTpls:
                {
                    mediumIcons: [
                    '<td class="{cls} ux-explorerview-medium-icon-row">',
                    '<table class="x-grid-row-table">',
                    '<tbody>',
                    '<tr>',
                    '<td class="x-grid-col x-grid-cell ux-explorerview-icon" style="background: transparent;">',
                    '<img src=\"{thumbnails}\" height=\"100\" width=\"100\">',			
                    '</td>',
                    '</tr>',
                    '<tr>',
                    '<td class="x-grid-col x-grid-cell">',
                    '<div class="x-grid-cell-inner" unselectable="on">{filename}</div>',
                    '</td>',
                    '</tr>',
                    '</tbody>',
                    '</table>',
                    '</td>'].join(''),

                    tileIcons: [
                    '<td class="{cls} ux-explorerview-detailed-icon-row">',
                    '<table class="x-grid-row-table">',
                    '<tbody>',
                    '<tr>',
                    '<td class="x-grid-col x-grid-cell ux-explorerview-icon" style="background: transparent;">',
                    '<img src=\"{thumbnails}\" height=\"50\" width=\"50\">',			
                    '</td>',

                    '<td class="x-grid-col x-grid-cell">',
                    '<div class="x-grid-cell-inner" unselectable="on">{filename}<br><span>{fileSize}<br>{author}<br>{date}</span></div>',
                    '</td>',
                    '</tr>',
                    '</tbody>',
                    '</table>',
                    '</td>'].join('')

                }
            }),
            {
                ftype: 'grouping',
                groupHeaderTpl: '{name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
                disabled: false
            }],
            tbar: [{},'->', {
            xtype: 'switchbuttonsegment',
            activeItem: 1,
            scope: this,
            items: [{
                tooltip: 'Details',
                viewMode: 'default',
                iconCls: 'icon-default'
            }, {
                tooltip: 'Tiles',
                viewMode: 'tileIcons',
                iconCls: 'icon-tile'
            }, {
                tooltip: 'Icons',
                viewMode: 'mediumIcons',
                iconCls: 'icon-medium'
            }],
            listeners: {
                change: function(btn, item)
                {
                    btn.up().up().up().features[0].setView(btn.viewMode);		
                },
                scope: this
            }
        }
    ]});
    DAMPicker.on("selectionchange", function(g, s){
        if (Ext.isEmpty(s)){
            Ext.getCmp("imagePickerAcceptBtn").disable();
        } else {
            Ext.getCmp("imagePickerAcceptBtn").enable();
        }
    });
    DAMPicker.on("itemdblclick", function(){
        try{
            Ext.getCmp("imagePickerAcceptBtn").fireEvent("click",Ext.getCmp("imagePickerAcceptBtn"));
        } catch(err){}
        });


        component.add(DAMPicker);
    },

    onImagePickerWindowBeforeClose: function(panel, eOpts) {
        Ext.getStore("DAMPickerStore").removeAll();
        Ext.getStore("DAMPickerStore").clearFilter(true);
        Ext.getStore("MediaTypesFORDAMPicker").removeAll();
    },

    onImagePickerAcceptBtnClick: function(button, e, eOpts) {
        var target = button.up().up().getComponent(0).getSelectionModel().getLastSelected();
        Ext.getCmp(button.up().up().targetField).setValue(target.get("id"));
        button.up().up().close();
    },

    onDAMPickerAddBtnClick: function(button, e, eOpts) {
        if ((!Ext.isEmpty(Ext.getCmp('chooseMTInPickerCombo')))&&(!Ext.isEmpty(Ext.getCmp('chooseMTInPickerCombo').getValue()))) {
            var DAMType=Ext.getStore("MediaTypesFORDAMPicker").findRecord("id", Ext.getCmp('chooseMTInPickerCombo').getValue());
            var myEditor = Ext.widget("DAMCreateUpdateWindow");
            Ext.getCmp("DAMMainFileFieldBox").up().remove(Ext.getCmp("DAMMainFileFieldBox"));
            myEditor.typeId=DAMType.get("id");
            myEditor.mainFileType=DAMType.get("mainFileType");
            myEditor.setTitle(Rubedo.RubedoAutomatedElementsLoc.newDamText+" "+DAMType.get("type"));
            myEditor.directContribute=true;
            myEditor.show();
            Rubedo.controller.DAMController.prototype.renderDAMTypeFields(DAMType, false);
            Rubedo.controller.DAMController.prototype.renderTaxoFields(DAMType,true);
            Ext.getCmp("DAMCreateUpdateWindow").doLayout();
        } else if (!Ext.isEmpty(Ext.getStore("MediaTypesFORDAMPicker").getRange())){
            Ext.widget("DAMChooseMTWindow").show();
            Ext.getCmp("DAMChooseMTWindow").getComponent(0).getComponent(0).bindStore(Ext.getStore("MediaTypesFORDAMPicker"));
            Ext.getCmp("addDamAfterTypeBtn").nonClassic=true;
            Ext.getCmp("addDamAfterTypeBtn").setHandler(function(){
                var form=Ext.getCmp("addDamAfterTypeBtn").up();
                if (form.getForm().isValid()){
                    var DAMType=Ext.getStore("MediaTypesFORDAMPicker").findRecord("id", form.getComponent(0).getValue());
                    var myEditor = Ext.widget("DAMCreateUpdateWindow");
                    Ext.getCmp("DAMMainFileFieldBox").up().remove(Ext.getCmp("DAMMainFileFieldBox"));
                    myEditor.typeId=DAMType.get("id");
                    myEditor.mainFileType=DAMType.get("mainFileType");
                    myEditor.setTitle(Rubedo.RubedoAutomatedElementsLoc.newDamText+" "+DAMType.get("type"));
                    myEditor.directContribute=true;
                    myEditor.show();
                    Ext.getCmp("addDamAfterTypeBtn").up().up().close();
                    Rubedo.controller.DAMController.prototype.renderDAMTypeFields(DAMType, false);
                    Rubedo.controller.DAMController.prototype.renderTaxoFields(DAMType,true);
                    Ext.getCmp("DAMCreateUpdateWindow").doLayout();
                }

            });




        } else {
            Ext.Msg.alert("Erreur", "Aucun type de média défini");
        }

    },

    onDAMPickerAddBtnRender: function(component, eOpts) {
        if (typeof(Rubedo.view.DAMCreateUpdateWindow)=="undefined"){
            component.hide();
        }
    }

});