/*
 * File: app/controller/SitesController.js
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

Ext.define('Rubedo.controller.SitesController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.SitesController',

    selectSite: function(tablepanel, selections, options) {
        if (Ext.isEmpty(selections)) {
            Ext.getCmp("siteRemoveBtn").disable();
            Ext.getCmp("mainSiteProps").disable();
            Ext.getCmp("mainSiteProps").getForm().setValues();
        } else {
            Ext.getCmp("siteRemoveBtn").enable();
            Ext.getCmp("mainSiteProps").getForm().loadRecord(selections[0]);
            Ext.getCmp("mainSiteProps").enable();


        }
    },

    deleteSite: function(button, e, options) {
        var target = Ext.getCmp('mainSitesGrid').getSelectionModel().getSelection()[0];
        if (Ext.isDefined(target)) {
            var delCon = Ext.widget('delConfirmZ');
            delCon.show();
            Ext.getCmp('delConfirmZOui').on('click', function() { 
                Ext.getCmp('mainSitesGrid').getStore().remove(target);
                //button.disable();
                Ext.getCmp('delConfirmZ').close();

            });  

        }
    },

    openAddSiteWindow: function(button, e, options) {
        Ext.widget("newSiteWindow").show();
    },

    createNewSite: function(button, e, options) {
        var form = button.up().getForm();
        if (form.isValid()){
            var newSite= Ext.create("Rubedo.model.sitesDataModel", form.getValues());
            Ext.getStore("SitesJson").add(newSite);
            button.up().up().close();
        }
    },

    updateSiteSubmit: function(button, e, options) {
        var form = button.up().getForm();
        if (form.isValid()){
            Ext.getCmp("mainSitesGrid").getSelectionModel().getLastSelected().set(form.getValues());
        }
    },

    init: function(application) {
        this.control({
            "#mainSitesGrid": {
                selectionchange: this.selectSite
            },
            "#siteRemoveBtn": {
                click: this.deleteSite
            },
            "#siteAddBtn": {
                click: this.openAddSiteWindow
            },
            "#newSiteSubmitBtn": {
                click: this.createNewSite
            },
            "#updateSiteBtn": {
                click: this.updateSiteSubmit
            }
        });
    }

});
