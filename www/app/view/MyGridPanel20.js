/*
 * File: app/view/MyGridPanel20.js
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

Ext.define('Rubedo.view.MyGridPanel20', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mygridpanel20',

    requires: [
        'Rubedo.view.override.MyGridPanel20'
    ],

    id: 'ResultContentsGrid',
    title: '',
    store: 'searchResultsStore',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {

            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    dataIndex: 'text',
                    flex: 1,
                    text: 'Titre'
                }
            ],
            features: [
                {
                    ftype: 'grouping'
                }
            ]
        });

        me.callParent(arguments);
    }

});