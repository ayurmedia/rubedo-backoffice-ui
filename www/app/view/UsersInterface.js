/*
 * File: app/view/UsersInterface.js
 *
 * This file was generated by Sencha Architect version 2.2.3.
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

Ext.define('Rubedo.view.UsersInterface', {
    extend: 'Ext.window.Window',
    alias: 'widget.UsersInterface',

    favoriteIcon: 'folder.png',
    localiserId: 'usersWindow',
    height: 578,
    id: 'UsersInterface',
    width: 951,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },
    constrainHeader: true,
    iconCls: 'user_edit',
    title: 'Users',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            tools: [
                {
                    xtype: 'tool',
                    itemId: 'windowMinimize',
                    type: 'minimize'
                },
                {
                    xtype: 'tool',
                    itemId: 'windowMaximize',
                    type: 'maximize'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'top',
                    height: 30,
                    itemId: 'filArianne',
                    items: [
                        {
                            xtype: 'button',
                            localiserId: 'usersLaunchBtn',
                            itemId: 'origine',
                            iconCls: 'user_edit',
                            text: 'Users'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'bottom',
                    height: 50,
                    itemId: 'barreMeta',
                    items: [
                        {
                            xtype: 'image',
                            height: 45,
                            itemId: 'imageBarreMeta',
                            width: 48,
                            listeners: {
                                render: {
                                    fn: me.onImageRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            itemId: 'boiteBarreMeta',
                            margin: '0 0 0 20',
                            tpl: [
                                '{customMeta}'
                            ]
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'top',
                    height: 86,
                    itemId: 'contextBar',
                    items: [
                        {
                            xtype: 'button',
                            ACL: 'write.ui.contents',
                            localiserId: 'addBtn',
                            id: 'addUserBtn',
                            iconAlign: 'top',
                            iconCls: 'add_big',
                            scale: 'large',
                            text: 'Ajouter'
                        },
                        {
                            xtype: 'button',
                            ACL: 'write.ui.contents',
                            localiserId: 'editBtn',
                            disabled: true,
                            id: 'editUserBtn',
                            iconAlign: 'top',
                            iconCls: 'pencil_big',
                            scale: 'large',
                            text: 'Modifier'
                        },
                        {
                            xtype: 'button',
                            ACL: 'write.ui.contents',
                            localiserId: 'removeBtn',
                            disabled: true,
                            id: 'removeUserBtn',
                            iconAlign: 'top',
                            iconCls: 'remove_big',
                            scale: 'large',
                            text: 'Supprimer'
                        },
                        {
                            xtype: 'buttongroup',
                            localiserId: 'clipboardGroup',
                            disabled: true,
                            headerPosition: 'bottom',
                            title: 'Presse-papiers',
                            columns: 4,
                            layout: {
                                columns: 2,
                                type: 'table'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    localiserId: 'shortcutBtn',
                                    itemId: 'boutonCreerRaccourci',
                                    iconAlign: 'top',
                                    iconCls: 'favorite_add_big',
                                    scale: 'large',
                                    text: 'Ajouter aux favoris'
                                }
                            ]
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            RApplication: 'users',
                            itemId: 'RHelpBtn',
                            iconCls: 'info_big',
                            scale: 'large',
                            text: ''
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'gridpanel',
                    id: 'usersInterfaceTypeGrid',
                    width: 150,
                    autoScroll: true,
                    resizable: true,
                    resizeHandles: 'e',
                    title: '',
                    store: 'UserTypesForUsers',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return ('<img src="resources/icones/'+MyPrefData.iconsDir+'/16x16/folder.png"> '+value);
                            },
                            localiserId: 'typeColumn',
                            width: 672,
                            dataIndex: 'type',
                            text: 'Type',
                            flex: 1
                        }
                    ],
                    selModel: Ext.create('Ext.selection.RowModel', {

                    })
                },
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    id: 'usersInterfaceCenterGrid',
                    title: '',
                    forceFit: true,
                    store: 'UsersAdminDataStore',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'name',
                            text: 'Name'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'email',
                            text: 'Email'
                        },
                        {
                            xtype: 'datecolumn',
                            dataIndex: 'createTime',
                            text: 'Creation'
                        },
                        {
                            xtype: 'datecolumn',
                            dataIndex: 'updateTime',
                            text: 'Last update'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            width: 360,
                            displayInfo: true,
                            store: 'UsersAdminDataStore'
                        }
                    ]
                }
            ],
            listeners: {
                render: {
                    fn: me.onUsersInterfaceRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onUsersInterfaceBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onImageRender: function(component, eOpts) {
        component.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/user.png');
    },

    onUsersInterfaceRender: function(component, eOpts) {
        Ext.getStore("UserTypesForUsers").load();
    },

    onUsersInterfaceBeforeClose: function(panel, eOpts) {
        Ext.getStore("UserTypesForUsers").removeAll();
        Ext.getStore("UsersAdminDataStore").clearFilter(true);
        Ext.getStore("UsersAdminDataStore").removeAll();
    }

});