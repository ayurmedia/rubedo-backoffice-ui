/*
 * File: app/controller/TaxonomieController.js
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

Ext.define('Rubedo.controller.TaxonomieController', {
    extend: 'Ext.app.Controller',

    models: [
        'taxonomyTermModel',
        'taxonomieDataModel'
    ],
    views: [
        'TermesTaxonomieTree',
        'nouveauTaxoFenetre'
    ],

    selectVocabulary: function(selModel, record, index, options) {
        var tablepanel=Ext.getCmp("AdminfTaxonomieGrid");
        Ext.getCmp("taxonomyCenterBox").enable();
        Ext.getCmp("boutonEnregistrerTaxo").enable();
        Ext.getCmp("boutonSupprimerTaxo").enable();
        var filArianne = tablepanel.findParentByType('window').getDockedComponent('filArianne');
        var typeFil = filArianne.getComponent('type');
        if (Ext.isDefined(typeFil)) {typeFil.setText(record.get("name"));}
        else { typeFil= Ext.widget('button',{iconCls: "page_taxonomy", text:record.get("name"), itemId:'type'});
        filArianne.add(typeFil);
    }
    Ext.getCmp("ProprietesTaxonomie").getForm().loadRecord(record);
    Ext.Array.forEach(Ext.getCmp("ProprietesTaxonomie").items.items, function(thingy){
        thingy.setReadOnly(!ACL.interfaceRights["write.ui.taxonomy"]);
    });
    if (Ext.isDefined(Ext.getCmp('TermesTaxonomieTree'))){
    Ext.getCmp('TermesTaxonomieTree').destroy();}
    var store = Ext.create('Ext.data.TreeStore', {
        model: 'Rubedo.model.taxonomyTermModel',
        autoSync:true,
        proxy: {
            batchActions:false,
            type: 'ajax',
            api: {
                create: 'taxonomy-terms/create',
                read: 'taxonomy-terms/read-child',
                update: 'taxonomy-terms/update',
                destroy: 'taxonomy-terms/delete'
            },
            reader: {
                getResponseData: function(response) {
                    var data, error;

                    try {
                        data = Ext.decode(response.responseText);
                        if (Ext.isDefined(data.data)){data.children=data.data;}// error fix
                        return this.readRecords(data);
                    } catch (ex) {
                        error = new Ext.data.ResultSet({
                            total  : 0,
                            count  : 0,
                            records: [],
                            success: false,
                            message: ex.message
                        });

                        this.fireEvent('exception', this, response, error);

                        Ext.Logger.warn('Unable to parse the JSON returned by the server');

                        return error;
                    }
                },
                type: 'json',
                messageProperty: 'message'

            },
            writer: {
                type: 'json',
                encode: true,
                root: 'data'
            }
        },
        filters: {
            property: 'vocabularyId',
            value: record.get("id")
        },
        sorters: {
            property: 'orderValue'
        }
    });
    var arbre = Ext.widget('TermesTaxonomieTree', {store: store, flex:1});

    Ext.getCmp('conteneurAdminfTaxo').add(arbre);
    store.load();

    var boiteMeta = Ext.getCmp("adminFTaxonomie").getDockedComponent('barreMeta').getComponent('boiteBarreMeta');
    customMeta=record.get("name")+"</br> Creation : "+Ext.Date.format(record.get("createTime"), "d-m-y")+
    " Dernière modification : "+Ext.Date.format(record.get("lastUpdateTime"), "d-m-y")+" Auteur : "+record.get("createUser").fullName;
    boiteMeta.update(customMeta);
    },

    removeTerm: function(button, e, options) {
        var cible = Ext.getCmp('TermesTaxonomieTree').getSelectionModel().getLastSelected();
        if (Ext.isDefined(cible)) {
            Ext.getCmp('TermesTaxonomieTree').getStore().suspendAutoSync();
            var myParent=cible.parentNode;
            if ((myParent.childNodes.length==1)&&(!myParent.isRoot())){
                myParent.set("leaf",true);
            }
            cible.remove();
            Ext.getCmp('TermesTaxonomieTree').getStore().resumeAutoSync();
            Ext.getCmp('TermesTaxonomieTree').getStore().sync();
        }
        button.up().destroy();
    },

    addTerm: function(button, e, options) {
        var mainTaxo=Ext.getCmp('AdminfTaxonomieGrid').getSelectionModel().getLastSelected();
        if (mainTaxo !== null) {

            var champT = Ext.getCmp('nouveauTermeTaxoField');
            if (champT.isValid()) {
                var cibleI = Ext.getCmp('TermesTaxonomieTree').getSelectionModel().getLastSelected();
                if (cibleI !== null) {
                    Ext.getCmp('TermesTaxonomieTree').getStore().suspendAutoSync();
                    cibleI.set("leaf",false);
                    var orderValue = 100;
                    if (cibleI.hasChildNodes()){              
                        orderValue=cibleI.lastChild.get("orderValue")+100;
                    }
                    cibleI.appendChild({text: champT.getValue(), vocabularyId:mainTaxo.get("id"),leaf:true, orderValue: orderValue});
                    cibleI.expand();
                    Ext.getCmp('nouveauTermeTaxoField').setValue();
                    Ext.getCmp('TermesTaxonomieTree').getStore().resumeAutoSync();
                    Ext.getCmp('TermesTaxonomieTree').getStore().sync();
                } 



            }
        }
        button.up().destroy();
    },

    saveVocabulary: function(button, e, options) {
        if (Ext.getCmp('AdminfTaxonomieGrid').getSelectionModel().getLastSelected() !== null) {
            var cibleR=Ext.getCmp('AdminfTaxonomieGrid').getSelectionModel().getLastSelected();
            cibleR.beginEdit();
            if (Ext.getCmp("ProprietesTaxonomie").getForm().isValid()){
                cibleR.set(Ext.getCmp("ProprietesTaxonomie").getForm().getValues());
            }
            cibleR.endEdit();
        }
    },

    deleteVocabulary: function(button, e, options) {
        var cible = Ext.getCmp('AdminfTaxonomieGrid').getSelectionModel().getSelection()[0];
        if (Ext.isDefined(cible)) {
            var window = Ext.widget('delConfirmZ');
            Ext.getCmp('ViewportPrimaire').add(window);
            window.show();
            Ext.getCmp('delConfirmZOui').on('click', function() { 
                Ext.getCmp('AdminfTaxonomieGrid').getStore().remove(cible);
                Ext.getCmp("ProprietesTaxonomie").getForm().reset(true);
                Ext.getCmp("TermesTaxonomieTree").getView().hide();
                Ext.getCmp("taxonomyCenterBox").disable();
                Ext.getCmp("boutonEnregistrerTaxo").disable();
                Ext.getCmp("boutonSupprimerTaxo").disable();        
                Ext.getCmp('delConfirmZ').close();
            });  

        }
    },

    newVocabulary: function(button, e, options) {
        if (Ext.getCmp('champCreerTaxo').isValid()) {
            var nouveauVocab = Ext.create('model.taxonomieDataModel', {
                name: Ext.getCmp('champCreerTaxo').getValue(),
                extendable: false,
                multiSelect: true,
                mandatory: false
            });
            Ext.getCmp('AdminfTaxonomieGrid').getStore().add(nouveauVocab);
            Ext.getCmp('nouveauTaxoFenetre').close();
        }    
    },

    openVocabWindow: function(button, e, options) {
        var window = Ext.widget('nouveauTaxoFenetre');
        Ext.getCmp('ViewportPrimaire').add(window);
        window.show();

    },

    updateTerm: function(button, e, options) {
        if (Ext.getCmp('AdminfTaxonomieGrid').getSelectionModel().getLastSelected() !== null) {

            var champT = Ext.getCmp('nouveauTermeTaxoField');
            if (champT.isValid()) {
                var cibleI = Ext.getCmp('TermesTaxonomieTree').getSelectionModel().getLastSelected();
                if (cibleI !== null) {
                    cibleI.set("text", champT.getValue());
                    Ext.getCmp('nouveauTermeTaxoField').setValue();
                } 
            }
        }
        button.up().destroy();
    },

    termsContextMenuDisplay: function(tablepanel, record, item, index, e, options) {
        if (ACL.interfaceRights["write.ui.taxonomy"]){
            var menu= Ext.getCmp('termContextMenu');
            if (Ext.isEmpty(menu)){
                menu = Ext.widget('termContextMenu');
                menu.on('blur', function(){this.destroy();});}
                menu.showAt(Ext.EventObject.getXY());
                if (record.get("id")=="root") {
                    Ext.getCmp("boutonModifierTermesTaxo").hide();
                    Ext.getCmp("boutonSupprimerTermesTaxo").hide();
                } else {
                    Ext.getCmp("boutonModifierTermesTaxo").show();
                    Ext.getCmp("boutonSupprimerTermesTaxo").show();
                }

            }
            e.stopEvent();
    },

    recupereFils: function(cible) {
        var fils = [ ];
        if (cible.length>0) {
            var f=0;
            for (f=0; f<cible.length; f++) {
                fils.push({text: cible[f].data.text, children: this.recupereFils(cible[f].childNodes)});
            }    
        }
        return fils;
    },

    init: function(application) {
        this.control({
            "#AdminfTaxonomieGrid": {
                select: this.selectVocabulary
            },
            "#boutonSupprimerTermesTaxo": {
                click: this.removeTerm
            },
            "#boutonAjouterTermesTaxo": {
                click: this.addTerm
            },
            "#boutonEnregistrerTaxo": {
                click: this.saveVocabulary
            },
            "#boutonSupprimerTaxo": {
                click: this.deleteVocabulary
            },
            "#boutonCreerTaxo": {
                click: this.newVocabulary
            },
            "#boutonCreerTaxonomie": {
                click: this.openVocabWindow
            },
            "#boutonModifierTermesTaxo": {
                click: this.updateTerm
            },
            "#TermesTaxonomieTree": {
                itemcontextmenu: this.termsContextMenuDisplay
            }
        });
    }

});
