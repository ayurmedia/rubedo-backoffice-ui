/*
 * File: app/view/UserAdminWindow.js
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

Ext.define('Rubedo.view.UserAdminWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.UserAdminWindow',

    requires: [
        'Rubedo.view.MyGridPanel16'
    ],

    height: 490,
    id: 'UserAdminWindow',
    width: 800,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },
    iconCls: 'user_edit',
    title: 'Utilisateurs',
    constrainHeader: true,
    maximizable: true,
    minimizable: true,
    modal: false,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'mygridpanel16',
                    id: 'userAdminGrid',
                    width: 200,
                    resizable: true,
                    resizeHandles: 'e',
                    managesStore: true
                },
                {
                    xtype: 'tabpanel',
                    flex: 1,
                    disabled: true,
                    id: 'userAdminMainPanel',
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'form',
                            id: 'userAdminInfoDisplay',
                            layout: {
                                type: 'hbox'
                            },
                            bodyPadding: 10,
                            title: 'Informations',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    height: 360,
                                    margin: 0,
                                    width: 356,
                                    autoScroll: true,
                                    title: 'Informations',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            anchor: '100%',
                                            disabled: false,
                                            name: 'name',
                                            fieldLabel: 'Nom ',
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '100%',
                                            name: 'email',
                                            fieldLabel: 'E-mail ',
                                            allowBlank: false,
                                            vtype: 'email'
                                        },
                                        {
                                            xtype: 'combobox',
                                            anchor: '100%',
                                            name: 'title',
                                            fieldLabel: 'Civilité ',
                                            editable: false,
                                            forceSelection: true,
                                            store: [
                                                'Mr',
                                                'Mme',
                                                'Mlle'
                                            ]
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '100%',
                                            name: 'organisation',
                                            fieldLabel: 'Organisation '
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '100%',
                                            name: 'service',
                                            fieldLabel: 'Service '
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '100%',
                                            name: 'post',
                                            fieldLabel: 'Fonction '
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '100%',
                                            name: 'telephone',
                                            fieldLabel: 'Téléphone '
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '100%',
                                            name: 'mobile',
                                            fieldLabel: 'Mobile '
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '100%',
                                            name: 'coordinates',
                                            fieldLabel: 'Coordonnées '
                                        },
                                        {
                                            xtype: 'combobox',
                                            anchor: '100%',
                                            name: 'language',
                                            fieldLabel: 'Langue ',
                                            editable: false,
                                            displayField: 'language',
                                            forceSelection: true,
                                            store: 'languageStore',
                                            valueField: 'language'
                                        },
                                        {
                                            xtype: 'combobox',
                                            anchor: '100%',
                                            name: 'country',
                                            fieldLabel: 'Pays ',
                                            editable: false,
                                            displayField: 'country',
                                            forceSelection: true,
                                            store: 'countryStore',
                                            valueField: 'country'
                                        },
                                        {
                                            xtype: 'button',
                                            ACL: 'write.ui.users',
                                            anchor: '100%',
                                            id: 'userAdminInfoEdit',
                                            text: 'Appliquer'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    height: 292,
                                    margin: '0 0 0 10',
                                    width: 200,
                                    title: 'Photo',
                                    items: [
                                        {
                                            xtype: 'image',
                                            height: 180,
                                            id: 'userAdminProfilePicture',
                                            margin: '0 0 18 18',
                                            width: 140,
                                            src: 'resources/images/userBig.png'
                                        },
                                        {
                                            xtype: 'filefield',
                                            anchor: '60%',
                                            formBind: false,
                                            style: 'float: left;',
                                            submitValue: false,
                                            fieldLabel: '',
                                            buttonText: 'Choisir'
                                        },
                                        {
                                            xtype: 'button',
                                            ACL: 'write.ui.users',
                                            anchor: '40%',
                                            text: 'Appliquer'
                                        },
                                        {
                                            xtype: 'button',
                                            ACL: 'write.ui.users',
                                            anchor: '100%',
                                            id: 'userAdminProfilePictureDelete',
                                            text: 'Suprimer'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'form',
                            id: 'userAdminAccessDisplay',
                            bodyPadding: 20,
                            title: 'Accès',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: 'Compte utilisateur et validité',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            anchor: '100%',
                                            name: 'login',
                                            fieldLabel: 'Compte utilisateur ',
                                            labelWidth: 200,
                                            vtype: 'alphanum'
                                        },
                                        {
                                            xtype: 'datefield',
                                            anchor: '100%',
                                            name: 'startValidity',
                                            fieldLabel: 'Début de validité ',
                                            labelWidth: 200
                                        },
                                        {
                                            xtype: 'datefield',
                                            anchor: '100%',
                                            name: 'endValidity',
                                            fieldLabel: 'Fin de validité ',
                                            labelWidth: 200
                                        },
                                        {
                                            xtype: 'button',
                                            ACL: 'write.ui.users',
                                            anchor: '100%',
                                            id: 'userAdminAccessEdit',
                                            text: 'Appliquer'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    ACL: 'write.ui.users',
                                    title: 'Changement de mot de passe',
                                    items: [
                                        {
                                            xtype: 'button',
                                            anchor: '100%',
                                            id: 'AdminChangeUserPwd',
                                            text: 'Changer le mot de passe de cet utilisateur'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    height: 150,
                                    autoScroll: true,
                                    title: 'Délégations',
                                    store: 'DelegationsDataStore',
                                    viewConfig: {

                                    },
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var user = Ext.getStore("UsersAdminDataStore").findRecord("id", value);
                                                if (Ext.isEmpty(user)) {
                                                    return("Inconnu");
                                                } else {
                                                    return(user.get("name"));
                                                }
                                            },
                                            dataIndex: 'receiverId',
                                            flex: 1,
                                            text: 'Délégué',
                                            editor: {
                                                xtype: 'combobox',
                                                managesStore: true,
                                                displayField: 'name',
                                                minChars: 3,
                                                store: 'UsersComboStore',
                                                typeAhead: true,
                                                valueField: 'id'
                                            }
                                        },
                                        {
                                            xtype: 'datecolumn',
                                            dataIndex: 'startValidity',
                                            flex: 1,
                                            text: 'Début de validité',
                                            editor: {
                                                xtype: 'datefield'
                                            }
                                        },
                                        {
                                            xtype: 'datecolumn',
                                            dataIndex: 'endValidity',
                                            flex: 1,
                                            text: 'Fin de validité',
                                            editor: {
                                                xtype: 'datefield'
                                            }
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
                                                    ACL: 'write.ui.users',
                                                    id: 'AdminAddDelegationBtn',
                                                    iconCls: 'add',
                                                    text: 'Ajouter'
                                                },
                                                {
                                                    xtype: 'button',
                                                    ACL: 'write.ui.users',
                                                    id: 'AdminDeleteDelegationBtn',
                                                    iconCls: 'close',
                                                    text: 'Supprimer'
                                                }
                                            ]
                                        }
                                    ],
                                    selModel: Ext.create('Ext.selection.CheckboxModel', {
                                        checkOnly: false
                                    }),
                                    plugins: [
                                        Ext.create('Ext.grid.plugin.RowEditing', {
                                            ptype: 'rowediting',
                                            listeners: {
                                                beforeedit: {
                                                    fn: me.onGridroweditingpluginBeforeEdit,
                                                    scope: me
                                                }
                                            }
                                        })
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            title: 'Droits'
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            ACL: 'write.ui.users',
                            id: 'userAdminAdd',
                            iconCls: 'add',
                            text: 'Ajouter'
                        },
                        {
                            xtype: 'button',
                            ACL: 'write.ui.users',
                            id: 'userAdminRemove',
                            iconCls: 'close',
                            text: 'Supprimer'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onGridroweditingpluginBeforeEdit: function(editor, e, options) {
        if (!ACL.interfaceRights['write.ui.users']) {return(false);}
    }

});