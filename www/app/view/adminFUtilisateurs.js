/*
 * File: app/view/adminFUtilisateurs.js
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

Ext.define('Rubedo.view.adminFUtilisateurs', {
    extend: 'Ext.window.Window',
    alias: 'widget.adminFUtilisateurs',

    requires: [
        'Rubedo.view.WorkspaceCombo'
    ],

    localiserId: 'groupsWindow',
    height: 578,
    id: 'adminFUtilisateurs',
    width: 1000,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },
    constrainHeader: true,
    iconCls: 'user',
    title: 'Groupes',

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
                            localiserId: 'groupsLaunchBtn',
                            itemId: 'origine',
                            iconCls: 'user',
                            text: 'Groupes '
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
                            localiserId: 'addBtn',
                            id: 'groupAddButton',
                            iconAlign: 'top',
                            iconCls: 'add_big',
                            scale: 'large',
                            text: 'Ajouter'
                        },
                        {
                            xtype: 'button',
                            ACL: 'write.ui.groups',
                            localiserId: 'removeBtn',
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
                            localiserId: 'saveBtn',
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
                                },
                                afterrender: {
                                    fn: me.onGroupSaveButtonAfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'buttongroup',
                            ACL: 'write.ui.groups',
                            localiserId: 'editGroup',
                            disabled: true,
                            headerPosition: 'bottom',
                            overlapHeader: false,
                            title: 'Edition',
                            columns: 2,
                            items: [
                                {
                                    xtype: 'button',
                                    localiserId: 'addBtn',
                                    id: 'userAddButton',
                                    iconAlign: 'top',
                                    iconCls: 'user_add_big',
                                    scale: 'large',
                                    text: 'Ajouter'
                                },
                                {
                                    xtype: 'button',
                                    localiserId: 'removeBtn',
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
                    useArrows: true,
                    viewConfig: {
                        plugins: [
                            Ext.create('Ext.tree.plugin.TreeViewDragDrop', {
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
                            localiserId: 'nameCol',
                            dataIndex: 'name',
                            text: 'Nom',
                            flex: 1
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
                            tabConfig: {
                                xtype: 'tab',
                                localiserId: 'userTab'
                            },
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'UsersInGroupGrid',
                                    title: '',
                                    store: 'UsersGroupStore',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            localiserId: 'nameColumn',
                                            dataIndex: 'name',
                                            text: 'Nom',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            localiserId: 'mailColumn',
                                            dataIndex: 'email',
                                            text: 'Email',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            localiserId: 'phoneColumn',
                                            dataIndex: 'mobile',
                                            text: 'Téléphone',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            localiserId: 'addressColumn',
                                            dataIndex: 'coordinates',
                                            text: 'Adresse',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            localiserId: 'postColumn',
                                            dataIndex: 'post',
                                            text: 'Poste',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            localiserId: 'departmentColumn',
                                            dataIndex: 'organisation',
                                            text: 'Département',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            hidden: true,
                                            dataIndex: 'defaultGroup',
                                            text: 'Groupes',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'datecolumn',
                                            hidden: true,
                                            dataIndex: 'createTime',
                                            text: 'Création',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'datecolumn',
                                            hidden: true,
                                            dataIndex: 'updateTime',
                                            text: 'Dernière modification',
                                            flex: 1
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
                            tabConfig: {
                                xtype: 'tab',
                                localiserId: 'rightsTab'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    localiserId: 'nameField',
                                    anchor: '100%',
                                    fieldLabel: 'Nom ',
                                    labelWidth: 220,
                                    name: 'name',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'WorkspaceCombo',
                                    notAutomatic: true,
                                    localiserId: 'readWorkSpaceField',
                                    fieldLabel: 'Espaces de travail en lecture ',
                                    labelWidth: 220,
                                    name: 'readWorkspaces',
                                    multiSelect: true,
                                    store: 'WorkspacesComboWithAll',
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'WorkspaceCombo',
                                    notAutomatic: true,
                                    localiserId: 'writeWorkspaceField',
                                    fieldLabel: 'Espaces de travail en contribution',
                                    labelWidth: 220,
                                    name: 'writeWorkspaces',
                                    multiSelect: true,
                                    store: 'WorkspacesComboWithAll',
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'WorkspaceCombo',
                                    notAutomatic: true,
                                    localiserId: 'defaultWorkspaceField',
                                    fieldLabel: 'Espace de travail par défaut',
                                    labelWidth: 220,
                                    name: 'defaultWorkspace',
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    hidden: true,
                                    fieldLabel: 'Peut supprimer des éléments',
                                    labelWidth: 220,
                                    name: 'canDeleteElements',
                                    boxLabel: '',
                                    inputValue: 'true'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    hidden: true,
                                    fieldLabel: 'Peut modifier les éléments des autres utilisateurs',
                                    labelWidth: 220,
                                    name: 'canWriteUnownedElements',
                                    boxLabel: '',
                                    inputValue: 'true'
                                }
                            ]
                        },
                        {
                            xtype: 'form',
                            ACL: 'admin.ui.groups',
                            id: 'groupAdminPropsForm',
                            bodyPadding: 10,
                            title: 'Administration',
                            tabConfig: {
                                xtype: 'tab',
                                ACL: 'admin.ui.groups',
                                localiserId: 'adminTab'
                            },
                            items: [
                                {
                                    xtype: 'WorkspaceCombo',
                                    notAutomatic: true,
                                    labelWidth: 220,
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    localiserId: 'inheritWorkspaceField',
                                    anchor: '100%',
                                    fieldLabel: 'Hérite de l\'espace de travail',
                                    labelWidth: 220,
                                    name: 'inheritWorkspace',
                                    boxLabel: '',
                                    inputValue: 'true',
                                    listeners: {
                                        change: {
                                            fn: me.onCheckboxfieldChange1,
                                            scope: me
                                        }
                                    }
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

    onImageRender: function(component, eOpts) {
        component.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/users.png');
    },

    onGroupSaveButtonClick: function(button, e, eOpts) {
        var form =Ext.getCmp("groupPropsForm").getForm();
        var form2 =Ext.getCmp("groupAdminPropsForm").getForm();
        if ((form.isValid())&&(form2.isValid())){
            var record =Ext.getCmp("groupsGrid").getSelectionModel().getLastSelected();
            record.beginEdit();
            record.set(form.getValues());
            record.set(form2.getValues());
            record.endEdit();
        }
    },

    onGroupSaveButtonAfterRender: function(component, eOpts) {
        component.findParentByType("window").getEl().addKeyListener({key:"s", ctrl:true}, function(e,t){
        if (!component.disabled){
            component.fireEvent("click", component);
            t.stopEvent();
        }
    });
    },

    onTreedragdroppluginBeforeDrop: function(node, data, overModel, dropPosition, dropHandlers, eOpts) {
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

    onTreedragdroppluginDrop: function(node, data, overModel, dropPosition, eOpts) {
        var task= new Ext.util.DelayedTask(function(){
            Ext.getCmp("groupsGrid").getStore().resumeAutoSync();
            Ext.getCmp("groupsGrid").getStore().sync();
        });
        task.delay(50);
    },

    onUsersInGroupGridDestroy: function(component, eOpts) {
        component.getStore().removeAll();
    },

    onCheckboxfieldChange1: function(field, newValue, oldValue, eOpts) {
        if (newValue) {
            field.previousSibling().setReadOnly(true);
            field.previousSibling().setValue(null);
        }else {
            field.previousSibling().setReadOnly(false);
        }
    },

    onAdminFUtilisateursRender: function(component, eOpts) {
        Ext.getStore("RoleStore").load();
        Ext.getStore("UsersDataStore").load();
    },

    onAdminFUtilisateursBeforeClose: function(panel, eOpts) {
        Ext.getStore("RoleStore").removeAll();
        Ext.getStore("UsersDataStore").removeAll();
    },

    onAdminFUtilisateursAfterRender: function(component, eOpts) {
        var rolePicker = Ext.create("Ext.ux.form.field.BoxSelect", {
            store:Ext.getStore("RoleStore"),
            anchor:"100%",
            name:"roles",
            fieldLabel:Rubedo.RubedoAutomatedElementsLoc.rolesText,
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