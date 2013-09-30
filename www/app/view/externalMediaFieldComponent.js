/*
 * File: app/view/externalMediaFieldComponent.js
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

Ext.define('Rubedo.view.externalMediaFieldComponent', {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget.externalMediaFieldComponent',

    anchor: '90%',
    height: 54,
    width: 426,
    layout: {
        type: 'anchor'
    },
    fieldLabel: 'Label',
    labelSeparator: ' ',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textfield',
                    localiserId: 'emFieldURL',
                    anchor: '100%',
                    margin: '0 0 10 0',
                    style: '{float:left;}',
                    fieldLabel: 'URL',
                    labelSeparator: ' ',
                    name: 'url',
                    submitValue: false,
                    vtype: 'url'
                },
                {
                    xtype: 'numberfield',
                    localiserId: 'emFieldMaxWidth',
                    anchor: '50%',
                    margin: '0 10 0 0',
                    style: '{float:left;}',
                    fieldLabel: 'Largeur max',
                    labelSeparator: ' ',
                    name: 'maxWidth',
                    submitValue: false,
                    allowDecimals: false,
                    decimalPrecision: 6,
                    minValue: 0
                },
                {
                    xtype: 'numberfield',
                    localiserId: 'emFieldMAxHeight',
                    anchor: '50%',
                    fieldLabel: 'Hauteur max',
                    labelSeparator: ' ',
                    name: 'maxHeight',
                    submitValue: false,
                    allowDecimals: false,
                    decimalPrecision: 6,
                    minValue: 0
                }
            ]
        });

        me.callParent(arguments);
    }

});