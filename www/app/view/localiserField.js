/*
 * File: app/view/localiserField.js
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

Ext.define('Rubedo.view.localiserField', {
    extend: 'Ext.form.field.Hidden',
    alias: 'widget.localiserField',

    fieldLabel: 'Label',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            listeners: {
                render: {
                    fn: me.onHiddenfieldRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onHiddenfieldRender: function(abstractcomponent, options) {
        var companion = Ext.widget("localiserFieldComponent");
        companion.setFieldLabel(abstractcomponent.getFieldLabel());
        abstractcomponent.on("change", function(a, newValue){
            var decoded = { };
            if (!Ext.isEmpty(newValue)){
                decoded = Ext.JSON.decode(newValue);
            }
            Ext.Array.forEach(companion.query("field"), function(field){
                field.suspendEvents(false);
                field.setValue(decoded[field.name]);
                field.resumeEvents();
            });
        });
        Ext.Array.forEach(companion.query("field"), function(field){
            field.on("change", function(a, newValue){
                abstractcomponent.suspendEvents(false);
                var decoded = { };
                if (!Ext.isEmpty(abstractcomponent.getValue())) {
                    decoded = Ext.JSON.decode(abstractcomponent.getValue());
                }
                decoded[field.name]=newValue;
                abstractcomponent.setValue(Ext.JSON.encode(decoded));
                abstractcomponent.resumeEvents();
            });
        });
        companion.on("afterrender",function(){
            companion.getEl().on("click",function(){

                abstractcomponent.getEl().dom.click();
            });
        });
        abstractcomponent.up().add(companion);
    }

});