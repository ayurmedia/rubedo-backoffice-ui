/*
 * File: app/controller/InterfaceController.js
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

Ext.define('Rubedo.controller.InterfaceController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.InterfaceController',

    views: [
        'menuPrincipalInterface'
    ],

    afficherMenuPrincipal: function(button, e, options) {
        if (Ext.isDefined(Ext.getCmp('menuPrincipalInterface'))) {
            Ext.getCmp('menuPrincipalInterface').destroy();
        }
        else {
            var menuPrincipal = Ext.widget('menuPrincipalInterface', {title:MyPrefData.myName});


            menuPrincipal.showAt(0, Ext.getCmp('desktopCont').getHeight()-310);   
            menuPrincipal.getEl().addListener('mouseover', function(){  Ext.getBody().removeAllListeners(); });
            menuPrincipal.getEl().addListener('mouseout', function(){  Ext.getBody().addListener('click', function(){ if (Ext.isDefined(Ext.getCmp('menuPrincipalInterface'))) {
                Ext.getCmp('menuPrincipalInterface').destroy();
            }}); });
        }
    },

    maximize: function(tool, e, options) {
        tool.up().up().toggleMaximize();
    },

    compenserResize: function(abstractcomponent, adjWidth, adjHeight, options) {
        Ext.getCmp('boiteAIconesBureau').setHeight(abstractcomponent.getHeight());
        Ext.getCmp('boiteAIconesBureau').setWidth(abstractcomponent.getWidth());
        if (Ext.isDefined(Ext.getCmp('menuPrincipalInterface'))) {
            Ext.getCmp('menuPrincipalInterface').showAt(0, abstractcomponent.getHeight()-310);
        }
    },

    componrtementWindow: function(abstractcomponent, options) {
        if (!abstractcomponent.isXType("messagebox")){
            var boutonCompagnon = Ext.widget('splitbutton', {text: abstractcomponent.title, iconCls: abstractcomponent.iconCls, arrowCls:"split", enableToggle: true,allowDepress: false});
            abstractcomponent.on('close', function(){boutonCompagnon.destroy();});
            abstractcomponent.on('minimize', function(){abstractcomponent.hide(); boutonCompagnon.toggle(false);});
            abstractcomponent.getEl().on('focus', function(){boutonCompagnon.toggle(true);});
            abstractcomponent.on('resize', function(){this.focus();});
            abstractcomponent.getEl().on('blur', function(){boutonCompagnon.toggle(false);});
            boutonCompagnon.on('click', function(){ 
                if (abstractcomponent.isVisible()) {
                    if (Ext.WindowManager.getActive().id==abstractcomponent.id) {abstractcomponent.hide(); this.toggle(false);}
                    else {abstractcomponent.toFront(); this.toggle(true);}
                }
                else {abstractcomponent.show();}

            });
            boutonCompagnon.on('arrowclick', function(){abstractcomponent.close();});
            boutonCompagnon.on('render', function(){abstractcomponent.animateTarget=this.getEl();});
            Ext.getCmp('taskbarPrincipal').add(boutonCompagnon);
            abstractcomponent.animateTarget=boutonCompagnon.getEl();
        }
    },

    minimize: function(tool, e, options) {
        tool.up().up().minimize();
    },

    showDesktop: function(button, e, options) {
        Ext.WindowManager.each(function(window){
            if (window.isVisible()) {window.minimize();}
        });
    },

    comportementIcones: function(abstractcomponent, options) {
        var me=this;
        abstractcomponent.on('move', function(cible, x, y){
            if ((x % 100)>50) {x = x-(x % 100)+100;} else {x = x-(x % 100);}
            if ((y % 100)>50) {y = y-(y % 100)+100;} else {y = y-(y % 100);}
            while (this.placeLibre(x,y, abstractcomponent.id)===false) {
                if (y<(window.innerHeight-150)) {    
                    y=y+100;
                }
                else {
                    y=0;
                    x=x+100;
                }
            }
            abstractcomponent.suspendEvents(false);
            abstractcomponent.setPosition(x, y);
            abstractcomponent.resumeEvents();
            var myRec =Ext.getStore("IconesDataJson").findRecord("id", abstractcomponent.recId);
            if (!Ext.isEmpty(myRec)){
                if ((myRec.get("posX")!=x)||(myRec.get("posY")!=y)) {
                    myRec.beginEdit();
                    myRec.set("posX", x);
                    myRec.set("posY", y);
                    myRec.endEdit();
                }

            }}, this);

            abstractcomponent.getEl().on("contextmenu", function(e){
                var menu= Ext.getCmp('iconsContextMenu');
                if (Ext.isEmpty(menu)){
                    menu = Ext.widget('iconsContextMenu');
                    menu.on('blur', function(){this.destroy();});}
                    menu.getComponent("iconDeleteMenuItem").on("click", function(){
                        Ext.getStore("IconesDataJson").remove(Ext.getStore("IconesDataJson").findRecord("id", abstractcomponent.recId));
                        abstractcomponent.up().remove(abstractcomponent);
                        menu.destroy();
                    });
                    menu.getComponent("iconNameField").setValue(abstractcomponent.iText);
                    menu.getComponent("iconRenameMenuItem").on("click", function(){
                        if (menu.getComponent("iconNameField").isValid()) {
                            Ext.getStore("IconesDataJson").findRecord("id", abstractcomponent.recId).set("text",menu.getComponent("iconNameField").getValue());
                            me.refreshIcons();
                        }
                    });
                    menu.showAt(Ext.EventObject.getXY());
                    e.stopEvent();

                });
    },

    ouvrirFenteresMenuDroite: function(button, e, options) {
        if (button.itemId=='deconnexionMenuPrincipal') {
            /*  var iconesE = [ ];
            var iconesR = Ext.getCmp('boiteAIconesBureau').items.items;    
            Ext.Array.forEach(iconesR, function(icone) {
            iconesE.push(
            {
            text:icone.title,
            posX:icone.getPosition()[0],
            posY:icone.getPosition()[1],
            image:icone.getComponent(0).src
            }
            );
            });

            console.log(iconesE);  */

        }
        else{

            var fenetre = Ext.getCmp(button.itemId);
            if (Ext.isDefined(fenetre)){ fenetre.show(); fenetre.toFront(); }
            else {
                fenetre = Ext.widget(button.itemId);
                Ext.getCmp('desktopCont').add(fenetre);
                if (Ext.isDefined(window.innerHeight)) {
                    if (fenetre.height>(window.innerHeight-40)) {fenetre.setHeight((window.innerHeight-40));}
                    if (fenetre.width>(window.innerWidth)) {fenetre.setWidth((window.innerWidth));}
                }
                fenetre.show();

            }
            Ext.getCmp('menuPrincipalInterface').destroy();
        }
    },

    majIcones: function(abstractcomponent, options) {
        abstractcomponent.getEl().on('contextmenu', function(e){
            var menu= Ext.getCmp('settingsContextMenu');
            if (Ext.isEmpty(menu)){
                menu = Ext.widget('settingsContextMenu');
                menu.on('blur', function(){this.destroy();});}
                menu.showAt(Ext.EventObject.getXY());
                e.stopEvent();


            }); 
    },

    hideAllIcons: function(item, e, options) {
        Ext.Array.forEach(Ext.getCmp('boiteAIconesBureau').items.items, function(ico){ico.hide();});
    },

    showAllIcons: function(item, e, options) {
        Ext.Array.forEach(Ext.getCmp('boiteAIconesBureau').items.items, function(ico){ico.show();});
    },

    reagarangeAllIcons: function(item, e, options) {
        Ext.getStore("IconesDataJson").suspendAutoSync();
        Ext.Array.forEach(Ext.getCmp('boiteAIconesBureau').items.items, function(ico){ico.setPosition(0,0);});
        Ext.getStore("IconesDataJson").resumeAutoSync();
        Ext.getStore("IconesDataJson").sync();
    },

    displayDesktopCustomizeWindow: function(item, e, options) {
        var fenetre=Ext.getCmp('DesktopCustomizeWindow'); 
        if (Ext.isEmpty(fenetre)){
            fenetre=Ext.widget('DesktopCustomizeWindow');
            Ext.getCmp('desktopCont').add(fenetre);
        }fenetre.show();
    },

    updateWallpaperPreview: function(tablepanel, record, item, index, e, options) {
        Ext.getCmp('wallpaperPicker').getComponent(0).setSrc(record.data.file);
    },

    wallpaperChange: function(button, e, options) {
        Ext.getCmp('desktopBackGround').setSrc(Ext.getCmp('wallpaperPicker').getComponent(0).src);
    },

    onGridpanelExpand: function(p, options) {
        Ext.getCmp('DesktopCustomizeMainArea').removeAll();
        Ext.getCmp('DesktopCustomizeMainArea').add(Ext.widget('themePicker'));
    },

    onGridpanelExpand1: function(p, options) {
        Ext.getCmp('DesktopCustomizeMainArea').removeAll();
        Ext.getCmp('DesktopCustomizeMainArea').add(Ext.widget('wallpaperPicker'));
    },

    onGridpanelItemClick: function(tablepanel, record, item, index, e, options) {
        Ext.getCmp('themePicker').getComponent(0).setSrc(record.data.preview);
    },

    applyTheme: function(button, e, options) {
        var theme = Ext.getCmp('themeGrid').getSelectionModel().getLastSelected().data;
        Ext.getCmp('desktopBackGround').setSrc(theme.wallpaper);
        Ext.util.CSS.swapStyleSheet('maintheme', theme.stylesheet);
        MyPrefData.iconsDir=theme.iconSet;
        MyPrefData.themeColor=theme.themeColor;
        this.refreshIcons();
    },

    onPanelExpand: function(p, options) {
        Ext.getCmp('DesktopCustomizeMainArea').removeAll();
        Ext.getCmp('DesktopCustomizeMainArea').add(Ext.widget('accessibilityPicker'));
    },

    HCmode: function(button, e, options) {
        if (MyPrefData.highContrast===false) {
            Ext.util.CSS.swapStyleSheet('ext_theme', 'extjs-4.1.0/resources/css/ext-all-access.css');
            MyPrefData.highContrast=true;
            button.setText('Désactiver');
        } else {Ext.util.CSS.swapStyleSheet('ext_theme', 'extjs-4.1.0/resources/css/ext-all-gray.css');
            MyPrefData.highContrast=false;
            button.setText('Activer');
        }
    },

    setHCButtonStatus: function(abstractcomponent, options) {
        if (MyPrefData.highContrast===true) {
            abstractcomponent.setText('Désactiver');
        } 
    },

    createIconBtn: function(button, e, options) {
        var myWindow = button.findParentByType("window");
        var myText = myWindow.title;
        var myRecord = myWindow.getComponent(0).getSelectionModel().getLastSelected();
        var actions = [ ];
        actions.push({
            type:"openWindow",
            target:myWindow.id			
        });
        if (!Ext.isEmpty(myRecord)){
            myText=myRecord.get(myRecord.fields.items[0].name);
            actions.push({
                type:"selectRecord",
                target:myWindow.getComponent(0).id,
                recordId:myRecord.get("id")
            });
        }
        var newIcon = Ext.create("Rubedo.model.iconDataModel",{
            text:myText,
            posX:0,
            posY:0,
            image: myWindow.favoriteIcon||"favorite.png",
            actions:actions

        });
        var me=this;
        Ext.getStore("IconesDataJson").add(newIcon);
        Ext.getStore("IconesDataJson").on("datachanged", function(){
            me.refreshIcons();
            Ext.getStore("IconesDataJson").clearListeners();
        });
    },

    onLaunch: function() {
        var me=this;
        Ext.getBody().addListener('click', function(){ if (Ext.isDefined(Ext.getCmp('menuPrincipalInterface'))) {
            Ext.getCmp('menuPrincipalInterface').destroy();
        }});
        Ext.getCmp('boutonPincipalInterface').addListener('mouseover', function(){  Ext.getBody().removeAllListeners(); });
        Ext.getCmp('boutonPincipalInterface').addListener('mouseout', function(){  Ext.getBody().addListener('click', function(){ if (Ext.isDefined(Ext.getCmp('menuPrincipalInterface'))) {
            Ext.getCmp('menuPrincipalInterface').destroy();
        }}); }); 
        Ext.getStore('PersonalPrefsStore').load({
            callback:function(){
                var myPrefs=this.getRange()[0].data;
                Ext.getCmp('desktopBackGround').setSrc(myPrefs.wallpaper);
                Ext.util.CSS.swapStyleSheet('maintheme', myPrefs.stylesheet);
                MyPrefData.iconsDir=myPrefs.iconSet;
                MyPrefData.myName=myPrefs.myName;
                MyPrefData.themeColor=myPrefs.themeColor;
                me.refreshIcons();
            }
        });
    },

    placeLibre: function(x, y, id) {
        var libre = true;
        var iconesP = Ext.getCmp('boiteAIconesBureau').items.items;
        Ext.Array.forEach(iconesP,function(icone){
            if ((icone.x==x)&&(icone.y==y)&&(icone.id!=id)) {libre = false;}
        });
        return libre;
    },

    init: function(application) {
        Ext.define('MyPrefData', { 
            singleton: true, 

            iconsDir: 'red',
            highContrast:false,
            myName:'Alexandru Dobre',
            themeColor: '#D7251D'
        }); 

        this.control({
            "#boutonPincipalInterface": {
                click: this.afficherMenuPrincipal
            },
            "[itemId='windowMaximize']": {
                click: this.maximize
            },
            "#desktopCont": {
                resize: this.compenserResize
            },
            "window": {
                render: this.componrtementWindow
            },
            "[itemId='windowMinimize']": {
                click: this.minimize
            },
            "#boutonShowDesktop": {
                click: this.showDesktop
            },
            "iconeBureau": {
                render: this.comportementIcones
            },
            "#menuPrincipalDroite button": {
                click: this.ouvrirFenteresMenuDroite
            },
            "#boiteAIconesBureau": {
                render: this.majIcones
            },
            "#itemHideAllIcons": {
                click: this.hideAllIcons
            },
            "#itemShowAllIcons": {
                click: this.showAllIcons
            },
            "#itemRearangeAllIcons": {
                click: this.reagarangeAllIcons
            },
            "#itemCustomizeDesktop": {
                click: this.displayDesktopCustomizeWindow
            },
            "#wallpaperGrid": {
                itemclick: this.updateWallpaperPreview,
                expand: this.onGridpanelExpand1
            },
            "#wallpaperPickerButton": {
                click: this.wallpaperChange
            },
            "#themeGrid": {
                expand: this.onGridpanelExpand,
                itemclick: this.onGridpanelItemClick
            },
            "#themePickerButton": {
                click: this.applyTheme
            },
            "#accessibilityOptionsPanel": {
                expand: this.onPanelExpand
            },
            "#highContrastButton": {
                click: this.HCmode,
                render: this.setHCButtonStatus
            },
            "[itemId='boutonCreerRaccourci']": {
                click: this.createIconBtn
            }
        });
    },

    refreshIcons: function() {
        var icones = Ext.getStore('IconesDataJson').getRange();
        Ext.getCmp("boiteAIconesBureau").removeAll();
        Ext.Array.forEach(icones, function(icone){
            var nIcone = Ext.widget('iconeBureau',{
                bodyStyle:"background-image: url(resources/icones/"+MyPrefData.iconsDir+"/64x64/"+icone.get("image")+")  !important; background: transparent; background-repeat: no-repeat; background-position:top center;",
                html:"<p style=\"margin-top:66px; text-align: center; color: #fff; font-size: 10px;\">"+icone.get("text")+"</p>"
            });
            nIcone.iText=icone.get("text");
            nIcone.recId=icone.get("id");
            nIcone.actions=icone.get("actions");
            nIcone.on("render", function(){
                nIcone.getEl().on("dblclick", function(){
                    if (!Ext.isEmpty(nIcone.actions)){
                        Ext.Array.forEach(nIcone.actions, function(action){
                            if (action.type=="openWindow") { 
                                var fenetre = Ext.getCmp(action.target);
                                if (Ext.isDefined(fenetre)){fenetre.show();  fenetre.toFront(); }
                                else {
                                    fenetre = Ext.widget(action.target);
                                    Ext.getCmp('desktopCont').add(fenetre);
                                    if (Ext.isDefined(window.innerHeight)) {
                                        if (fenetre.height>(window.innerHeight-40)) {fenetre.setHeight((window.innerHeight-40));}
                                        if (fenetre.width>(window.innerWidth)) {fenetre.setWidth((window.innerWidth));}
                                    }
                                    fenetre.show();
                                }
                            }else if (action.type=="selectRecord") { 
                                var target=Ext.getCmp(action.target);
                                if (!Ext.isEmpty(target)) {
                                    target.getSelectionModel().select(target.getStore().findRecord("id",action.recordId));
                                }
                            }

                        });

                    }});});
                    nIcone.setPosition(icone.data.posX, icone.data.posY);
                    Ext.getCmp("boiteAIconesBureau").add(nIcone);
                }); 
    }

});
