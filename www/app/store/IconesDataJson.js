/*
 * File: app/store/IconesDataJson.js
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

Ext.define('Rubedo.store.IconesDataJson', {
    extend: 'Ext.data.Store',
    alias: 'store.IconesDataJson',

    requires: [
        'Rubedo.model.iconDataModel'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'IconesDataJson',
            model: 'Rubedo.model.iconDataModel',
            proxy: {
                type: 'ajax',
                api: {
                    create: 'icons/create',
                    read: 'icons',
                    update: 'icons/update',
                    destroy: 'icons/delete'
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
            }
        }, cfg)]);
    }
});