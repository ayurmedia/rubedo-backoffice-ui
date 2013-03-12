/*
 * File: app/view/adminFUtilisateurs.js
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

Ext.define('Rubedo.view.adminFUtilisateurs', {
    extend: 'Ext.window.Window',
    alias: 'widget.adminFUtilisateurs',

    requires: [
        'Rubedo.view.WorkspaceCombo'
    ],

    height: 578,
    id: 'adminFUtilisateurs',
    width: 1000,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },
    iconCls: 'user',
    title: 'Groupes',
    constrainHeader: true,

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
                            itemId: 'origine',
                            iconCls: 'user',
                            text: 'Groupes <b>></b> '
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
                            margin: '0 0 0 10',
                            styleHtmlContent: true,
                            tpl: [
                                '<p> <b> {name} </b> {userNb} {calif} </p>'
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
                            ACL: 'write.ui.groups',
                            id: 'groupAddButton',
                            iconAlign: 'top',
                            iconCls: 'add_big',
                            scale: 'large',
                            text: 'Ajouter'
                        },
                        {
                            xtype: 'button',
                            ACL: 'write.ui.groups',
                            disabled: true,
                            id: 'groupDeleteButton',
                            iconAlign: 'top',
                            iconCls: 'remove_big',
                            scale: 'large',
                            text: 'Supprimer'
                        },
                        {
                            xtype: 'button',
                            ACL: 'write.ui.groups',
                            disabled: true,
                            id: 'groupSaveButton',
                            iconAlign: 'top',
                            iconCls: 'floppy_disc_big',
                            scale: 'large',
                            text: 'Enregistrer',
                            listeners: {
                                click: {
                                    fn: me.onGroupSaveButtonClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'buttongroup',
                            ACL: 'write.ui.groups',
                            disabled: true,
                            header: true,
                            headerPosition: 'bottom',
                            overlapHeader: false,
                            title: 'Edition',
                            columns: 2,
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'userAddButton',
                                    iconAlign: 'top',
                                    iconCls: 'user_add_big',
                                    scale: 'large',
                                    text: 'Ajouter'
                                },
                                {
                                    xtype: 'button',
                                    id: 'userRemoveButton',
                                    iconAlign: 'top',
                                    iconCls: 'user_remove_big',
                                    scale: 'large',
                                    text: 'Supprimer'
                                }
                            ]
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            RApplication: 'groups',
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
                    xtype: 'treepanel',
                    flex: 0.4,
                    id: 'groupsGrid',
                    title: '',
                    hideHeaders: false,
                    store: 'GroupsDataStore',
                    displayField: 'name',
                    folderSort: false,
                    rootVisible: false,
                    singleExpand: false,
                    useArrows: true,
                    viewConfig: {
                        plugins: [
                            Ext.create('Ext.tree.plugin.TreeViewDragDrop', {
                                ptype: 'treeviewdragdrop',
                                dragText: '{0} groupe{1} séléctionné{1}'
                            })
                        ],
                        listeners: {
                            beforedrop: {
                                fn: me.onTreedragdroppluginBeforeDrop,
                                scope: me
                            },
                            drop: {
                                fn: me.onTreedragdroppluginDrop,
                                scope: me
                            }
                        }
                    },
                    columns: [
                        {
                            xtype: 'treecolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (record.isRoot()){
                                    return("<i style=\"color:#777;\">Racine</i>");
                                } else {
                                    var returner = value;
                                    if (record.get("readOnly")){
                                        record.data.allowDrop=false;
                                        record.data.allowDrag=false;
                                        returner ="<i style=\"color:#777;\">"+value+"</i>";
                                    }
                                    return ('<img src="resources/icones/'+MyPrefData.iconsDir+'/16x16/users.png"> '+value);
                                }
                            },
                            dataIndex: 'name',
                            flex: 1,
                            text: 'Nom'
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',
                    flex: 1,
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'fit'
                            },
                            title: 'Utilisateurs',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'UsersInGroupGrid',
                                    title: '',
                                    store: 'UsersGroupStore',
                                    viewConfig: {

                                    },
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'name',
                                            flex: 1,
                                            text: 'Nom'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'email',
                                            flex: 1,
                                            text: 'Email'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'mobile',
                                            flex: 1,
                                            text: 'Téléphone'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'login',
                                            flex: 1,
                                            text: 'Adresse'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'post',
                                            flex: 1,
                                            text: 'Poste'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'organisation',
                                            flex: 1,
                                            text: 'Département'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            hidden: true,
                                            dataIndex: 'defaultGroup',
                                            flex: 1,
                                            text: 'Groupes'
                                        },
                                        {
                                            xtype: 'datecolumn',
                                            hidden: true,
                                            dataIndex: 'createTime',
                                            flex: 1,
                                            text: 'Création'
                                        },
                                        {
                                            xtype: 'datecolumn',
                                            hidden: true,
                                            dataIndex: 'updateTime',
                                            flex: 1,
                                            text: 'Dernière modification'
                                        }
                                    ],
                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                    }),
                                    listeners: {
                                        destroy: {
                                            fn: me.onUsersInGroupGridDestroy,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'form',
                            id: 'groupPropsForm',
                            autoScroll: true,
                            bodyPadding: 10,
                            title: 'Droits',
                            items: [
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    name: 'name',
                                    fieldLabel: 'Nom ',
                                    labelWidth: 220,
                                    allowBlank: false
                                },
                                {
                                    xtype: 'WorkspaceCombo',
                                    notAutomatic: true,
                                    name: 'readWorkspaces',
                                    fieldLabel: 'Espaces de travail en lecture seule',
                                    labelWidth: 220,
                                    multiSelect: true,
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'WorkspaceCombo',
                                    notAutomatic: true,
                                    name: 'writeWorkspaces',
                                    fieldLabel: 'Espaces de travail en contribution',
                                    labelWidth: 220,
                                    multiSelect: true,
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'WorkspaceCombo',
                                    notAutomatic: true,
                                    name: 'defaultWorkspace',
                                    fieldLabel: 'Espaces de travail par défaut',
                                    labelWidth: 220,
                                    multiSelect: false,
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    name: 'canDeleteElements',
                                    fieldLabel: 'Peut supprimer des éléments',
                                    labelWidth: 220,
                                    boxLabel: '',
                                    inputValue: 'true'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    name: 'canWriteUnownedElements',
                                    fieldLabel: 'Peut modifier les éléments des autres utilisateurs',
                                    labelWidth: 220,
                                    boxLabel: '',
                                    inputValue: 'true'
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                render: {
                    fn: me.onAdminFUtilisateursRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onAdminFUtilisateursBeforeClose,
                    scope: me
                },
                afterrender: {
                    fn: me.onAdminFUtilisateursAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onImageRender: function(abstractcomponent, options) {
        abstractcomponent.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/users.png');
    },

    onGroupSaveButtonClick: function(button, e, options) {
        var form =Ext.getCmp("groupPropsForm").getForm();
        if (form.isValid()){
            var record =Ext.getCmp("groupsGrid").getSelectionModel().getLastSelected();
            record.set(form.getValues());
        }
    },

    onTreedragdroppluginBeforeDrop: function(node, data, overModel, dropPosition, dropFunction, options) {
        if (!ACL.interfaceRights['write.ui.groups']){return(false);}
        Ext.getCmp("groupsGrid").getStore().suspendAutoSync();
        var movedOne=data.records[0];


        if (dropPosition=="before"){
            if ((movedOne.parentNode!=overModel.parentNode)&&(movedOne.parentNode.childNodes.length==1)){
                movedOne.parentNode.set("expandable", false);
            }

        } else if (dropPosition=="after"){
            if ((movedOne.parentNode!=overModel.parentNode)&&(movedOne.parentNode.childNodes.length==1)){
                movedOne.parentNode.set("expandable", false);
            }

        } else if (dropPosition=="append"){
            if (movedOne.parentNode.childNodes.length==1){
                movedOne.parentNode.set("expandable", false);
            }

            if (overModel.hasChildNodes()){

            } else {
                overModel.set("expandable", true);
            }
        }
    },

    onTreedragdroppluginDrop: function(node, data, overModel, dropPosition, options) {
        var task= new Ext.util.DelayedTask(function(){
            Ext.getCmp("groupsGrid").getStore().resumeAutoSync();
            Ext.getCmp("groupsGrid").getStore().sync();
        });
        task.delay(50);
    },

    onUsersInGroupGridDestroy: function(abstractcomponent, options) {
        abstractcomponent.getStore().removeAll();
    },

    onAdminFUtilisateursRender: function(abstractcomponent, options) {
        Ext.getStore("RoleStore").load();
        Ext.getStore("UsersDataStore").load();
    },

    onAdminFUtilisateursBeforeClose: function(panel, options) {
        Ext.getStore("RoleStore").removeAll();
        Ext.getStore("UsersDataStore").removeAll();
    },

    onAdminFUtilisateursAfterRender: function(abstractcomponent, options) {
        var rolePicker = Ext.create("Ext.ux.form.field.BoxSelect", {
            store:Ext.getStore("RoleStore"),
            anchor:"100%",
            name:"roles",
            fieldLabel:"Roles",
            labelWidth:220,
            queryMode:"local",
            multiSelect:true,
            valueField:"id",
            displayField:"label",
            forceSelection:true,
            createNewOnEnter:true,
            triggerOnClick:false,
            createNewOnBlur:true,
            stacked:true,
            allowBlank:true

        });
        Ext.getCmp("groupPropsForm").add(rolePicker);
    }

});