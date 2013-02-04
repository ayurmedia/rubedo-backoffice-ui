/*
 * File: app/controller/assistantRequetageController.js
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

Ext.define('Rubedo.controller.assistantRequetageController', {
    extend: 'Ext.app.Controller',

    views: [
        'assisstantRE4',
        'regleChampAR'
    ],

    suivant: function(button, e, options) {
        var simpleMode = Ext.getCmp("assistantRequetage").simpleMode;
        var nextOK = 1;
        var etapeC = button.up().up().getLayout().getActiveItem().items.items;
        var i = 0;
        for (i=0;i<etapeC.length; i++) {
            if ((etapeC[i].isXType('field'))&&(!(etapeC[i].isValid()))) { nextOK = 0;}
        }
        if (nextOK == 1) {

            var etape = button.up().up().getLayout().getActiveItem();
            if (etape.id=='assisstantRE5'){
                this.displayQuery(this.readQuery());
            }
            else if (etape.id=='assisstantRE1') {
                Ext.getCmp('assisstantRE2').removeAll();
                var reglesAnciennes= Ext.clone(Ext.getCmp('assisstantRE4').items.items.length);
                var m =2;
                for (m=2; m<reglesAnciennes; m++){
                    Ext.getCmp('assisstantRE4').getComponent(2).destroy();
                }

                var storeL = Ext.create('Ext.data.Store', {
                    fields: ['valeur', 'nom'],
                    data : [
                    {valeur: 'AND', nom :'ET'},
                    {valeur: 'OR', nom :'OU'}
                    ]
                });

                var lien = Ext.create('Ext.form.ComboBox', {
                    anchor: '100%',
                    fieldLabel: 'Relation entre les règles ',
                    store: storeL,
                    value: 'OU',
                    name: "vocabulariesRule",
                    queryMode: 'local',
                    displayField: 'nom',
                    valueField: 'valeur',
                    labelWidth: 150,
                    editable: false,
                    forceSelect: true,
                    allowBlank: false

                });
                if (simpleMode) {
                    lien.setValue('ET');
                    lien.setReadOnly(true);
                }


                var typesContenus = Ext.getCmp('champTCRequeteur').getValue();
                if (simpleMode) {
                    typesContenus=[typesContenus];
                }
                var champsRegles = [ ];
                champsRegles.push({nom:'Création',
                    valeur: {
                        cType: 'datefield',
                        name: 'creation',
                        ruleId:'createTime',
                        label: 'Création'
                    }
                });
                champsRegles.push({nom:'Dernière modification',
                    valeur: {
                        cType: 'datefield',
                        name: 'derniereModification',
                        ruleId:'lastUpdateTime',
                        label: 'Dernière modification'
                    }});
                    if (typesContenus.length<2) {
                        var myThingType=Ext.getStore('TCNDepCombo').findRecord('id',typesContenus[0]);
                        var champsReq = Ext.clone(myThingType.data.champs);
                        var champsEligibles = ["Ext.form.field.Date", "Ext.form.field.Time", "Ext.form.field.Checkbox", "Ext.form.field.Number"];
                        var champsReqF = Ext.Array.filter(champsReq, function(champ){
                            if (Ext.Array.contains(champsEligibles, champ.cType)) {return true;} else {return false;}
                        });
                        champsReqF = Ext.Array.map(champsReqF, function(champ){
                            return ({nom:typesContenus[0]+ ' > '+champ.config.fieldLabel, valeur:{cType: champ.cType, ruleId: myThingType.get("id")+'>>'+champ.config.name, name: champ.config.name, label: myThingType.get("type")+' > '+champ.config.fieldLabel}});
                        });

                        champsRegles = Ext.Array.merge(champsRegles, champsReqF);

                    }

                    var typesDEP = Ext.getStore('TCNDepCombo').findRecord('id',typesContenus[0]).data.dependantTypes;
                    var j = 1;
                    for (j=1; j<typesContenus.length; j++) {
                        var typesDEPSuivant = Ext.getStore('TCNDepCombo').findRecord('id',typesContenus[j]).data.dependantTypes;
                        typesDEP = Ext.Array.intersect(typesDEP, typesDEPSuivant);
                    }
                    var k=0;
                    for (k=0; k<typesDEP.length; k++) {

                        var theTargetType = Ext.getStore('TCDepForQA').findRecord('id',typesDEP[k]);
                        champsRegles.push({nom:theTargetType.get("type")+' > '+'Création',
                            valeur: {
                                cType: 'datefield',
                                name: 'creation',
                                ruleId:'createTime',
                                label: theTargetType.get("type")+' > '+'Création'
                            }
                        });
                        champsRegles.push({nom:theTargetType.get("type")+' > '+'Dernière modification',
                            valeur: {
                                cType: 'datefield',
                                name: 'derniereModification',
                                ruleId:'lastUpdateTime',
                                label: theTargetType.get("type")+' > '+'Dernière modification'
                            }});  


                            var champsReq = Ext.clone(theTargetType.get("champs"));
                            var champsEligibles = ["Ext.form.field.Date", "Ext.form.field.Time", "Ext.form.field.Checkbox", "Ext.form.field.Number"];
                            var champsReqF = Ext.Array.filter(champsReq, function(champ){
                                if (Ext.Array.contains(champsEligibles, champ.cType)) {return true;} else {return false;}
                            });
                            champsReqF = Ext.Array.map(champsReqF, function(champ){
                                return ({nom:typesDEP[k]+ ' > '+champ.config.fieldLabel, valeur:{cType: champ.cType, ruleId: theTargetType.get("id")+'>>'+champ.config.name , name: champ.config.name, label:theTargetType.get("type")+' > '+champ.config.fieldLabel}});
                            });

                            champsRegles = Ext.Array.merge(champsRegles, champsReqF);




                        }

                        Ext.getStore('champsTCARStore').loadData(champsRegles);



                        var vocabulaires = Ext.getStore('TCNDepCombo').findRecord('id',typesContenus[0]).data.vocabularies;
                        var j = 1;
                        for (j=1; j<typesContenus.length; j++) {
                            var vocabSuivant = Ext.getStore('TCNDepCombo').findRecord('id',typesContenus[j]).data.vocabularies;
                            vocabulaires = Ext.Array.intersect(vocabulaires, vocabSuivant);
                        }

                        if (vocabulaires.length>1) {Ext.getCmp('assisstantRE2').add(lien);}
                        Ext.Array.remove(vocabulaires,"navigation");
                        var k =0;
                        for (k=0; k<vocabulaires.length; k++) {

                            var leVocab = Ext.getStore('TaxonomyForQA').findRecord('id', vocabulaires[k]);
                            var vocabAPlat= [ ];
                            //this.miseAPlatTaxo(leVocab.data.termes.children, vocabAPlat);


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
                                vocabularyId:leVocab.get("id"),
                                isVocabularyField:true,
                                usedRole:"terms",
                                anchor:"100%",
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
                                multiSelect: Ext.clone(leVocab.data.multiSelect),
                                allowBlank: !leVocab.data.mandatory
                            });

                            var storeR = Ext.create('Ext.data.Store', {
                                fields: ['valeur', 'nom'],
                                data : [
                                {valeur: 'all', nom :'Contient tous les termes'},
                                {valeur: 'allRec', nom :'Contient tous les termes ou au moins un descendant par terme'},
                                {valeur: 'some', nom :'Contient au moins un des termes'},
                                {valeur: 'someRec', nom :'Contient au moins un des termes ou au moins un des descendants d’un des termes'}
                                ]
                            });

                            var regle = Ext.create('Ext.form.ComboBox', {
                                name:leVocab.get("id")+"QueryRule",
                                anchor: '100%',
                                vocabularyId:leVocab.get("id"),
                                isVocabularyField:true,
                                usedRole:"rule",
                                fieldLabel: 'Règle',
                                store: storeR,
                                queryMode: 'local',
                                displayField: 'nom',
                                valueField: 'valeur',
                                editable: false,
                                value: 'some',
                                forceSelect: true,
                                allowBlank: false

                            });
                            if (simpleMode) {
                                regle.setValue("all");
                                regle.setReadOnly(true);
                                selecteur.multiSelect=false;
                            }


                            var enrobage = Ext.widget('fieldset', {
                                title : leVocab.get("name"),
                                collapsible: true


                            });
                            enrobage.add(selecteur);
                            enrobage.add(regle);
                            Ext.getCmp('assisstantRE2').add(enrobage);



                        }    

                    }




                    var tousET= Ext.getCmp('assistantRequetage').getLayout().getLayoutItems().length;
                    var suivET= Ext.getCmp('assistantRequetage').getLayout().getNext().etape;
                    if (suivET==5) { Ext.getCmp('boutonNextRequeteur').hide();}
                    else if (suivET==2) { Ext.getCmp('boutonPrevRequeteur').show();}
                    if (Ext.isDefined(suivET)) {
                        button.up().up().getLayout().next();

                        Ext.getCmp('progressAR').updateProgress(suivET/tousET, 'Etape '+suivET+' sur '+tousET);
                    }
                }

    },

    precedent: function(button, e, options) {
        var tousET= Ext.getCmp('assistantRequetage').getLayout().getLayoutItems().length;
        var suivET= Ext.getCmp('assistantRequetage').getLayout().getPrev().etape;
        if (suivET==4) { Ext.getCmp('boutonNextRequeteur').show();}
        else if (suivET==1) { Ext.getCmp('boutonPrevRequeteur').hide();}
        if (Ext.isDefined(suivET)) {
            button.up().up().getLayout().prev();
            Ext.getCmp('progressAR').updateProgress(suivET/tousET, 'Etape '+suivET+' sur '+tousET);
        }
    },

    enleveRegle: function(button, e, options) {
        if (button.up().up().up().items.items.indexOf(button.up().up())==2) {
            if (!Ext.isEmpty(button.up().up().up().getComponent(3))){
                button.up().up().up().getComponent(3).getComponent(0).getComponent(0).destroy();
            }
        }
        button.up().up().destroy();
    },

    selectAllTC: function(button, e, options) {
        Ext.getCmp('champTCRequeteur').select(Ext.getCmp('champTCRequeteur').getStore().data.items);
    },

    ajoutRegleChamp: function(button, e, options) {
        var nRegle= Ext.getCmp('createurReglesChampsAR').getValue();
        if (nRegle !== null) {
            var enrobage = Ext.widget('regleChampAR');
            enrobage.getComponent(0).getComponent('nomChamp').setText(nRegle.label);
            var mainThing = Ext.widget(nRegle.cType, {flex:1, mame:nRegle.name});
            mainThing.name=nRegle.name;
            mainThing.usedRole="value";
            mainThing.ruleId=nRegle.ruleId;
            mainThing.isAddedRuleField=true;
            enrobage.getComponent(0).insert(1,mainThing);
            if (nRegle.cType== 'checkboxfield') {
                var operateur= Ext.widget('tbtext', {text: ' = '});
            }
            else{
                var storeOper = Ext.create('Ext.data.Store', {
                    fields: ['operateur'],
                    data : [
                    {"operateur":"="},
                    {"operateur":"<="},
                    {"operateur":"<"},
                    {"operateur":">="},
                    {"operateur":">"},
                    {"operateur":"!="}
                    ]
                });
                var operateur= Ext.create('Ext.form.ComboBox', {
                    name:nRegle.name+"Operator",
                    store: storeOper,
                    usedRole:"rule",
                    isAddedRuleField:true,
                    ruleId:nRegle.ruleId,
                    flex:1,
                    queryMode: 'local',
                    displayField: 'operateur',
                    valueField: 'operateur',
                    editable: false,
                    multiSelect:false,
                    allowBlank:false,
                    forceSelect: true
                });


            }
            enrobage.getComponent(0).insert(1,operateur);
            if (Ext.getCmp('assisstantRE4').items.items.length>2){
                enrobage.getComponent(0).insert(0,Ext.widget('tbtext', {text: '<b>ET </b>'}));
            }

            Ext.getCmp('assisstantRE4').add(enrobage);
        }
    },

    onQueryBuildSaveBtnClick: function(button, e, options) {
        if (button.up().getForm().isValid()){
            var result=this.readQuery();
            var newQuery = Ext.create("Rubedo.model.queryDataModel", {
                name:result.queryName,
                type:"advanced",
                query:result,
                averageDuration:0,
                count:0,
                usage:[]
            });
            if (Ext.getCmp("assistantRequetage").adminMode){
                Ext.getStore("MainQueriesStore").add(newQuery);
            } else {
                Ext.getStore("QueriesStore").add(newQuery);
                Ext.getStore("QueriesStore").addListener("update", function(){
                    Ext.getCmp(Ext.getCmp("assistantRequetage").mainFieldId).select(newQuery);
                },this,{single:true});
                }

                Ext.getCmp("assistantRequetage").close();
            }
    },

    onBoutonCreateurTrisChampsARClick: function(button, e, options) {
        var nRegle= Ext.getCmp('createurTrisChampsAR').getValue();
        if (nRegle !== null) {
            var enrobage = Ext.widget('regleChampAR');
            enrobage.getComponent(0).getComponent('nomChamp').setText(nRegle.label);


            var storeOper = Ext.create('Ext.data.Store', {
                fields: ['operateur', 'label'],
                data : [
                {"operateur":"ASC", "label": "Croissant"},
                {"operateur":"DESC", "label": "Decroissant"}
                ]
            });
            var operateur= Ext.create('Ext.form.ComboBox', {
                name:nRegle.name+"Direction",
                store: storeOper,
                usedRole:"sort",
                isAddedRuleField:true,
                ruleId:nRegle.ruleId,
                flex:1,
                queryMode: 'local',
                displayField: 'label',
                valueField: 'operateur',
                editable: false,
                multiSelect:false,
                allowBlank:false,
                forceSelect: true
            });



            enrobage.getComponent(0).insert(1,operateur);
            if (Ext.getCmp('assisstantRE5').items.items.length>2){
                enrobage.getComponent(0).insert(0,Ext.widget('tbtext', {text: '<b>Puis </b>'}));
            }

            Ext.getCmp('assisstantRE5').add(enrobage);
        }
    },

    onMainQueriesGridSelectionChange: function(tablepanel, selections, options) {
        if (Ext.isEmpty(selections)){
            Ext.getCmp("queryMainRemoveBtn").disable();
            Ext.getCmp("queryMainEditBtn").disable();
        } else {
            Ext.getCmp("queryMainRemoveBtn").enable();
            Ext.getCmp("queryMainEditBtn").enable();
        }
    },

    onQueryMainRemoveBtnClick: function(button, e, options) {

        var delCon = Ext.widget('delConfirmZ');
        delCon.show();
        Ext.getCmp('delConfirmZOui').on('click', function() { 
            Ext.getStore("MainQueriesStore").remove(Ext.getCmp("mainQueriesGrid").getSelectionModel().getLastSelected());
            Ext.getCmp('delConfirmZ').close();

        });  


    },

    onQueryMainAddBtnClick: function(button, e, options) {
        Ext.widget("assistantRequetage",{adminMode:true}).show();
    },

    readQuery: function() {
        var mainWin= Ext.getCmp("assistantRequetage");
        var result = {};
        result.vocabularies={ };
        result.fieldRules={ };
        Ext.Array.forEach(mainWin.query("field"),function(field){
            if (field.submitValue){
                if (field.isVocabularyField) {
                    if (Ext.isEmpty(result.vocabularies[field.vocabularyId])){
                        result.vocabularies[field.vocabularyId]={ };                
                    }
                    result.vocabularies[field.vocabularyId][field.usedRole]=field.getValue();

                } else if (field.isAddedRuleField){
                    if (Ext.isEmpty(result.fieldRules[field.ruleId])){
                        result.fieldRules[field.ruleId]={ };           
                    }
                    result.fieldRules[field.ruleId][field.usedRole]=field.getValue();
                } else { 
                    result[field.name]=field.getValue();
                }
            }
        });
        return(result);
    },

    displayQuery: function(query) {
        var htmlDisplay="<h3>Types de contenus</h3><ul>";
        Ext.Array.forEach(query.contentTypes, function(ctid){
            htmlDisplay+="<li>"+Ext.getStore('TCNDepCombo').findRecord("id",ctid).get("type")+"</li>";
        });
        htmlDisplay+="</ul><h3>Taxonomie : règle "+query.vocabulariesRule+"</h3>";
        Ext.Object.each(query.vocabularies, function(key, value, myself){
            if(!Ext.isEmpty(value.terms)){
                var myFields = Ext.getCmp("assisstantRE2").query("field[vocabularyId="+key+"]");
                htmlDisplay+="<h4>"+Ext.getStore('TaxonomyForQA').findRecord("id",key).get("name")+" : "+myFields[1].getStore().findRecord("valeur",value.rule).get("nom")+"</h4><ul>";
                Ext.Array.forEach(value.terms, function(term){
                    htmlDisplay+="<li>"+myFields[0].getStore().findRecord("id",term).get("text")+"</li>";
                });
                htmlDisplay+="</ul>";
            }
        });
        htmlDisplay+="<h3>Règles sur les champs</h3><ul>";
        Ext.Object.each(query.fieldRules, function(key, value, myself){
            var tri = "";
            var a = value.rule||"";
            var b = value.value||"";
            console.log(tri);
            if (!Ext.isEmpty(value.sort)){
                if (value.sort=="ASC") {tri=", tri croissant";} else {tri=", tri decroissant";}
            }

            htmlDisplay+="<li>"+key+" "+a+" "+b+" "+tri+"</li>";
        });
        htmlDisplay+="</ul>";
        var target= Ext.getCmp("querySummaryBox");
        target.update(htmlDisplay);
    },

    init: function(application) {
        this.control({
            "#boutonNextRequeteur": {
                click: this.suivant
            },
            "#boutonPrevRequeteur": {
                click: this.precedent
            },
            "[itemId='boutonEnleveRegleAR']": {
                click: this.enleveRegle
            },
            "#boutonSelectAllTCAR": {
                click: this.selectAllTC
            },
            "#boutonCreateurReglesChampsAR": {
                click: this.ajoutRegleChamp
            },
            "#queryBuildSaveBtn": {
                click: this.onQueryBuildSaveBtnClick
            },
            "#boutonCreateurTrisChampsAR": {
                click: this.onBoutonCreateurTrisChampsARClick
            },
            "#mainQueriesGrid": {
                selectionchange: this.onMainQueriesGridSelectionChange
            },
            "#queryMainRemoveBtn": {
                click: this.onQueryMainRemoveBtnClick
            },
            "#queryMainAddBtn": {
                click: this.onQueryMainAddBtnClick
            }
        });
    }

});
