/*
 * File: app/controller/ContributionContenusController.js
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

Ext.define('Rubedo.controller.ContributionContenusController', {
    extend: 'Ext.app.Controller',

    models: [
        'contenusDataModel'
    ],
    stores: [
        'ContenusDataJson'
    ],
    views: [
        'AjouterContenu'
    ],

    typeSelect: function(dataviewmodel, record, options) {
        var filArianne = Ext.getCmp("TypesContenusGrid").findParentByType('window').getDockedComponent('filArianne');
        var typeFil = filArianne.getComponent('type');
        if (Ext.isDefined(typeFil)) {typeFil.setText(record.data.type);}
        else { typeFil= Ext.widget('button',{iconCls: "folder", text:record.data.type, itemId:'type'});
        filArianne.add(typeFil);
    }

    Ext.getCmp("ContenusGrid").filterBar.clearFilters();

    Ext.Array.forEach(Ext.getCmp("contributionContenus").getComponent("contextBar").query("buttongroup"), function(btn){btn.enable();});
    Ext.getCmp("ajoutPanierContenus").disable();
    Ext.getCmp("boutonSupprimerContenu").disable();
    Ext.getCmp("boutonModifierContenu").disable();
    Ext.getCmp("boutonCopierContenus").disable();
    Ext.getCmp("contribWorkflowBox").disable();
    var  customMeta = record.get("type");
    var imageMeta = Ext.getCmp('contributionContenus').getDockedComponent('barreMeta').getComponent('imageBarreMeta');
    imageMeta.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/folder.png');  
    var boiteMeta = Ext.getCmp("contributionContenus").getDockedComponent('barreMeta').getComponent('boiteBarreMeta');
    boiteMeta.update(customMeta);
    var myDependantTypes= [ ];
    Ext.Array.forEach(record.get("dependantTypes"), function(someType){
        myDependantTypes.push(Ext.getStore("DepTypesForContents").findRecord("id",someType));
    });
    Ext.getStore("DepContentsCombo").removeAll();
    Ext.getStore("DepContentsCombo").loadData(myDependantTypes);
    },

    contentSaveAndPublish: function(button, e, options) {
        this.nContenuRecorder('published',button.isUpdate);
    },

    contentSave: function(button, e, options) {
        this.nContenuRecorder('draft', button.isUpdate);
    },

    putNestedContentsOffline: function(button, e, options) {
        var myStore = Ext.getCmp("NestedContentsGrid").getStore();
        myStore.suspendAutoSync();
        Ext.Array.forEach(Ext.getCmp("NestedContentsGrid").getSelectionModel().getSelection(), function(nesC){
            nesC.set("online", false);
        });
        myStore.resumeAutoSync();
        myStore.sync();
    },

    nestedContentsSelect: function(tablepanel, selections, options) {
        if (Ext.isEmpty(selections)){
            Ext.getCmp("nestedContentsDeleteBtn").disable();
            Ext.getCmp("nestedContentsModifyBtn").disable();
            Ext.getCmp("nestedContentsOnlineBtn").disable();
            Ext.getCmp("nestedContentsOfflineBtn").disable();
        } else if (selections.length==1) {
            Ext.getCmp("nestedContentsDeleteBtn").enable();
            Ext.getCmp("nestedContentsModifyBtn").enable();
            if (selections[0].get("online")){
                Ext.getCmp("nestedContentsOnlineBtn").disable();
                Ext.getCmp("nestedContentsOfflineBtn").enable();
            } else {
                Ext.getCmp("nestedContentsOnlineBtn").enable();
                Ext.getCmp("nestedContentsOfflineBtn").disable();
            }
        } else {
            Ext.getCmp("nestedContentsModifyBtn").disable();
            Ext.getCmp("nestedContentsDeleteBtn").enable();    
            var onlines = [];
            Ext.Array.forEach(selections, function(someContent){
                Ext.Array.include(onlines, someContent.get("online"));
            });
            if (onlines.length>1) {
                Ext.getCmp("nestedContentsOnlineBtn").disable();
                Ext.getCmp("nestedContentsOfflineBtn").disable();        
            } else {
                if (onlines[0]) {
                    Ext.getCmp("nestedContentsOnlineBtn").disable();
                } else {
                    Ext.getCmp("nestedContentsOfflineBtn").disable();
                }}
            }
    },

    onWindowBeforeClose: function(panel, options) {
        if (panel.isXType("window")){
            Ext.getStore("TaxonomyForC").removeAll();
            Ext.getStore("DepContentsCombo").removeAll();
            Ext.getStore("NestedContentsStore").removeAll();
            Ext.getStore("ContenusDataJson").removeAll();
            Ext.getStore("DepTypesForContents").removeAll();
        }
    },

    contentDelete: function(button, e, options) {
        var cible = Ext.getCmp('ContenusGrid').getSelectionModel().getSelection();
        if (Ext.isDefined(cible)) {
            var fenetre = Ext.widget('delConfirmZ');
            fenetre.show();
            Ext.getCmp('delConfirmZOui').on('click', function() { 

                Ext.getCmp('delConfirmZ').close();
                this.getContenusDataJsonStore().remove(cible);

            }, this);  

        }
    },

    contentEdit: function(button, e, options) {
        var cible = Ext.getCmp('ContenusGrid').getSelectionModel().getSelection()[0];
        this.unitaryContentEdit(cible.get("id"));
        /*
        Ext.getCmp("boutonAjouterContenu").fireEvent("click");
        Ext.getCmp('boiteAChampsContenus').getForm().setValues(cible.get("champs"));
        Ext.Object.each(cible.get("champs"), function(key, value, myself){
        if (Ext.isArray(value)) {
        var multiField=Ext.getCmp('boiteAChampsContenus').query('[name='+key+']')[0];
        var y=0;
        if (multiField.multivalued) {
        Ext.Array.each(value,function(val,index){
        if (index>0) {
        multiField.up().getComponent('boutonReplicateurChamps').fireEvent("click",multiField.up().getComponent('boutonReplicateurChamps'));
        }
        Ext.getCmp('boiteAChampsContenus').query('[name='+key+']')[index].setValue(val);
        }); 
        }
        }
        });

        Ext.getCmp("boiteATaxoContenus").getForm().setValues(cible.get("taxonomie"));
        Ext.getCmp("contentMetadataBox").getForm().loadRecord(cible);
        Ext.getCmp("boutonEnregistrerNouveauContenu").isUpdate=true;
        Ext.getCmp("boutonPublierNouveauContenu").isUpdate=true;
        Ext.getCmp("boutonSoumettreNouveauContenu").isUpdate=true;
        Ext.getCmp('ajouterContenu').setTitle("Modifier un contenu");
        if (button.restricedRead){
        Ext.Array.forEach(Ext.getCmp("ajouterContenu").query("field"), function(thing){thing.setReadOnly(true);})
        Ext.getCmp("boutonSoumettreNouveauContenu").up().hide();
        var nct = Ext.getCmp("nestedContentsTab");
        if (!Ext.isEmpty(nct)){
        Ext.getCmp('nestedContensTabConfig').destroy();
        nct.destroy();        
        }
        } else {
        var myId=cible.get("id");

        var nct = Ext.getCmp("nestedContentsTab");
        if (!Ext.isEmpty(nct)){
        if (Ext.isEmpty(myId)){
        Ext.getCmp('nestedContensTabConfig').destroy();
        nct.destroy();
        } else {
        Ext.getStore('NestedContentsStore').removeAll();
        Ext.getStore('NestedContentsStore').getProxy().extraParams.parentId=myId;
        Ext.getStore('NestedContentsStore').load();
        }
        }
        }*/
    },

    contentsSelect: function(tablepanel, selections, options) {
        Ext.getCmp("boutonModifierContenu").setText('Modifier');
        Ext.getCmp("boutonModifierContenu").restricedRead=false;
        //console.log(Ext.getCmp("boutonModifierContenu").restricedRead);
        var boiteMeta = Ext.getCmp("contributionContenus").getDockedComponent('barreMeta').getComponent('boiteBarreMeta');
        var imageMeta = Ext.getCmp('contributionContenus').getDockedComponent('barreMeta').getComponent('imageBarreMeta');
        var customMeta= "";
        if (selections.length===0) {
            Ext.getCmp("ajoutPanierContenus").disable();
            Ext.getCmp("boutonSupprimerContenu").disable();
            Ext.getCmp("boutonModifierContenu").disable();
            Ext.getCmp("boutonCopierContenus").disable();
            Ext.getCmp("contribWorkflowBox").disable();
            customMeta = Ext.getCmp('TypesContenusGrid').getSelectionModel().getLastSelected().data.type;
            imageMeta.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/folder.png');    

        } else if (selections.length==1) {
            Ext.getCmp("ajoutPanierContenus").enable();
            Ext.getCmp("boutonCopierContenus").enable();
            if (ACL.interfaceRights["write.ui.contents."+selections[0].get("status")]){
                Ext.getCmp("boutonModifierContenu").enable();
                Ext.getCmp("boutonSupprimerContenu").enable();
            }else if (ACL.interfaceRights["read.ui.contents."+selections[0].get("status")]){
                Ext.getCmp("boutonModifierContenu").enable();
                Ext.getCmp("boutonModifierContenu").setText('Afficher');
                Ext.getCmp("boutonModifierContenu").restricedRead=true;
                Ext.getCmp("boutonSupprimerContenu").disable();        
            } else {
                Ext.getCmp("boutonModifierContenu").disable();
                Ext.getCmp("boutonSupprimerContenu").disable();
            }

            Ext.getCmp("contribWorkflowBox").enable();
            Ext.Array.forEach(Ext.getCmp("contribWorkflowBox").items.items, function(item){item.enable();});    
            customMeta=selections[0].get("text")+"</br> Creation : "+Ext.Date.format(selections[0].get("createTime"), "d-m-y")+
            " Dernière modification : "+Ext.Date.format(selections[0].get("lastUpdateTime"), "d-m-y")+" Auteur : "+selections[0].get("createUser").fullName;
            boiteMeta.update(customMeta);
            if (selections[0].get("online")) {
                Ext.getCmp("contentOnlineBtn").disable();
            } else {
                Ext.getCmp("contentOfflineBtn").disable();
            }
            if (selections[0].get("status")=="published") {
                imageMeta.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/page_accept.png');
                Ext.getCmp("contentAcceptPublishBtn").disable();
                Ext.getCmp("contentSubmitValBtn").disable();
                Ext.getCmp("contentRefuseBtn").disable();

            } else if (selections[0].get("status")=="pending") {
                imageMeta.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/page_process.png');
                Ext.getCmp("contentSubmitValBtn").disable();
            } else if (selections[0].get("status")=="draft") {
                imageMeta.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/page_edit.png');
                if (!Ext.getCmp("contentSubmitValBtn").isVisible()) {
                    Ext.getCmp("contentAcceptPublishBtn").disable();
                }
                Ext.getCmp("contentRefuseBtn").disable();
            } else {
                imageMeta.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/page_full.png');
            }



        } else {
            Ext.getCmp("ajoutPanierContenus").enable();
            Ext.getCmp("boutonSupprimerContenu").enable();
            Ext.getCmp("boutonModifierContenu").disable();
            Ext.getCmp("boutonCopierContenus").disable();
            Ext.getCmp("contribWorkflowBox").enable();
            var statuses = [];
            var onlines = [];
            Ext.Array.forEach(selections, function(someContent){
                Ext.Array.include(statuses, someContent.get("status"));
                Ext.Array.include(onlines, someContent.get("online"));
            });
            if (statuses.length>1){
                Ext.getCmp("contribWorkflowBox").disable();
                imageMeta.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/page_full.png');

            } else {
                Ext.Array.forEach(Ext.getCmp("contribWorkflowBox").items.items, function(item){item.enable();});
                if (onlines.length>1) {
                    Ext.getCmp("contentOnlineBtn").disable();
                    Ext.getCmp("contentOfflineBtn").disable();

                }else {
                    if (onlines[0]) {
                        Ext.getCmp("contentOnlineBtn").disable();
                    } else {
                        Ext.getCmp("contentOfflineBtn").disable();
                    }}
                    if (statuses[0]=="published") {
                        imageMeta.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/page_accept.png');
                        Ext.getCmp("contentAcceptPublishBtn").disable();
                        Ext.getCmp("contentSubmitValBtn").disable();
                        Ext.getCmp("contentRefuseBtn").disable();

                    } else if (statuses[0]=="pending") {
                        imageMeta.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/page_process.png');
                        Ext.getCmp("contentSubmitValBtn").disable();

                    } else if (statuses[0]=="draft") {
                        imageMeta.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/page_edit.png');
                        if (!Ext.getCmp("contentSubmitValBtn").isVisible()) {
                            Ext.getCmp("contentAcceptPublishBtn").disable();
                        }
                        Ext.getCmp("contentRefuseBtn").disable();
                    }
                }
                customMeta=selections.length+" Contenus";
            }

            boiteMeta.update(customMeta);
    },

    doubleClickEdit: function(tablepanel, record, item, index, e, options) {

        Ext.getCmp("boutonModifierContenu").fireEvent("click");
    },

    putContentsOnline: function(button, e, options) {
        Ext.getStore("ContenusDataJson").suspendAutoSync();
        Ext.Array.forEach(Ext.getCmp("ContenusGrid").getSelectionModel().getSelection(), function(content){

            content.set("online", true);
        });
        Ext.getStore("ContenusDataJson").resumeAutoSync();
        Ext.getStore("ContenusDataJson").sync();
    },

    contentRefuse: function(button, e, options) {
        Ext.getStore("ContenusDataJson").suspendAutoSync();
        Ext.Array.forEach(Ext.getCmp("ContenusGrid").getSelectionModel().getSelection(), function(content){
            if (content.get("status")=="pending") {
                content.set("status", "draft");
            }});
            Ext.getStore("ContenusDataJson").resumeAutoSync();
            Ext.getStore("ContenusDataJson").sync();
    },

    putContentsOffline: function(button, e, options) {
        Ext.getStore("ContenusDataJson").suspendAutoSync();
        Ext.Array.forEach(Ext.getCmp("ContenusGrid").getSelectionModel().getSelection(), function(content){

            content.set("online", false);
        });
        Ext.getStore("ContenusDataJson").resumeAutoSync();
        Ext.getStore("ContenusDataJson").sync();
    },

    contentSubmitVal: function(button, e, options) {
        Ext.getStore("ContenusDataJson").suspendAutoSync();
        Ext.Array.forEach(Ext.getCmp("ContenusGrid").getSelectionModel().getSelection(), function(content){
            if (content.get("status")=="draft") {
                content.set("status", "pending");
            }});
            Ext.getStore("ContenusDataJson").resumeAutoSync();
            Ext.getStore("ContenusDataJson").sync();
    },

    contentAcceptPublish: function(button, e, options) {
        Ext.getStore("ContenusDataJson").suspendAutoSync();
        Ext.Array.forEach(Ext.getCmp("ContenusGrid").getSelectionModel().getSelection(), function(content){

            content.set("status", "published");
        });
        Ext.getStore("ContenusDataJson").resumeAutoSync();
        Ext.getStore("ContenusDataJson").sync();
    },

    contentSaveAndSubmit: function(button, e, options) {
        this.nContenuRecorder('pending',button.isUpdate);
    },

    nestedContentsDelete: function(button, e, options) {
        Ext.getCmp("NestedContentsGrid").getStore().remove(Ext.getCmp("NestedContentsGrid").getSelectionModel().getSelection());
    },

    putNestedContentsOnline: function(button, e, options) {
        var myStore = Ext.getCmp("NestedContentsGrid").getStore();
        myStore.suspendAutoSync();
        Ext.Array.forEach(Ext.getCmp("NestedContentsGrid").getSelectionModel().getSelection(), function(nesC){
            nesC.set("online", true);
        });
        myStore.resumeAutoSync();
        myStore.sync();
    },

    addNestedContent: function(button, e, options) {
        if (Ext.getCmp("nestedContentsAddCombo").isValid()) {
            var myType=Ext.getCmp("nestedContentsAddCombo").getStore().findRecord("id",Ext.getCmp("nestedContentsAddCombo").getValue());
            var myWindow = Ext.widget('NestedContentAddWindow');
            Ext.getCmp('ViewportPrimaire').add(myWindow);
            if (Ext.isDefined(window.innerHeight)) {
                if (myWindow.height>(window.innerHeight-40)) {myWindow.setHeight((window.innerHeight-40));}
                if (myWindow.width>(window.innerWidth)) {myWindow.setWidth((window.innerWidth));}
            }
            myWindow.show();
            var formulaireTC = Ext.getCmp('nestedContentsFieldBox');
            var champsD =myType.get("champs");
            Ext.Array.forEach(champsD,function(donnees) {
                var configurateur = Ext.clone(donnees.config);
                if (donnees.cType =='treepicker'){ 
                    var monStore= Ext.getStore(donnees.store);
                    configurateur.store = monStore;
                    monStore.load();
                }
                else if (donnees.cType == 'combobox') {
                    var monStore=  Ext.create('Ext.data.Store', Ext.clone(donnees.store));
                    configurateur.store = monStore;
                }
                var nouvChamp = Ext.widget(donnees.cType, configurateur);
                nouvChamp.config=Ext.clone(donnees.config);
                if (donnees.cType =='triggerfield'){ 
                    var Ouvrir = Ext.clone(donnees.ouvrir);
                    nouvChamp.onTriggerClick= function() {
                        var fenetre = Ext.widget(Ouvrir);
                        fenetre.showAt(screen.width/2-200, 100);
                    } ; 
                    nouvChamp.ouvrir =Ext.clone(donnees.ouvrir);
                }  
                nouvChamp.anchor = '90%';
                nouvChamp.style = '{float:left;}';
                var enrobage =Ext.widget('ChampTC');
                enrobage.add(nouvChamp);
                enrobage.getComponent('helpBouton').setTooltip(nouvChamp.config.tooltip);
                if (nouvChamp.multivalued) {
                    enrobage.add(Ext.widget('button', {iconCls: 'add',valeursM: 1, margin: '0 0 0 5', tooltip: 'Valeurs multiples', itemId: 'boutonReplicateurChamps'}));

                };
                formulaireTC.add(enrobage);

            });
        }
    },

    saveNestedContent: function(button, e, options) {
        this.nestedContentRecorder(button.isUpdate);
    },

    nestedContentEdit: function(button, e, options) {
        var cible = Ext.getCmp('NestedContentsGrid').getSelectionModel().getSelection()[0];
        Ext.getCmp("nestedContentsAddCombo").setValue(cible.get("typeId"));
        Ext.getCmp("nestedContentsAddBtn").fireEvent("click");
        Ext.getCmp('nestedContentsFieldBox').getForm().setValues(cible.get("fields"));
        Ext.Object.each(cible.get("fields"), function(key, value, myself){
            if (Ext.isArray(value)) {
                var multiField=Ext.getCmp('nestedContentsFieldBox').query('[name='+key+']')[0];
                var y=0;
                if (multiField.multivalued) {
                    Ext.Array.each(value,function(val,index){
                        if (index>0) {
                            multiField.up().getComponent('boutonReplicateurChamps').fireEvent("click",multiField.up().getComponent('boutonReplicateurChamps'));
                        }
                        Ext.getCmp('nestedContentsFieldBox').query('[name='+key+']')[index].setValue(val);
                    }); 
                }
            }
        });


        Ext.getCmp("nestedContentRecordBtn").isUpdate=true;
        Ext.getCmp('ajouterContenu').setTitle("Modifier un contenu imbriqué");
    },

    NCDblClickEdit: function(tablepanel, record, item, index, e, options) {
        Ext.getCmp("nestedContentsModifyBtn").fireEvent("click");
    },

    onWindowRender: function(abstractcomponent, options) {
        if (abstractcomponent.isXType("window")){
            Ext.getStore("TaxonomyForC").load();
            Ext.getStore("DepTypesForContents").load();
        }
    },

    nContenuRecorder: function(status, update) {
        if ((Ext.getCmp("boiteAChampsContenus").getForm().isValid())&&(Ext.getCmp("boiteATaxoContenus").getForm().isValid())&&(Ext.getCmp("contentMetadataBox").getForm().isValid())){
            var champs=Ext.getCmp("boiteAChampsContenus").getForm().getValues();
            var taxonomie =Ext.getCmp("boiteATaxoContenus").getForm().getValues();
            var metaData = Ext.getCmp("contentMetadataBox").getForm().getValues();
            if (update) {
                var myRec =Ext.getStore("CurrentContent").getRange()[0];
                myRec.beginEdit();
                myRec.set("text",champs.text);
                myRec.set("champs",champs);
                myRec.set("taxonomie",taxonomie);
                myRec.set("status",status);
                myRec.set(metaData);
                myRec.endEdit();
                Ext.getStore("CurrentContent").removeAll();
                Ext.getStore('TaxonomyForC2').removeAll();
                Ext.getStore("ContentTypesForContent").removeAll();
                Ext.getStore("DepContentsCombo2").removeAll();
                Ext.getStore('NestedContentsStore').removeAll();

            } 
            else {
                var nContenu = Ext.create('Rubedo.model.contenusDataModel', {
                    text: champs.text,
                    champs: champs,
                    taxonomie:taxonomie,
                    online:true,
                    status: status,
                    typeId: Ext.getCmp('TypesContenusGridView').getSelectionModel().getLastSelected().get("id")

                });
                nContenu.set(metaData);

                Ext.getCmp('ContenusGrid').getStore().add(nContenu);
            }
            Ext.getCmp('ajouterContenu').close();
        }
    },

    nestedContentRecorder: function(update) {
        if (Ext.getCmp("nestedContentsFieldBox").getForm().isValid()){
            var fields=Ext.getCmp("nestedContentsFieldBox").getForm().getValues();
            if (update) {
                var myRec =Ext.getCmp("NestedContentsGrid").getSelectionModel().getSelection()[0];
                myRec.beginEdit();
                myRec.set("text",fields.text);
                myRec.set("fields",fields);
                myRec.endEdit();

            } 
            else {
                var nContenu = Ext.create('Rubedo.model.nestedContentModel', {
                    text: fields.text,
                    fields: fields,
                    typeId: Ext.getCmp('nestedContentsAddCombo').getValue()

                });

                Ext.getCmp("NestedContentsGrid").getStore().add(nContenu);
            }
            Ext.getCmp('NestedContentAddWindow').close();
        }
    },

    unitaryContentEdit: function(id) {
        var me=this;
        Ext.getStore('TaxonomyForC2').load();
        Ext.getStore("CurrentContent").getProxy().extraParams.id = id;
        Ext.getStore("CurrentContent").addListener("load",function(theStore,records,successful){
            if (successful){
                var theContent = records[0];
                if (ACL.interfaceRights["write.ui.contents."+theContent.get("status")]){
                    me.prepareContext(theContent, true);
                }else if (ACL.interfaceRights["read.ui.contents."+theContent.get("status")]){
                    me.prepareContext(theContent, false);
                } else {
                    Ext.Msg.alert('Erreur',"Vos droits sont insuffisants pour afficher ou modifier ce contenu");
                    theStore.removeAll();
                }

            }
        },this,{single:true});
            Ext.getStore("CurrentContent").load();
    },

    displayContentEditWindow: function(content, contentType, editMode) {
        var fenetre = Ext.widget('ajouterContenu');
        Ext.getCmp('ViewportPrimaire').add(fenetre);
        if (Ext.isDefined(window.innerHeight)) {
            if (fenetre.height>(window.innerHeight-40)) {fenetre.setHeight((window.innerHeight-40));}
            if (fenetre.width>(window.innerWidth)) {fenetre.setWidth((window.innerWidth));}
        }
        fenetre.show();
        Ext.getCmp("nestedContentsAddCombo").bindStore(Ext.getStore("DepContentsCombo2"));
        Ext.getStore("VersioningStore").removeAll();
        Ext.getStore("VersioningStore").clearFilter(true);

        Ext.getStore("VersioningStore").filter("contentId",content.get("id"));

        var formulaireTC = Ext.getCmp('boiteAChampsContenus');
        var champsD =contentType.get("champs");
        for (g=0; g<champsD.length; g++) {
            var donnees=champsD[g];
            var configurateur = Ext.clone(donnees.config);
            if (donnees.cType =='treepicker'){ 
                configurateur.store = Ext.create("Ext.data.TreeStore", {
                    isOptimised: true,
                    usedCollection: 'Pages',
                    autoLoad: false,
                    autoSync: false,
                    remoteFilter: true,
                    model: 'Rubedo.model.taxonomyTermModel',
                    proxy: {
                        type: 'ajax',
                        api: {
                            read: 'taxonomy-terms/read-child'
                        },
                        reader: {
                            type: 'json',
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
                                    console.log(ex);

                                    Ext.Logger.warn('Unable to parse the JSON returned by the server');

                                    return error;
                                }
                            },
                            messageProperty: 'message'
                        }
                    },
                    sorters: {
                        property: 'orderValue'
                    }
                });
                configurateur.store.getProxy().extraParams.filter="[{\"property\":\"vocabularyId\",\"value\":\""+"navigation"+"\"}]";
                configurateur.store.load();
            }
            else if (donnees.cType == 'combobox') {
                var monStore=  Ext.create('Ext.data.Store', Ext.clone(donnees.store));
                configurateur.store = monStore;
            }
            //begin temporary fix
            configurateur.labelSeparator=" ";
            //end temporary fix
            var nouvChamp = Ext.widget(donnees.cType, configurateur);
            nouvChamp.config=Ext.clone(donnees.config);
            //begin temporary fix
            if(nouvChamp.config.tooltip=="help text"){nouvChamp.config.tooltip="";}
            //end temporary fix
            if (donnees.cType =='triggerfield'){ 
                var Ouvrir = Ext.clone(donnees.ouvrir);
                nouvChamp.onTriggerClick= function() {
                    var fenetre = Ext.widget(Ouvrir);
                    fenetre.showAt(screen.width/2-200, 100);
                } ; 
                nouvChamp.ouvrir =Ext.clone(donnees.ouvrir);
            }  
            nouvChamp.anchor = '90%';
            nouvChamp.style = '{float:left;}';
            var enrobage =Ext.widget('ChampTC');
            enrobage.add(nouvChamp);
            enrobage.getComponent('helpBouton').setTooltip(nouvChamp.config.tooltip);
            if (Ext.isEmpty(nouvChamp.config.tooltip)){
                enrobage.getComponent('helpBouton').hidden=true;
            } 
            if (nouvChamp.multivalued) {
                enrobage.add(Ext.widget('button', {iconCls: 'add',valeursM: 1, margin: '0 0 0 5', tooltip: 'Valeurs multiples', itemId: 'boutonReplicateurChamps'}));

            };
            formulaireTC.add(enrobage);

        }
        var formTaxoTC =  Ext.getCmp('boiteATaxoContenus');
        var lesTaxo = contentType.get("vocabularies");
        var i=0;
        for (i=0; i<lesTaxo.length; i++) {
            var leVocab = Ext.getStore('TaxonomyForC2').findRecord('id', lesTaxo[i]);
            var storeT = Ext.create('Ext.data.JsonStore', {
                model:"Rubedo.model.taxonomyTermModel",
                remoteFilter:"true",
                proxy: {
                    type: 'ajax',
                    api: {
                        read: 'taxonomy-terms'
                    },
                    reader: {
                        type: 'json',
                        messageProperty: 'message',
                        root: 'data'
                    },
                    encodeFilters: function(filters) {
                        var min = [],
                        length = filters.length,
                        i = 0;

                        for (; i < length; i++) {
                            min[i] = {
                                property: filters[i].property,
                                value   : filters[i].value
                            };
                            if (filters[i].type) {
                                min[i].type = filters[i].type;
                            }
                            if (filters[i].operator) {
                                min[i].operator = filters[i].operator;
                            }
                        }
                        return this.applyEncoding(min);
                    }
                },
                filters: {
                    property: 'vocabularyId',
                    value: leVocab.get("id")
                }

            });
            storeT.on("beforeload", function(s,o){
                o.filters=Ext.Array.slice(o.filters,0,1);
                if (!Ext.isEmpty(o.params.comboQuery)){

                    var newFilter=Ext.create('Ext.util.Filter', {
                        property:"text",
                        value:o.params.comboQuery,
                        operator:'like'
                    });

                    o.filters.push(newFilter);

                }


            });


            var selecteur = Ext.widget('comboboxselect', {
                name:leVocab.get("id"),
                width:690,
                fieldLabel: leVocab.get("name"),
                autoScroll: false,
                store: storeT,
                queryMode: 'remote',
                queryParam: 'comboQuery',
                minChars:3,
                displayField: 'text',
                valueField: 'id',
                filterPickList: true,
                typeAhead: true,
                forceSelection: !leVocab.data.expandable,
                createNewOnEnter: leVocab.data.expandable,
                multiSelect: leVocab.data.multiSelect,
                allowBlank: !leVocab.data.mandatory
            });
            var enrobage =Ext.widget('ChampTC');
            enrobage.add(selecteur);
            enrobage.getComponent('helpBouton').setTooltip(leVocab.data.helpText);
            formTaxoTC.add(enrobage);

        }

        var cible = content;
        Ext.getCmp('boiteAChampsContenus').getForm().setValues(cible.get("champs"));
        Ext.Object.each(cible.get("champs"), function(key, value, myself){
            if (Ext.isArray(value)) {
                var multiField=Ext.getCmp('boiteAChampsContenus').query('[name='+key+']')[0];
                var y=0;
                if (multiField.multivalued) {
                    Ext.Array.each(value,function(val,index){
                        if (index>0) {
                            multiField.up().getComponent('boutonReplicateurChamps').fireEvent("click",multiField.up().getComponent('boutonReplicateurChamps'));
                        }
                        Ext.getCmp('boiteAChampsContenus').query('[name='+key+']')[index].setValue(val);
                    }); 
                }
            }
        });

        Ext.getCmp("boiteATaxoContenus").getForm().setValues(cible.get("taxonomie"));
        Ext.getCmp("contentMetadataBox").getForm().loadRecord(cible);
        Ext.getCmp("boutonEnregistrerNouveauContenu").isUpdate=true;
        Ext.getCmp("boutonPublierNouveauContenu").isUpdate=true;
        Ext.getCmp("boutonSoumettreNouveauContenu").isUpdate=true;
        Ext.getCmp('ajouterContenu').setTitle(content.get("text"));
        if (!editMode){
            if ((content.get("status")=="published")&&(ACL.interfaceRights["write.ui.contents.draft"])) {
                Ext.getCmp("boutonSoumettreNouveauContenu").hide();
                Ext.getCmp("boutonPublierNouveauContenu").hide();
                var nct = Ext.getCmp("nestedContentsTab");
                if (!Ext.isEmpty(nct)){
                    Ext.getCmp('nestedContensTabConfig').destroy();
                    nct.destroy(); 
                }
            }
            else
            {
                Ext.Array.forEach(Ext.getCmp("ajouterContenu").query("field"), function(thing){thing.setReadOnly(true);})
                Ext.getCmp("boutonSoumettreNouveauContenu").up().hide();
                var nct = Ext.getCmp("nestedContentsTab");
                if (!Ext.isEmpty(nct)){
                    Ext.getCmp('nestedContensTabConfig').destroy();
                    nct.destroy(); 
                }
            }
        } else {
            var myId=cible.get("id");

            var nct = Ext.getCmp("nestedContentsTab");
            if (!Ext.isEmpty(nct)){
                if (Ext.isEmpty(Ext.getCmp("nestedContentsAddCombo").getStore().getRange())){
                    Ext.getCmp('nestedContensTabConfig').destroy();
                    nct.destroy();

                } else {
                    Ext.getStore('NestedContentsStore').removeAll();
                    Ext.getStore('NestedContentsStore').getProxy().extraParams.parentId=myId;
                    Ext.getStore('NestedContentsStore').load();
                }
            }
        }
    },

    prepareContext: function(content, editMode) {
        var me=this;
        Ext.getStore("ContentTypesForContent").addListener("load",function(theStore,records,successful){
            if (successful){
                var myContentType=theStore.findRecord("id",content.get("typeId"));
                if (editMode){
                    var myDependantTypes= [ ];
                    Ext.Array.forEach(myContentType.get("dependantTypes"), function(someType){
                        myDependantTypes.push(theStore.findRecord("id",someType));
                    });
                    Ext.getStore("DepContentsCombo2").removeAll();
                    Ext.getStore("DepContentsCombo2").loadData(myDependantTypes);
                }
                me.displayContentEditWindow(content, myContentType,editMode);

            }
        },this,{single:true});
            Ext.getStore("ContentTypesForContent").load();
    },

    init: function(application) {
        this.control({
            "#TypesContenusGrid": {
                select: this.typeSelect
            },
            "#boutonPublierNouveauContenu": {
                click: this.contentSaveAndPublish
            },
            "#boutonEnregistrerNouveauContenu": {
                click: this.contentSave
            },
            "#nestedContentsOfflineBtn": {
                click: this.putNestedContentsOffline
            },
            "#NestedContentsGrid": {
                selectionchange: this.nestedContentsSelect,
                itemdblclick: this.NCDblClickEdit
            },
            "#contributionContenus": {
                beforeclose: this.onWindowBeforeClose,
                render: this.onWindowRender
            },
            "#boutonSupprimerContenu": {
                click: this.contentDelete
            },
            "#boutonModifierContenu": {
                click: this.contentEdit
            },
            "#ContenusGrid": {
                selectionchange: this.contentsSelect,
                itemdblclick: this.doubleClickEdit
            },
            "#contentOnlineBtn": {
                click: this.putContentsOnline
            },
            "#contentRefuseBtn": {
                click: this.contentRefuse
            },
            "#contentOfflineBtn": {
                click: this.putContentsOffline
            },
            "#contentSubmitValBtn": {
                click: this.contentSubmitVal
            },
            "#contentAcceptPublishBtn": {
                click: this.contentAcceptPublish
            },
            "#boutonSoumettreNouveauContenu": {
                click: this.contentSaveAndSubmit
            },
            "#nestedContentsDeleteBtn": {
                click: this.nestedContentsDelete
            },
            "#nestedContentsOnlineBtn": {
                click: this.putNestedContentsOnline
            },
            "#nestedContentsAddBtn": {
                click: this.addNestedContent
            },
            "#nestedContentRecordBtn": {
                click: this.saveNestedContent
            },
            "#nestedContentsModifyBtn": {
                click: this.nestedContentEdit
            }
        });
    }

});
