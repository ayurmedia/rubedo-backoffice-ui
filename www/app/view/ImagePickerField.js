/*
 * File: app/view/ImagePickerField.js
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

Ext.define('Rubedo.view.ImagePickerField', {
    extend: 'Ext.form.field.Hidden',
    alias: 'widget.ImagePickerField',

    height: 0,
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

    onHiddenfieldRender: function(component, eOpts) {
        var icDir="blue";
        if (typeof(MyPrefData)!="undefined"){
            icDir=MyPrefData.iconsDir;
        }
        if (component.smallMode) {
            var myComponent = Ext.widget("ImageFieldComponentSmall");
        } else {
            var myComponent = Ext.widget("ImageFieldComponent");
        }
        myComponent.getComponent(0).setText(component.fieldLabel+" ");
        myComponent.on("afterrender",function(){
            if (Ext.isEmpty(component.getValue())){
                myComponent.getComponent("fieldImagePreview").setSrc("resources/icones/"+icDir+"/128x128/image_remove.png");
                myComponent.getComponent("buttonHolder").getComponent("fieldClearImage").hide();
            } else {
                myComponent.getComponent("fieldImagePreview").setSrc("dam/get-thumbnail?id="+component.getValue());
                myComponent.getComponent("buttonHolder").getComponent("fieldClearImage").show();
            }
            myComponent.getEl().on("click",function(){

                component.getEl().dom.click();
            });
        });
        component.up().add(myComponent);
        myComponent.getComponent("buttonHolder").getComponent("fieldChangeImage").on("click",function(){
            Ext.widget("ImagePickerWindow",{targetField:component.id}).show();
        });
        myComponent.getComponent("buttonHolder").getComponent("fieldClearImage").on("click",function(){
            component.setValue(null);
        });
        component.on("change",function(theField,newValue){
            if ((newValue==="")||(Ext.isEmpty(newValue))){
                myComponent.getComponent("fieldImagePreview").setSrc("resources/icones/"+icDir+"/128x128/image_remove.png");
                myComponent.getComponent("buttonHolder").getComponent("fieldClearImage").hide();
            } else {
                myComponent.getComponent("fieldImagePreview").setSrc("dam/get-thumbnail?id="+newValue);
                myComponent.getComponent("buttonHolder").getComponent("fieldClearImage").show();
            }
        });
    }

});