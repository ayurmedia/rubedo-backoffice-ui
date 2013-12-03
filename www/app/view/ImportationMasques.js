/*
 * File: app/view/ImportationMasques.js
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

Ext.define('Rubedo.view.ImportationMasques', {
    extend: 'Ext.window.Window',
    alias: 'widget.importationMasques',

    height: 107,
    width: 300,
    layout: {
        type: 'fit'
    },
    iconCls: 'arrow_up',
    title: 'Importation de masque',
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
                            xtype: 'filefield',
                            anchor: '100%',
                            fieldLabel: '',
                            buttonText: 'Choisir'
                        },
                        {
                            xtype: 'button',
                            anchor: '100%',
                            text: 'Importer'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});