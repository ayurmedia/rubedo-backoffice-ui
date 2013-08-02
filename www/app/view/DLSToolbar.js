/*
 * File: app/view/DLSToolbar.js
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

Ext.define('Rubedo.view.DLSToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.DLSToolbar',

    specialTaxoMode: false,
    specialContentsMode: false,
    hidden: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                me.processLocSelectorCombo({
                    xtype: 'combobox',
                    localiserId: 'currentLanguageDSLField',
                    itemId: 'LocSelectorCombo',
                    fieldLabel: 'Current language',
                    editable: false,
                    displayField: 'label',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'locale',
                    listeners: {
                        change: {
                            fn: me.onLocSelectorComboChange,
                            scope: me
                        }
                    }
                }),
                {
                    xtype: 'button',
                    handler: function(button, event) {
                        var me=button.up();
                        var restricted=Ext.Array.pluck(Ext.getStore("AllLanguagesStore3").getRange(),"data");
                        Ext.getStore("TranslationAdderStore").removeAll();
                        var alreadyHere=Ext.Array.pluck(Ext.Array.pluck(me.getComponent(0).getStore().getRange(),"data"),"locale");
                        Ext.Array.forEach(restricted,function(candidate){
                            if(!Ext.Array.contains(alreadyHere,candidate.locale)){
                                Ext.getStore("TranslationAdderStore").add(candidate);
                            }
                        });
                        if (!Ext.isEmpty(Ext.getStore("TranslationAdderStore").getRange())){
                            Ext.widget("TranslationAdderWindow").show();
                            Ext.getCmp("TranslationAdderWindowSubmitBtn").on("click",function(){
                                var form=Ext.getCmp("TranslationAdderWindow").getComponent(0).getForm();
                                if (form.isValid()){
                                    me.addTranslation(form.getValues().language);
                                    Ext.getCmp("TranslationAdderWindow").close();
                                }
                            });
                            Ext.getCmp("TranslationAdderWindow").getComponent(0).getComponent(0).setValue(Ext.getStore("TranslationAdderStore").getRange()[0].get("locale"));
                        } else {
                            Ext.Msg.alert(Rubedo.RubedoAutomatedElementsLoc.errorTitle,Rubedo.RubedoAutomatedElementsLoc.alreadyTranslatedError);
                        }
                    },
                    localiserId: 'addTranslationBtn',
                    itemId: 'LocAddBtn',
                    iconCls: 'add',
                    text: 'Add translation'
                },
                {
                    xtype: 'button',
                    handler: function(button, event) {
                        var comboValue=button.up().getComponent("LocSelectorCombo").getValue();
                        button.up().getComponent("LocSelectorCombo").setValue(button.up().mainLocale);
                        button.up().getComponent("LocSelectorCombo").getStore().remove(button.up().getComponent("LocSelectorCombo").getStore().query("locale",comboValue).items[0]);
                        button.up().up().remove(button.up().up().getComponent(comboValue));
                        var me=this;
                        me.directOverrideMode=true;
                    },
                    localiserId: 'removeTranslationBtn',
                    disabled: true,
                    itemId: 'LocRemoveBtn',
                    iconCls: 'close',
                    text: 'Remove translation'
                }
            ]
        });

        me.callParent(arguments);
    },

    processLocSelectorCombo: function(config) {
        config.store=Ext.create('Ext.data.Store', {
            fields:[{name:"locale"},{name:"label"},{name:"flagCode"}]
        });
        config.tpl=Ext.create('Ext.XTemplate',
        '<tpl for=".">',
        '<div class="x-boundlist-item"><img src="/assets/flags/16/{flagCode}.png"> {label}</div>',
        '</tpl>'
        );
        return config;
    },

    onLocSelectorComboChange: function(field, newValue, oldValue, eOpts) {
        var me=field.up();
        me.getComponent("LocRemoveBtn").disable();
        if (!Ext.isEmpty(newValue)){
            if(newValue==me.mainLocale){
                me.up().getLayout().setActiveItem(me.up().getComponent("mainLocItem"));
            } else {
                me.up().getLayout().setActiveItem(me.up().getComponent(newValue));
                if (newValue!=me.nativeLanguage){
                    me.getComponent("LocRemoveBtn").enable();
                }
            }
            if (me.specialTaxoMode){
                Ext.getCmp("specialLangTermColumn").usedLanguage=newValue;
                Ext.getCmp("TermesTaxonomieTree").getView().refresh();
                Ext.getCmp("specialLangTermColumn").setText('<img class="header-icon" style="vertical-align:middle;margin-bottom:4px;" src="resources/icones/'+MyPrefData.iconsDir+'/16x16/pencil.png"/> '+field.getRawValue());
            }
        }
    },

    recievei18n: function(i18n, locale, nativeLanguage) {
        var me=this;
        me.mainLocale=locale;
        me.nativeLanguage=nativeLanguage;
        me.up().getLayout().setActiveItem(me.up().getComponent("mainLocItem"));
        me.getComponent(0).getStore().removeAll();
        Ext.Array.forEach(me.up().items.items, function(item){
            if(item.itemId!="mainLocItem"){
                me.up().remove(item);
            }
        });
        if ((!Ext.isEmpty(i18n))&&(Ext.getStore("AllLanguagesStore3").getRange().length!=1)){
            Ext.Object.each(i18n, function(key, value, myself) {
                if(!Ext.isEmpty(Ext.getStore("AllLanguagesStore3").query("locale",key,false,false,true).items)){
                    var potentialLabel=Ext.getStore("AllLanguagesStore3").query("locale",key,false,false,true).items[0].get("label");
                    var betterLabel=Ext.getStore("AllLanguagesStore3").query("locale",key,false,false,true).items[0].get("ownLabel");
                    if (!Ext.isEmpty(betterLabel)){
                        potentialLabel=betterLabel;
                    }
                    me.getComponent(0).getStore().add({"locale":key,"label":potentialLabel, "flagCode":Ext.getStore("AllLanguagesStore3").query("locale",key,false,false,true).items[0].get("flagCode")});
                    if(key!=locale){
                        var toAdd=Ext.widget(me.replicatorEntity,{itemId:key});
                        me.up().add(toAdd);
                        if (me.specialContentsMode){
                            if ((Ext.isEmpty(Ext.getCmp("cedtr1")))&&(Ext.isEmpty(Ext.getCmp("DAMSEcondaryFieldsBox")))){
                                toAdd.removeAll();
                            }
                            Ext.Array.forEach(me.up().getComponent("mainLocItem").query("ChampTC"),function(candidate){
                                if (candidate.localizable){
                                    var cont=candidate.cloneConfig();
                                    var field=candidate.query("field")[0].cloneConfig({anchor:"90%",style:"{float:left;}"});
                                    cont.getComponent('helpBouton').setTooltip(candidate.getComponent('helpBouton').tooltip);
                                    cont.getComponent('helpBouton').hidden=candidate.getComponent('helpBouton').hidden;
                                    cont.add(field);
                                    toAdd.add(cont);
                                }
                            });
                            toAdd.getForm().setValues(value.fields);
                        }else{
                            toAdd.getForm().setValues(value);
                        }
                        if (me.up().getComponent("mainLocItem").query("field")[0].readOnly){
                            Ext.Array.forEach(toAdd.query("field"), function(field){field.setReadOnly(true);});
                        }

                    }
                }});
                me.getComponent("LocSelectorCombo").setValue(locale);
                if (Ext.getStore("AllLanguagesStore3").getRange().length==1){
                    me.hide();
                } else {
                    me.show();
                }
            } else {
                me.hide();
            }
    },

    persisti18n: function(record) {
        var me=this;
        var newOne=Ext.clone(record.get("i18n"));
        if (me.directOverrideMode){
            newOne={ };
        }
        var items=me.up().items.items;
        Ext.Array.forEach(items,function(item){
            if (me.specialContentsMode){
                if(item.itemId=="mainLocItem"){
                    newOne[me.mainLocale]={fields:item.getForm().getValues()};
                } else {
                    newOne[item.itemId]={fields:item.getForm().getValues()};
                }
            }else{
                if(item.itemId=="mainLocItem"){
                    newOne[me.mainLocale]=item.getForm().getValues();
                } else {
                    newOne[item.itemId]=item.getForm().getValues();
                }
            }
        });
        record.set("i18n",newOne);
    },

    addTranslation: function(locale) {
        var me=this;
        me.getComponent(0).getStore().add({"locale":locale,"label":Ext.getStore("AllLanguagesStore3").query("locale",locale,false,false,true).items[0].get("label"),"flagCode":Ext.getStore("AllLanguagesStore3").query("locale",locale,false,false,true).items[0].get("flagCode")});
        var toAdd=Ext.widget(me.replicatorEntity,{itemId:locale});
        me.up().add(toAdd);
        if (me.specialContentsMode){
            if ((Ext.isEmpty(Ext.getCmp("cedtr1")))&&(Ext.isEmpty(Ext.getCmp("DAMSEcondaryFieldsBox")))){
                toAdd.removeAll();
            }
            Ext.Array.forEach(me.up().getComponent("mainLocItem").query("ChampTC"),function(candidate){
                if (candidate.localizable){
                    var cont=candidate.cloneConfig();
                    var field=candidate.query("field")[0].cloneConfig({anchor:"90%",style:"{float:left;}"});
                    cont.getComponent('helpBouton').setTooltip(candidate.getComponent('helpBouton').tooltip);
                    cont.getComponent('helpBouton').hidden=candidate.getComponent('helpBouton').hidden;
                    cont.add(field);
                    toAdd.add(cont);
                }
            });
        }
        toAdd.getForm().setValues(me.up().getComponent("mainLocItem").getForm().getValues());
        me.getComponent(0).setValue(locale);
    }

});