/*
 * File: app/view/newMTWindow.js
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

Ext.define('Rubedo.view.newMTWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.newMTWindow',

    localiserId: 'newDamTypeWindow',
    height: 137,
    id: 'newMTWindow',
    width: 334,
    resizable: false,
    layout: {
        type: 'fit'
    },
    constrainHeader: true,
    iconCls: 'mediaTypes',
    title: 'Nouveau type de média',
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
                            xtype: 'textfield',
                            localiserId: 'newDamTypeNameField',
                            anchor: '100%',
                            fieldLabel: 'Nom ',
                            name: 'type',
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            localiserId: 'newDamTypeMainFileTypeField',
                            anchor: '100%',
                            fieldLabel: 'Type de fichier principal',
                            name: 'mainFileType',
                            allowBlank: false,
                            editable: false,
                            forceSelection: true,
                            store: [
                                'Image',
                                'Document',
                                'Video',
                                'Animation',
                                'Audio'
                            ]
                        },
                        {
                            xtype: 'button',
                            localiserId: 'newDamTypeSubmitBtn',
                            anchor: '100%',
                            id: 'createNewMTBtn',
                            text: 'Créer un nouveau type de média'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});