/*
 * File: app/controller/PanierController.js
 *
 * This file was generated by Sencha Architect version 2.0.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('KECMdesktop.controller.PanierController', {
    extend: 'Ext.app.Controller',

    stores: [
        'PanierDataJson'
    ],
    views: [
        'Panier'
    ],

    afficherPanier: function(button, e, options) {
        if (!(Ext.isDefined(Ext.getCmp('Panier')))) {
            var panier = Ext.widget('panier');
            Ext.getCmp('desktopCont').add(panier);
            panier.show();
        }else {Ext.getCmp('Panier').toFront();}
    },

    onButtonClick2: function(button, e, options) {
        var cible = Ext.getCmp('PanierGrid').getSelectionModel().getSelection();
        Ext.getCmp('PanierGrid').getStore().remove(cible);
        var nbelts = Ext.getCmp('PanierGrid').getStore().count();
        Ext.getCmp('boutonPanierEntete').setText('Panier ('+nbelts+')');
    },

    onButtonClick3: function(button, e, options) {
        var cible = Ext.getCmp('arborescenceSites').getSelectionModel().getSelection()[0];
        if (Ext.isDefined(cible)) {
            this.getPanierDataJsonStore().add(cible);
            var nbelts = this.getPanierDataJsonStore().count();
            Ext.getCmp('boutonPanierEntete').setText('Panier ('+nbelts+')');
        }
    },

    onButtonClick4: function(button, e, options) {
        var cible = Ext.getCmp('ContenusGrid').getSelectionModel().getSelection();
        if (Ext.isDefined(cible)) {
            this.getPanierDataJsonStore().add(cible);
            var nbelts = this.getPanierDataJsonStore().count();
            Ext.getCmp('boutonPanierEntete').setText('Panier ('+nbelts+')');
        }
    },

    onButtonClick: function(button, e, options) {
        var cible = Ext.getCmp('masquesGrid').getSelectionModel().getSelection();
        if (Ext.isDefined(cible)) {
            this.getPanierDataJsonStore().add(cible);
            var nbelts = this.getPanierDataJsonStore().count();
            Ext.getCmp('boutonPanierEntete').setText('Panier ('+nbelts+')');
        }
    },

    onControllerClickStub: function() {

    },

    init: function() {
        this.control({
            "#boutonPanierEntete": {
                click: this.afficherPanier
            },
            "#enleverPanier": {
                click: this.onButtonClick2
            },
            "#ajoutPanierSites": {
                click: this.onButtonClick3
            },
            "#ajoutPanierContenus": {
                click: this.onButtonClick4
            },
            "#ajouterPanierMasques": {
                click: this.onButtonClick
            }
        });

    }

});
