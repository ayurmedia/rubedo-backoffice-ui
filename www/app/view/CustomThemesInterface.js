/*
 * File: app/view/CustomThemesInterface.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
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

Ext.define('Rubedo.view.CustomThemesInterface', {
    extend: 'Ext.window.Window',
    alias: 'widget.CustomThemesInterface',

    requires: [
        'Rubedo.view.MyTool16',
        'Rubedo.view.MyTool17',
        'Rubedo.view.AdvancedColorField'
    ],

    height: 600,
    id: 'CustomThemesInterface',
    width: 1200,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },
    iconCls: 'palette',
    title: 'Custom Themes',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            ACL: 'write.ui.customThemes',
                            localiserId: 'addBtn',
                            id: 'customThemesAddBtn',
                            iconAlign: 'top',
                            iconCls: 'add_big',
                            scale: 'large',
                            text: 'Ajouter'
                        },
                        {
                            xtype: 'button',
                            ACL: 'write.ui.customThemes',
                            localiserId: 'removeBtn',
                            disabled: true,
                            id: 'customThemesRemoveBtn',
                            iconAlign: 'top',
                            iconCls: 'remove_big',
                            scale: 'large',
                            text: 'Supprimer'
                        },
                        {
                            xtype: 'button',
                            ACL: 'write.ui.customThemes',
                            localiserId: 'saveBtn',
                            disabled: true,
                            id: 'customThemesSaveBtn',
                            iconAlign: 'top',
                            iconCls: 'floppy_disc_big',
                            scale: 'large',
                            text: 'Enregistrer',
                            listeners: {
                                afterrender: {
                                    fn: me.onWorkspaceSaveAfterRender1,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            disabled: true,
                            id: 'simulateCustomThemeBtn',
                            iconAlign: 'top',
                            iconCls: 'play_big',
                            scale: 'large',
                            text: 'Simulate'
                        },
                        {
                            xtype: 'tbfill'
                        }
                    ]
                }
            ],
            tools: [
                {
                    xtype: 'mytool16'
                },
                {
                    xtype: 'mytool17'
                }
            ],
            items: [
                {
                    xtype: 'gridpanel',
                    id: 'customThemesGrid',
                    width: 180,
                    collapseDirection: 'left',
                    collapsible: true,
                    title: 'Themes',
                    forceFit: true,
                    store: 'CustomThemes',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'name',
                            text: 'Name',
                            editor: {
                                xtype: 'textfield',
                                allowBlank: false
                            }
                        }
                    ],
                    plugins: [
                        Ext.create('Ext.grid.plugin.CellEditing', {
                            listeners: {
                                beforeedit: {
                                    fn: me.onCellEditingBeforeEdit,
                                    scope: me
                                }
                            }
                        })
                    ]
                },
                {
                    xtype: 'form',
                    disabled: true,
                    id: 'mainLessVarsForm',
                    width: 300,
                    autoScroll: true,
                    layout: {
                        type: 'auto'
                    },
                    bodyPadding: 10,
                    collapseDirection: 'left',
                    collapsible: true,
                    title: 'Less Varaibles',
                    items: [
                        {
                            xtype: 'fieldset',
                            id: 'customThemesMainGraysBox',
                            title: 'Grays',
                            items: [
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Black',
                                    name: 'black'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Darker gray',
                                    name: 'grayDarker'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Dark gray',
                                    name: 'grayDark'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Gray',
                                    name: 'gray'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Light gray',
                                    name: 'grayLight'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Lighter gray',
                                    name: 'grayLighter'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'White',
                                    name: 'white'
                                },
                                {
                                    xtype: 'button',
                                    anchor: '100%',
                                    id: 'randomizeBaseThemeColorsBtn',
                                    margin: '0 0 6 0',
                                    text: 'Randomize base colors'
                                },
                                {
                                    xtype: 'button',
                                    anchor: '50%',
                                    id: 'randomizeBaseThemeColorsBOBtn',
                                    margin: '0 6 0 0',
                                    style: '{float:left;}',
                                    text: 'Randomize based on'
                                },
                                {
                                    xtype: 'combobox',
                                    anchor: '50%',
                                    id: 'colorSuggestionCombo',
                                    margin: '',
                                    editable: false,
                                    forceSelection: true,
                                    multiSelect: true,
                                    store: [
                                        'red',
                                        'orange',
                                        'yellow',
                                        'green',
                                        'aqua',
                                        'blue',
                                        'violet',
                                        'fuchsia'
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Accent colors',
                            items: [
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Blue',
                                    name: 'blue'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Dark blue',
                                    name: 'blueDark'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Green',
                                    name: 'green'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Red',
                                    name: 'red'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Yellow',
                                    name: 'yellow'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Orange',
                                    name: 'orange'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Pink',
                                    name: 'pink'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Purlple',
                                    name: 'purple'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Links',
                            items: [
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Link color',
                                    name: 'linkColor'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Tables',
                            items: [
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Background accent',
                                    name: 'tableBackgroundAccent'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Background hover',
                                    name: 'tableBackgroundHover'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Border',
                                    name: 'tableBorder'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Buttons',
                            items: [
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Border',
                                    name: 'btnBorder'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Info background',
                                    name: 'btnInfoBackground'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Info background highlight',
                                    name: 'btnInfoBackgroundHighlight'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Success background',
                                    name: 'btnSuccessBackground'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Success background highlight',
                                    name: 'btnSuccessBackgroundHighlight'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Danger background',
                                    name: 'btnDangerBackground'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Danger background highlight',
                                    name: 'btnDangerBackgroundHighlight'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Inverse background',
                                    name: 'btnInverseBackground'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Forms',
                            items: [
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Input border',
                                    name: 'inputBorder'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Actions background',
                                    name: 'formActionsBackground'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Dropdowns',
                            items: [
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Top divider',
                                    name: 'dropdownDividerTop'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Wells',
                            items: [
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Background',
                                    name: 'wellBackground'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Navbar',
                            items: [
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Background highlight',
                                    name: 'navbarBackgroundHighlight'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Text',
                                    name: 'navbarText'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Link',
                                    name: 'navbarLinkColor'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Inverted navbar',
                            items: [
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Background',
                                    name: 'navbarInverseBackground'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Background highlight',
                                    name: 'navbarInverseBackgroundHighlight'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Border',
                                    name: 'navbarInverseBorder'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Search placeholder',
                                    name: 'navbarInverseSearchPlaceholderColor'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Pagination',
                            items: [
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Background',
                                    name: 'paginationBackground'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Border',
                                    name: 'paginationBorder'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Active background',
                                    name: 'paginationActiveBackground'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Form states and alerts',
                            items: [
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Warning text',
                                    name: 'warningText'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Warning background',
                                    name: 'warningBackground'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Error text',
                                    name: 'errorText'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Error background',
                                    name: 'errorBackground'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Success text',
                                    name: 'successText'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Success background',
                                    name: 'successBackground'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Info text',
                                    name: 'infoText'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Info background',
                                    name: 'infoBackground'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Tooltips and popovers',
                            items: [
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Tooltip color',
                                    name: 'tooltipColor'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Tooltip background',
                                    name: 'tooltipBackground'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Popover background',
                                    name: 'popoverBackground'
                                },
                                {
                                    xtype: 'AdvancedColorField',
                                    fieldLabel: 'Popover arrow color',
                                    name: 'popoverArrowColor'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Typography',
                            items: [
                                {
                                    xtype: 'textareafield',
                                    fieldLabel: 'Sans font family',
                                    name: 'sansFontFamily'
                                },
                                {
                                    xtype: 'textareafield',
                                    fieldLabel: 'Serif font family',
                                    name: 'serifFontFamily'
                                },
                                {
                                    xtype: 'textareafield',
                                    fieldLabel: 'Mono font family',
                                    name: 'monoFontFamily'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Base font size',
                                    name: 'baseFontSize'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Base line height',
                                    name: 'baseLineHeight'
                                },
                                {
                                    xtype: 'textareafield',
                                    fieldLabel: 'Heading font family',
                                    name: 'headingsFontFamily'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Heading font weight',
                                    name: 'headingsFontWeight'
                                },
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'H1 proportion',
                                    name: 'headingH1Multiplier',
                                    minValue: 0,
                                    step: 0.25
                                },
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'H2 proportion',
                                    name: 'headingH2Multiplier',
                                    minValue: 0,
                                    step: 0.25
                                },
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'H3 proportion',
                                    name: 'headingH3Multiplier',
                                    minValue: 0,
                                    step: 0.25
                                },
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'H4 proportion',
                                    name: 'headingH4Multiplier',
                                    minValue: 0,
                                    step: 0.25
                                },
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'H5 proportion',
                                    name: 'headingH5Multiplier',
                                    minValue: 0,
                                    step: 0.25
                                },
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'H6 proportion',
                                    name: 'headingH6Multiplier',
                                    allowBlank: false,
                                    minValue: 0,
                                    step: 0.25
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    disabled: true,
                    id: 'themeSimulatorHolder',
                    layout: {
                        type: 'fit'
                    },
                    listeners: {
                        afterrender: {
                            fn: me.onThemeSimulatorHolderAfterRender,
                            scope: me
                        }
                    }
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onCustomThemesInterfaceAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onCustomThemesInterfaceBeforeClose,
                    scope: me
                },
                beforerender: {
                    fn: me.onCustomThemesInterfaceBeforeRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onWorkspaceSaveAfterRender1: function(component, eOpts) {
        component.findParentByType("window").getEl().addKeyListener({key:"s", ctrl:true}, function(e,t){
        if (!component.disabled){
            component.fireEvent("click", component);
            t.stopEvent();
        }
    });
    },

    onCellEditingBeforeEdit: function(editor, e, eOpts) {
        if (!ACL.interfaceRights["write.ui.customThemes"]){
            return(false);
        }
    },

    onThemeSimulatorHolderAfterRender: function(component, eOpts) {
        var task = new Ext.util.DelayedTask(function(){
            var holder=Ext.widget("panel", {title:"Theme Preview", autoScroll:false});
            component.add(holder);
            var addHtml='<iframe id="themeSimulatorFrame" type="text/html" width="100%" height="100%" src="resources/themesimulator/testpage/index.html" frameborder="0"></iframe>';
            holder.update(addHtml);
        });
        task.delay(1000);
    },

    onCustomThemesInterfaceAfterRender: function(component, eOpts) {
        Ext.getStore("CustomThemes").load();
    },

    onCustomThemesInterfaceBeforeClose: function(panel, eOpts) {
        Ext.getStore("CustomThemes").removeAll();
    },

    onCustomThemesInterfaceBeforeRender: function(component, eOpts) {
        Ext.require("resources/colorPicker/colorPicker_src");
    }

});