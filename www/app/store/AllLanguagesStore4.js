/*
 * File: app/store/AllLanguagesStore4.js
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

Ext.define('Rubedo.store.AllLanguagesStore4', {
    extend: 'Ext.data.Store',
    alias: 'store.AllLanguagesStore4',

    requires: [
        'Rubedo.model.languageModel'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            isOptimised: true,
            usedCollection: 'Languages',
            autoLoad: false,
            model: 'Rubedo.model.languageModel',
            storeId: 'AllLanguagesStore4',
            pageSize: 1000,
            proxy: {
                type: 'ajax',
                api: {
                    read: 'languages'
                },
                reader: {
                    type: 'json',
                    messageProperty: 'message',
                    root: 'data'
                }
            },
            filters: {
                property: 'active',
                value: true
            },
            listeners: {
                load: {
                    fn: me.onStoreLoad,
                    scope: me
                }
            },
            sorters: {
                property: 'order'
            }
        }, cfg)]);
    },

    onStoreLoad: function(store, records, successful, eOpts) {
        store.add({"locale":"all", "label":Rubedo.RubedoAutomatedElementsLoc.allText, "flagCode":"_unknown", "active":true,"order":1});
    }

});