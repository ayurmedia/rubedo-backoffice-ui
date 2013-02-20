/*
 * File: app/store/UsersAdminDataStore.js
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

Ext.define('Rubedo.store.UsersAdminDataStore', {
    extend: 'Ext.data.Store',
    alias: 'store.UsersAdminDataStore',

    requires: [
        'Rubedo.model.userDataModel'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            isOptimised: true,
            usedCollection: 'Users',
            autoLoad: false,
            autoSync: true,
            remoteFilter: true,
            remoteSort: true,
            storeId: 'UsersAdminDataStore',
            model: 'Rubedo.model.userDataModel',
            proxy: {
                type: 'ajax',
                batchActions: false,
                api: {
                    create: 'users/create',
                    read: 'users',
                    update: 'users/update',
                    destroy: 'users/delete'
                },
                reader: {
                    type: 'json',
                    messageProperty: 'message',
                    root: 'data'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                }
            },
            sorters: {
                property: 'name'
            }
        }, cfg)]);
    }
});