/*
 * File: app/view/sitesRepLoc.js
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

Ext.define('Rubedo.view.sitesRepLoc', {
    extend: 'Ext.form.Panel',
    alias: 'widget.sitesRepLoc',

    bodyPadding: 10,
    title: '',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    localiserId: 'siteFieldSet',
                    collapsible: true,
                    title: 'Site',
                    items: [
                        {
                            xtype: 'textfield',
                            localiserId: 'siteDefaultTitleField',
                            anchor: '100%',
                            fieldLabel: 'Titre par défaut',
                            labelWidth: 110,
                            name: 'title'
                        },
                        {
                            xtype: 'textareafield',
                            localiserId: 'defaultDescriptionField',
                            anchor: '100%',
                            fieldLabel: 'Description par défaut',
                            labelWidth: 110,
                            name: 'description',
                            maxLength: 250
                        },
                        {
                            xtype: 'textfield',
                            localiserId: 'defaultAuthorField',
                            anchor: '100%',
                            fieldLabel: 'Auteur par défaut',
                            labelWidth: 110,
                            name: 'author',
                            value: 'Powered by Rubedo'
                        }
                    ],
                    listeners: {
                        added: {
                            fn: me.onFieldsetAdded,
                            scope: me
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    onFieldsetAdded: function(component, container, pos, eOpts) {
        var tagPicker = Ext.create("Ext.ux.form.field.BoxSelect", {
            store:[],
            anchor:"100%",
            name:"keywords",
            labelWidth:110,
            fieldLabel:Rubedo.RubedoAutomatedElementsLoc.defaultKeywordsText,
            multiSelect:true,
            forceSelection:false,
            createNewOnEnter:true,
            hideTrigger:true,
            triggerOnClick:false,
            createNewOnBlur:true,
            pinList:false
        });
        component.add(tagPicker);
    }

});