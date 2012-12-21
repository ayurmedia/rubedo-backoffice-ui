/*
 * File: app/controller/MediaTypesController.js
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

Ext.define('Rubedo.controller.MediaTypesController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.MediaTypesController',

    onNewMTBtnClick: function(button, e, options) {
        Ext.widget("newMTWindow").show();
    },

    onCreateNewMTBtnClick: function(button, e, options) {
        if (button.up().getForm().isValid()) {
            var newMT=Ext.create("Rubedo.model.mediaTypeModel",button.up().getForm().getValues());
            newMT.set("vocabularies", [ ]);
            newMT.set("fields", [ ]);
            Ext.getStore("MediaTypes").add(newMT);
            button.up().up().close();
        }
    },

    onMainMTGridSelect: function(selModel, record, index, options) {
        this.resetInterfaceSelect(record);
    },

    onRemoveMTBtnClick: function(button, e, options) {
        var me=this;
        var target = Ext.getCmp('mainMTGrid').getSelectionModel().getSelection()[0];
        if (Ext.isDefined(target)) {
            var delCon = Ext.widget('delConfirmZ');
            delCon.show();
            Ext.getCmp('delConfirmZOui').on('click', function() { 
                Ext.getCmp('mainMTGrid').getStore().remove(target);
                Ext.getCmp('delConfirmZ').close();
                me.resetInterfaceNoSelect();

            });  

        }
    },

    onSaveMTBtnClick: function(button, e, options) {
        this.updateMT(Ext.getCmp("mainMTGrid").getSelectionModel().getLastSelected());
    },

    onNewMTFieldBtnClick: function(button, e, options) {
        Ext.widget("MTFieldAddWindow").show();
    },

    onMTFieldInsertBtnClick: function(button, e, options) {
        var proto=Ext.clone(Ext.getCmp("MTFieldSelectGrid").getSelectionModel().getLastSelected().getData());
        proto.protoId=proto.id;
        this.renderMTField(proto, Ext.getCmp('MTeditFields'));
        button.up().up().close();
    },

    onMTFieldSelectGridItemDblClick: function(tablepanel, record, item, index, e, options) {
        this.onMTFieldInsertBtnClick(Ext.getCmp("MTFieldInsertBtn"));
    },

    resetInterfaceNoSelect: function() {
        Ext.Array.forEach(Ext.getCmp("mediaTypesInterface").getComponent("contextBar").query("buttongroup"), function(btng){btng.disable();});
        Ext.getCmp("removeMTBtn").disable();
        Ext.getCmp("mediaTypesInterface").getComponent("breadcrumb").removeAll();
        Ext.getCmp("mediaTypesInterface").getComponent("breadcrumb").add(Ext.widget("button", {text: "Types de médias", iconCls:"mediaTypes"}));
        Ext.getCmp('MTeditFields').removeAll();
        Ext.getCmp("MTcenterZone").disable();
    },

    resetInterfaceSelect: function(record) {
        var me =this;
        Ext.Array.forEach(Ext.getCmp("mediaTypesInterface").getComponent("contextBar").query("buttongroup"), function(btng){btng.enable();});
        Ext.getCmp("removeMTBtn").enable();
        Ext.getCmp("mediaTypesInterface").getComponent("breadcrumb").removeAll();
        Ext.getCmp("mediaTypesInterface").getComponent("breadcrumb").add(Ext.widget("button", {text: "Types de médias <b> > </b>", iconCls:"mediaTypes"}));
        Ext.getCmp("mediaTypesInterface").getComponent("breadcrumb").add(Ext.widget("button", {text: record.get("type"), iconCls:"mediaTypes"}));
        Ext.getCmp("MTcenterZone").enable();
        var selector= [];
        Ext.Array.forEach(record.get("vocabularies"),function(vocabId){
            selector.push(Ext.getCmp("vocabulariesMTGrid").getStore().findRecord("id", vocabId));
        });
        Ext.getCmp("vocabulariesMTGrid").getSelectionModel().select(selector);
        var targetZone=Ext.getCmp('MTeditFields');
        Ext.suspendLayouts();
        targetZone.removeAll();
        Ext.Array.forEach(record.get("fields"),function(field){
            me.renderMTField(field, targetZone);
        });
        Ext.resumeLayouts();
        Ext.getCmp("MTeditFields").doLayout();
    },

    updateMT: function(record) {
        var me=this;
        record.beginEdit();
        var newVocabularies=Ext.Array.pluck(Ext.Array.pluck(Ext.getCmp("vocabulariesMTGrid").getSelectionModel().getSelection(), "data"), "id");
        record.set("vocabularies", newVocabularies);
        record.set("fields", me.recordFields(Ext.getCmp('MTeditFields')));
        record.endEdit();
    },

    renderMTField: function(protoData, renderTarget) {
        var me=this;
        var newField= Ext.create(protoData.cType, protoData.config);
        newField.config=protoData.config;
        newField.protoId=protoData.protoId;
        newField.cType=protoData.cType;
        newField.anchor = '90%';
        newField.style = '{float:left;}';
        var casing =Ext.widget('ChampTC');
        casing.add(newField);
        casing.getComponent('helpBouton').setTooltip(newField.config.tooltip);
        if (Ext.isEmpty(newField.config.tooltip)){
            casing.getComponent('helpBouton').hidden=true;
        } 
        if (!me.nameAvailable(newField.name)) {
            var duplic = 1;
            while (!me.nameAvailable(newField.name+duplic)){
                duplic++;
            }
            newField.name=newField.name+duplic;
            newField.config.name=newField.config.name+duplic;

        }
        renderTarget.add(casing);
    },

    nameAvailable: function(name) {
        var usedNames=[];
        Ext.Array.forEach(Ext.getCmp('MTeditFields').query("field"), function(field){
            Ext.Array.include(usedNames,field.name);
        });
        if (Ext.Array.contains(usedNames,name)){
            return(false);
        } else {
            return(true);
        }
    },

    recordFields: function(target) {
        var result = [ ];
        Ext.Array.forEach(target.query("field"), function(field){
            result.push({
                cType:field.cType,
                config:field.config,
                protoId:field.protoId
            });
        });
        return(result);
    },

    init: function(application) {
        this.control({
            "#newMTBtn": {
                click: this.onNewMTBtnClick
            },
            "#createNewMTBtn": {
                click: this.onCreateNewMTBtnClick
            },
            "#mainMTGrid": {
                select: this.onMainMTGridSelect
            },
            "#removeMTBtn": {
                click: this.onRemoveMTBtnClick
            },
            "#saveMTBtn": {
                click: this.onSaveMTBtnClick
            },
            "#newMTFieldBtn": {
                click: this.onNewMTFieldBtnClick
            },
            "#MTFieldInsertBtn": {
                click: this.onMTFieldInsertBtnClick
            },
            "#MTFieldSelectGrid": {
                itemdblclick: this.onMTFieldSelectGridItemDblClick
            }
        });
    }

});
