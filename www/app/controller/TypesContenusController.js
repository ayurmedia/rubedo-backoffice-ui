/*
 * File: app/controller/TypesContenusController.js
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

Ext.define('Rubedo.controller.TypesContenusController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.TypesContenusController',

    models: [
        'typesContenusDataModel'
    ],
    stores: [
        'TypesContenusDataJson'
    ],
    views: [
        'nouveauTypeContenu',
        'ajoutChampTCFenetre',
        'ChampTC',
        'optionsLCGrid',
        'ongletTCDep'
    ],

    ajouterContenu: function(button, e, options) {
        if (Ext.isDefined(Ext.getCmp('TypesContenusGrid').getSelectionModel().getSelection()[0])) {
            var fenetre = Ext.widget('ajouterContenu');
            Ext.getCmp('ViewportPrimaire').add(fenetre);
            if (Ext.isDefined(window.innerHeight)) {
                if (fenetre.height>(window.innerHeight-40)) {fenetre.setHeight((window.innerHeight-40));}
                if (fenetre.width>(window.innerWidth)) {fenetre.setWidth((window.innerWidth));}
            }
            fenetre.show();
            var formulaireTC = Ext.getCmp('boiteAChampsContenus');
            Ext.getCmp("contentsVersionPanel").up().remove( Ext.getCmp("contentsVersionPanel"));
            var champsD =Ext.getCmp('TypesContenusGrid').getSelectionModel().getSelection()[0].data.champs;
            for (g=0; g<champsD.length; g++) {
                var donnees=champsD[g];
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
                    var Ouvrir = Ext.clone(donnees.openWindow);
                    nouvChamp.onTriggerClick= function() {
                        var fenetre = Ext.widget(Ouvrir);
                        fenetre.showAt(screen.width/2-200, 100);
                    } ; 
                    nouvChamp.openWindow =Ext.clone(donnees.openWindow);
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
            var lesTaxo = Ext.getCmp('TypesContenusGrid').getSelectionModel().getSelection()[0].get("vocabularies");
            var i=0;
            for (i=0; i<lesTaxo.length; i++) {
                var leVocab = Ext.getStore('TaxonomyForC').findRecord('id', lesTaxo[i]);
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

            var nct = Ext.getCmp("nestedContentsTab");
            if (!Ext.isEmpty(nct)){
                Ext.getCmp('nestedContensTabConfig').destroy();
                nct.destroy();

            }



        }
    },

    ouvrirFenetreTC: function(button, e, options) {
        var fenetreTC = Ext.widget('ajoutChampTCFenetre');
        fenetreTC.showAt(screen.width/2-250, 100);
    },

    creerChampTC: function(button, e, options) {
        var me=this;
        var donnees = Ext.getCmp('ChampTCSelectGrid').getSelectionModel().getLastSelected().data;
        var configurateur = Ext.clone(donnees.config);
        if (donnees.cType =='Ext.ux.TreePicker'){ 
            var monStore= Ext.getStore(donnees.store);
            configurateur.store = monStore;
            monStore.load();
        }
        else if (donnees.cType == 'Ext.form.field.ComboBox') {
            var monStore=  Ext.create('Ext.data.Store', Ext.clone(donnees.store));
            configurateur.store = monStore;
        }
        var nouvChamp = Ext.create(donnees.cType, configurateur);
        nouvChamp.protoId=donnees.id;
        nouvChamp.config=Ext.clone(donnees.config);
        nouvChamp.configFields=Ext.clone(donnees.configFields);
        if (donnees.cType =='Ext.form.field.Trigger'){
            var Ouvrir = Ext.clone(donnees.openWindow);
            nouvChamp.onTriggerClick= function() {
                var fenetre = Ext.widget(Ouvrir);
                fenetre.showAt(screen.width/2-200, 100);
            } ;  
            nouvChamp.openWindow =Ext.clone(donnees.openWindow);
        }
        nouvChamp.anchor = '90%';
        nouvChamp.style = '{float:left;}';
        var enrobage =Ext.widget('ChampTC');
        enrobage.add(nouvChamp);
        enrobage.getComponent('helpBouton').setTooltip(nouvChamp.config.tooltip);
        if (Ext.isEmpty(nouvChamp.config.tooltip)){
            enrobage.getComponent('helpBouton').hidden=true;
        } 
        if (!me.nameAvailable(nouvChamp.name)) {
            var duplic = 1;
            while (!me.nameAvailable(nouvChamp.name+duplic)){
                duplic++;
            }
            nouvChamp.name=nouvChamp.name+duplic;
            nouvChamp.config.name=nouvChamp.config.name+duplic;

        }

        Ext.getCmp('champsEditionTC').add(enrobage);
        nouvChamp.getEl().dom.click();
        button.up().up().close();

    },

    selectChampTC: function(abstractcomponent, options) {
        var me=this;
        var TCfield=abstractcomponent.getComponent(1);
        TCfield.getEl().on('click', function() {
            Ext.getCmp("TCfieldUp").enable();
            Ext.getCmp("TCfieldDown").enable();
            Ext.getCmp("TCfieldDeleter").enable();
            if (Ext.getCmp('champTCIdField').getValue() != TCfield.id) {
                if (Ext.isDefined(Ext.getCmp(Ext.getCmp('champTCIdField').getValue()))){    
                    Ext.getCmp(Ext.getCmp('champTCIdField').getValue()).getEl().applyStyles('color:#000000');
                    var companion =Ext.getCmp(Ext.getCmp('champTCIdField').getValue()).up().getComponent("imageFieldComponent");
                    if (Ext.isDefined(companion)) {
                        companion.getEl().applyStyles('color:#000000');
                    }
                }
                Ext.getCmp('champTCIdField').setValue(TCfield.id);
                if (TCfield.isXType("ImagePickerField")) {
                    TCfield.up().getComponent("imageFieldComponent").getEl().frame(MyPrefData.themeColor);
                    TCfield.up().getComponent("imageFieldComponent").getEl().applyStyles('color:'+MyPrefData.themeColor);
                } else {
                    this.frame(MyPrefData.themeColor);
                    this.applyStyles('color:'+MyPrefData.themeColor);
                }
                var mesChamps = TCfield.configFields;
                var boiteParam = Ext.getCmp('boiteConfigChampsTC');
                boiteParam.removeAll();
                for(t=0; t<mesChamps.length; t++) {
                    if (mesChamps[t].type =='Ext.form.field.ComboBox') {
                        var monStore=  Ext.create('Ext.data.Store', mesChamps[t].store);
                        mesChamps[t].config.store= monStore;
                    }
                    var nouvChamp= Ext.create(mesChamps[t].type, mesChamps[t].config);
                    nouvChamp.labelSeparator= ' ';
                    nouvChamp.anchor='100%';
                    if (nouvChamp.name=="name"){
                        nouvChamp.validator=me.nameValidator;
                    }
                    nouvChamp.setValue(TCfield.config[nouvChamp.name]);
                    nouvChamp.setReadOnly(!ACL.interfaceRights["write.ui.contentTypes"]);
                    nouvChamp.on('change', function (thing) {
                        if (thing.isValid()){
                            TCfield.config[this.name]= this.getValue();
                            if (this.name=='fieldLabel') {
                                if (TCfield.isXType("ImagePickerField")) {
                                    TCfield.up().getComponent("imageFieldComponent").getComponent(0).setText(this.getValue()+" ");
                                } else {
                                    TCfield.setFieldLabel(this.getValue());
                                }
                            }
                            else if (this.name=='value') {
                                TCfield.setValue(this.getValue());
                            }
                            else if (this.name=='editable') {
                                TCfield.setEditable(this.getValue());
                                TCfield.reset();
                            }
                            else if (this.name=='multiSelect') {
                                TCfield.multiSelect = this.getValue();
                                TCfield.reset();
                            }
                            else if (this.name=='tooltip') {
                                abstractcomponent.getComponent('helpBouton').setTooltip(this.getValue());
                                if (Ext.isEmpty(this.getValue())){
                                    abstractcomponent.getComponent('helpBouton').hide();
                                } else {
                                    abstractcomponent.getComponent('helpBouton').show();
                                }
                            }
                            else if (this.name=='regex') {
                                TCfield.regex = new RegExp(this.getValue());
                            }
                            else {
                                TCfield[this.name]= this.getValue();
                            }
                            TCfield.validate();
                        }});
                        boiteParam.add(nouvChamp); 

                    }
                    if ((TCfield.isXType('combobox'))&&(!(TCfield.isXType('timefield')))) {
                        var optionsLC = Ext.widget('optionsLCGrid', {store : TCfield.getStore()});
                        boiteParam.add(optionsLC); 

                    }
                }
            });
    },

    enleveChampTC: function(abstractcomponent, options) {
        if (Ext.getCmp('champTCIdField').getValue() == abstractcomponent.getComponent(1).id) {
            Ext.getCmp('boiteConfigChampsTC').removeAll();
            Ext.getCmp("TCfieldUp").disable();
            Ext.getCmp("TCfieldDown").disable();
            Ext.getCmp("TCfieldDeleter").disable();
        }
    },

    updateOptionsListeTC: function(tablepanel, record, item, index, e, options) {
        Ext.getCmp('PaneauTCDetail').update(record.data);
    },

    selectTC: function(dataviewmodel, record, options) {
        Ext.Array.forEach(Ext.getCmp("adminFTDC").getComponent("contextBar").query("buttongroup"), function(btn){btn.enable();});
        Ext.getCmp("boutonSupprimerTypeContenu").enable();
        Ext.getCmp("TCfieldUp").disable();
        Ext.getCmp("TCfieldDown").disable();
        Ext.getCmp("TCfieldDeleter").disable();
        var filArianne = Ext.getCmp("adminFTDC").getDockedComponent('filArianne');
        var monIco = 'content-icon';
        var monImg = 'resources/icones/48x48/page_full.png';
        if (record.data.dependant===true){monIco='documentDep'; monImg = 'resources/icones/48x48/attach_document.png';}
        var typeFil = filArianne.getComponent('type');
        if (Ext.isDefined(typeFil)) {typeFil.setText(record.data.type).setIconCls(monIco); }
        else { typeFil= Ext.widget('button',{iconCls: monIco, text:record.data.type, itemId:'type'});
        filArianne.add(typeFil);
    }

    if (record.data.dependant===false) {
        if (!(Ext.isDefined(Ext.getCmp('ongletTCDep')))) {
            Ext.getCmp('tabPanTC').add(Ext.widget('ongletTCDep'));    
        }
    }
    else {
        if (Ext.isDefined(Ext.getCmp('ongletTCDep'))) {
            Ext.getCmp('ongletTCDep').destroy();  
        }
    }
    Ext.getCmp('tabPanTC').enable();
    Ext.getCmp('tabPanTC').setActiveTab(2);
    Ext.getCmp('tabPanTC').setActiveTab(5);
    Ext.getCmp('tabPanTC').setActiveTab(0);
    Ext.getCmp('boiteConfigChampsTC').removeAll();
    var formulaireTC = Ext.getCmp('champsEditionTC');
    formulaireTC.removeAll();
    var champsD =record.data.champs;
    for (g=0; g<champsD.length; g++) {
        var donnees=champsD[g];
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
        nouvChamp.configFields=Ext.getStore("TypesChampsDataStore").findRecord("id",donnees.protoId).get("configFields");
        if (donnees.cType =='triggerfield'){ 
            var Ouvrir = Ext.clone(donnees.openWindow);
            nouvChamp.onTriggerClick= function() {
                var fenetre = Ext.widget(Ouvrir);
                fenetre.showAt(screen.width/2-200, 100);
            } ; 
            nouvChamp.openWindow =Ext.clone(donnees.openWindow);
        }    
        nouvChamp.anchor = '90%';
        nouvChamp.protoId=donnees.protoId;


        nouvChamp.style = '{float:left;}';
        var enrobage =Ext.widget('ChampTC');
        enrobage.add(nouvChamp);
        enrobage.getComponent('helpBouton').setTooltip(nouvChamp.config.tooltip);
        if (Ext.isEmpty(nouvChamp.config.tooltip)){
            enrobage.getComponent('helpBouton').hidden=true;
        }    
        formulaireTC.add(enrobage);

    }
    var tableauTaxoTC = Ext.getCmp('vocabulairesTypesContenusGrid');
    tableauTaxoTC.getSelectionModel().deselectAll();
    var maTaxo= record.get("vocabularies");
    var selectionR = [ ];
    Ext.Array.forEach(maTaxo, function(someTaxoId){
        selectionR.push(tableauTaxoTC.getStore().findRecord("id", someTaxoId));
    });
    tableauTaxoTC.getSelectionModel().select(selectionR);


    if (record.get("dependant")===false) {
        var tableauTCI = Ext.getCmp('TCImbriquesGrid');
        tableauTCI.getSelectionModel().deselectAll();
        var depTypes = record.get("dependantTypes");
        var selector=[];
        Ext.Array.forEach(depTypes, function(someTypeId){
            selector.push(tableauTCI.getStore().findRecord("id", someTypeId));
        });
        tableauTCI.getSelectionModel().select(selector);
    }
    Ext.getCmp('champsEditionTC').doLayout();
    },

    supprimeTypeContenu: function(button, e, options) {
        var cible = Ext.getCmp('AdminfTypesGridView').getSelectionModel().getSelection()[0];
        if (Ext.isDefined(cible)) {
            var fenetre = Ext.widget('delConfirmZ');
            fenetre.showAt(screen.width/2-100, 100);
            Ext.getCmp('delConfirmZOui').on('click', function() { 
                Ext.getCmp('AdminfTypesGridView').getStore().remove(cible);
                Ext.getCmp('delConfirmZ').close();
                Ext.Array.forEach(Ext.getCmp("adminFTDC").getComponent("contextBar").query("buttongroup"), function(btn){btn.disable();});
                Ext.getCmp("boutonSupprimerTypeContenu").disable();
                Ext.getCmp('champsEditionTC').removeAll();
                Ext.getCmp('boiteConfigChampsTC').removeAll();
                Ext.getCmp('tabPanTC').disable();

            });  

        }
    },

    enregistrerTypeContenus: function(button, e, options) {
        if (Ext.getCmp('AdminfTypesGridView').getSelectionModel().getLastSelected() !== null){
            var fieldsR = Ext.getCmp('champsEditionTC').items.items;
            var champsR = [ ];
            for (u=0; u<fieldsR.length; u++) { 
                var leChampR= fieldsR[u].getComponent(1);
                var nch ={
                    cType: leChampR.xtype,
                    config: leChampR.config,
                    protoId:leChampR.protoId,
                    openWindow:leChampR.openWindow
                };
                if (leChampR.xtype== 'treepicker') {
                    nch.store=leChampR.getStore().storeId;
                }
                else if (leChampR.xtype== 'combobox') {
                    var dones = leChampR.getStore().data.items;
                    var donesR = [ ];
                    for (i=0; i<dones.length; i++) {
                        donesR.push({valeur: dones[i].data.valeur, nom: dones[i].data.nom });
                    }
                    nch.store = {
                        fields: ['valeur', 'nom'],
                        data: donesR
                    };
                }
                champsR.push(nch);
            }
            var target = Ext.getCmp('AdminfTypesGridView').getSelectionModel().getLastSelected();
            target.beginEdit();
            target.set("champs", champsR);
            var newVocabularies = Ext.getCmp('vocabulairesTypesContenusGrid').getSelectionModel().getSelection();
            target.set("vocabularies", Ext.Array.pluck(Ext.Array.pluck(newVocabularies, "data"), "id"));
            if (target.get("dependant") ===false) {
                var newDepTypes = Ext.getCmp('TCImbriquesGrid').getSelectionModel().getSelection();        
                target.set("dependantTypes", Ext.Array.pluck(Ext.Array.pluck(newDepTypes, "data"), "id"));

            }
            target.endEdit();
        }
    },

    fenetreNTC: function(button, e, options) {
        var fenetre = Ext.widget('nouveauTypeContenu');
        Ext.getCmp("ViewportPrimaire").add(fenetre);
        fenetre.show();
    },

    creerNTC: function(button, e, options) {
        if (Ext.getCmp('champCreerTC').isValid()) {

            var nType = Ext.getCmp('champCreerTC').getValue();
            var nouvType = Ext.create('model.typesContenusDataModel', {
                type: nType,
                dependant: Ext.getCmp('champTCIsDep').getValue(),
                fields: [ ],
                vocabularies:[ ],
                dependantTypes:[ ]


            });
            this.getTypesContenusDataJsonStore().add(nouvType);

            Ext.getCmp('nouveauTypeContenuFenetre').close();
            Ext.getCmp('AdminfTypesGridView').getSelectionModel().select(nouvType);
            this.selectTC(Ext.getCmp('AdminfTypesGridView'), nouvType);

        }
    },

    repliqueChamp: function(button, e, options) {
        var nouvChamp=button.up().getComponent(1).cloneConfig();
        nouvChamp.anchor = '90%';
        nouvChamp.style = '{float:left;}';
        var enrobage =Ext.widget('ChampTC');
        enrobage.add(nouvChamp);
        enrobage.getComponent('helpBouton').setTooltip("Réplique du champ "+button.up().getComponent(1).fieldLabel);
        var supprimeur = Ext.widget('button', {iconCls: 'close', margin: '0 0 0 5', tooltip: 'Enlever', itemId: 'boutonEffaceurChamps'});
        supprimeur.on('click', function(){
            button.valeursM--;
            button.up().up().remove(supprimeur.up());
        });
        enrobage.add(supprimeur);
        button.up().up().insert(button.up().up().items.indexOf(button.up())+button.valeursM, enrobage);
        button.valeursM++;
    },

    TCfieldDelete: function(button, e, options) {
        var field = Ext.getCmp(Ext.getCmp('champTCIdField').getValue());
        if (!Ext.isEmpty(field)) {
            field.up().destroy();
        }
    },

    TCfieldMoveUp: function(button, e, options) {
        var field = Ext.getCmp(Ext.getCmp('champTCIdField').getValue());
        if (!Ext.isEmpty(field)) {
            var pos = field.up().up().items.indexOf(field.up());
            if (pos > 0) {
                field.up().up().move(pos,pos-1);
            }
        }
    },

    TCfieldMoveDown: function(button, e, options) {
        var field = Ext.getCmp(Ext.getCmp('champTCIdField').getValue());
        if (!Ext.isEmpty(field)) {
            var pos = field.up().up().items.indexOf(field.up());
            field.up().up().move(pos,pos+1);
        }
    },

    createThroughDblClick: function(tablepanel, record, item, index, e, options) {
        this.creerChampTC(Ext.getCmp("boutonAjouterChampTC"));
    },

    copyTC: function(button, e, options) {
        var rec = Ext.clone(Ext.getCmp("AdminfTypesGrid").getSelectionModel().getLastSelected().data);
        delete(rec.id);
        rec.type=rec.type+"-Copie";
        Ext.getCmp("AdminfTypesGrid").getStore().add(rec);
        Ext.getStore("TypesContenusNDepDataJson").load();
    },

    onGridpanelEdit: function(editor, e, options) {
        Ext.getStore("TypesContenusNDepDataJson").load();
    },

    onAdminfTypesGridRender: function(abstractcomponent, options) {
        Ext.getStore("TypesContenusDepDataJson").load();
        Ext.getStore("TaxonomyForCT").load();
    },

    onAdminfTypesGridDestroy: function(abstractcomponent, options) {
        Ext.getStore("TypesContenusDepDataJson").removeAll();
        Ext.getStore("TaxonomyForCT").removeAll();
    },

    miseAPlatTaxo: function(cible, resultat) {
        var e=0;
        for (e=0; e<cible.length; e++) {
            resultat.push({terme: cible[e].text});
            this.miseAPlatTaxo(cible[e].children, resultat);
        }
    },

    nameValidator: function(name) {
        var usedNames=[];
        Ext.Array.forEach(Ext.getCmp('champsEditionTC').query("field"), function(field){
            if (field.getId()!=Ext.getCmp(Ext.getCmp('champTCIdField').getValue()).getId()){
                Ext.Array.include(usedNames,field.name);
            }
        });
        if (Ext.Array.contains(usedNames,name)){
            return("Nom dèjà utilisé par un autre champ");
        } else {
            return(true);
        }
    },

    nameAvailable: function(name) {
        var usedNames=[];
        Ext.Array.forEach(Ext.getCmp('champsEditionTC').query("field"), function(field){
            Ext.Array.include(usedNames,field.name);
        });
        if (Ext.Array.contains(usedNames,name)){
            return(false);
        } else {
            return(true);
        }
    },

    init: function(application) {
        this.control({
            "#boutonAjouterContenu": {
                click: this.ajouterContenu
            },
            "#boutonOuvrirFenetreTC": {
                click: this.ouvrirFenetreTC
            },
            "#boutonAjouterChampTC": {
                click: this.creerChampTC
            },
            "#champsEditionTC ChampTC": {
                afterrender: this.selectChampTC,
                beforedestroy: this.enleveChampTC
            },
            "#ChampTCSelectGrid": {
                itemclick: this.updateOptionsListeTC,
                itemdblclick: this.createThroughDblClick
            },
            "#AdminfTypesGrid": {
                select: this.selectTC,
                edit: this.onGridpanelEdit,
                render: this.onAdminfTypesGridRender,
                destroy: this.onAdminfTypesGridDestroy
            },
            "#boutonSupprimerTypeContenu": {
                click: this.supprimeTypeContenu
            },
            "#boutonEnregistrerTypeContenu": {
                click: this.enregistrerTypeContenus
            },
            "#boutonNouveauTypeContenu": {
                click: this.fenetreNTC
            },
            "#boutonCreerTC": {
                click: this.creerNTC
            },
            "[itemId= 'boutonReplicateurChamps']": {
                click: this.repliqueChamp
            },
            "#TCfieldDeleter": {
                click: this.TCfieldDelete
            },
            "#TCfieldUp": {
                click: this.TCfieldMoveUp
            },
            "#TCfieldDown": {
                click: this.TCfieldMoveDown
            },
            "#boutonCopierTC": {
                click: this.copyTC
            }
        });
    }

});
