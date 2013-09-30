/*
 * File: app/view/UserAddWindow.js
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

Ext.define('Rubedo.view.UserAddWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.UserAddWindow',

    requires: [
        'Rubedo.view.MyGridPanel16'
    ],

    localiserId: 'addUsersToGroupWindow',
    height: 300,
    id: 'UserAddWindow',
    width: 600,
    layout: {
        type: 'fit'
    },
    title: 'Ajouter des utilisateurs',
    maximizable: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'mygridpanel16',
                    store: 'UsersDataStore'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            localiserId: 'addUsersToGroupWindow',
                            id: 'userSelectionAddButton',
                            text: 'Ajouter ces utilisateurs au groupe séléctionné'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});