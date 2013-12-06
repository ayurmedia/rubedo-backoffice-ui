/*
 * File: app/view/newEmailTemplateWindow.js
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

Ext.define('Rubedo.view.newEmailTemplateWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.newEmailTemplateWindow',

    id: 'newEmailTemplateWindow',
    width: 400,
    resizable: false,
    layout: {
        type: 'fit'
    },
    iconCls: 'add',
    title: 'New email',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'combobox',
                            anchor: '100%',
                            fieldLabel: 'Type',
                            name: 'isModel',
                            value: false,
                            editable: false,
                            forceSelection: true,
                            queryMode: 'local',
                            store: [
                                [
                                    true,
                                    'Model'
                                ],
                                [
                                    false,
                                    'Mail'
                                ]
                            ],
                            listeners: {
                                change: {
                                    fn: me.onComboboxChange,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            anchor: '100%',
                            itemId: 'useModelField',
                            fieldLabel: 'Source',
                            name: 'useModel',
                            value: false,
                            allowBlank: false,
                            allowOnlyWhitespace: false,
                            editable: false,
                            forceSelection: true,
                            queryMode: 'local',
                            store: [
                                [
                                    true,
                                    'From model'
                                ],
                                [
                                    false,
                                    'Blank'
                                ]
                            ],
                            listeners: {
                                change: {
                                    fn: me.onUseModelFieldChange,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            anchor: '100%',
                            hidden: true,
                            itemId: 'modelField',
                            fieldLabel: 'Model',
                            name: 'model',
                            editable: false,
                            forceSelection: true,
                            store: 'EmailModels',
                            valueField: 'id'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: 'Name',
                            name: 'text',
                            allowBlank: false,
                            allowOnlyWhitespace: false
                        },
                        {
                            xtype: 'numberfield',
                            anchor: '100%',
                            itemId: 'widthField',
                            fieldLabel: 'Width',
                            name: 'bodyWidth',
                            allowBlank: false,
                            allowOnlyWhitespace: false,
                            allowDecimals: false,
                            allowExponential: false,
                            minValue: 10
                        },
                        {
                            xtype: 'button',
                            anchor: '1',
                            id: 'newETSubmitBtn',
                            text: 'Create this new template'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onComboboxChange: function(field, newValue, oldValue, eOpts) {
        if (newValue==true){
            field.up().getComponent("useModelField").setValue(false);
            field.up().getComponent("useModelField").hide();
        } else {
            field.up().getComponent("useModelField").show();
        }
    },

    onUseModelFieldChange: function(field, newValue, oldValue, eOpts) {
        if (newValue){
            field.up().getComponent("modelField").show();
            field.up().getComponent("modelField").allowBlank=false;
            field.up().getComponent("widthField").hide();
            field.up().getComponent("widthField").allowBlank=true;
        } else {
            field.up().getComponent("modelField").hide();
            field.up().getComponent("modelField").allowBlank=true;
            field.up().getComponent("widthField").show();
            field.up().getComponent("widthField").allowBlank=false;
        }
    }

});