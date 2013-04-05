/*
 * File: app/controller/ACLController.js
 *
 * This file was generated by Sencha Architect version 2.2.0.
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

Ext.define('Rubedo.controller.ACLController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.ACLController',

    onComponentRender: function(component, eOpts) {
        if (!Ext.isEmpty(component.ACL)) {   
            if (ACL.interfaceRights[component.ACL]===false){
                component.hide();
                component.clearListeners();
                component.fireEvent=Ext.emptyFn;
            }
        }
    },

    init: function(application) {
        Ext.define('ACL', {
            singleton:true,
            CSRFToken:"notYetSet",
            interfaceRights:{
                "read.ui.taxonomy":false,
                "write.ui.taxonomy":false,
                "write.ui.taxonomyTerms":false,
                "read.ui.contentTypes":false,
                "write.ui.contentTypes":false,
                "read.ui.contents":false,
                "write.ui.contents":false,
                "read.ui.contents.draft":false,
                "read.ui.contents.pending":false,
                "read.ui.contents.published":false,
                "write.ui.contents.draft":false,
                "write.ui.contents.pending":false,
                "write.ui.contents.published":false,
                "write.ui.contents.draftToPending":false,
                "write.ui.contents.pendingToDraft":false,
                "write.ui.contents.pendingToPublished":false,
                "write.ui.contents.putOnline":false,
                "write.ui.contents.putOffline":false,
                "read.ui.masks":false,
                "write.ui.masks":false,
                "read.ui.users":false,
                "write.ui.users":false,
                "read.ui.sites":false,
                "write.ui.sites":false,
                "read.ui.pages":false,
                "write.ui.pages":false,
                "read.ui.dam":false,
                "write.ui.dam":false,
                "read.ui.damTypes":false,
                "write.ui.damTypes":false,
                "read.ui.workspaces":false,
                "write.ui.workspaces":false,
                "read.ui.queries":false,
                "write.ui.queries":false,
                "read.ui.technicalDashboard":false,
                "execute.ui.technicalDashboard":false,
                "read.ui.groups":false,
                "write.ui.groups":false,
                "read.ui.workflows":false,
                "write.ui.workflows":false,
                "exe.ui.elasticSearch":false,
                "read.ui.dependantTypes":false,
                "write.ui.dependantTypes":false,
                "read.ui.forms":false,
                "write.ui.forms":false,
                "admin.ui.groups":false
            }
        });
        Ext.Ajax.on("beforerequest", function(conn, options){
            if (Ext.isEmpty(options.params)){
                options.params={};
            }
            options.params.token=ACL.CSRFToken;
        });

        this.control({
            "component": {
                render: this.onComponentRender
            }
        });
    },

    onLaunch: function() {
        var me=this;
        Ext.Ajax.request({
            url:'current-user/get-token',
            params:{
            },
            success:function(response){
                ACL.CSRFToken=Ext.JSON.decode(response.responseText).token;
            },
            failure:function(){
                Ext.Msg.alert('Erreur', 'Erreur dans la récupération du jeton de sécurité');
            }
        });
        Ext.Ajax.request({
            url:'acl',
            params:{
                data: Ext.JSON.encode(ACL.interfaceRights)
            },
            success:function(response){
                ACL.interfaceRights=Ext.JSON.decode(response.responseText);
                Ext.getCmp('boutonPincipalInterface').enable();
            },
            failure:function(){
                Ext.Msg.alert('Erreur', 'Erreur dans la récupération des droits');
            }
        });
        ACL.sessionCheckIterator=setInterval(function(){me.checkSessionStatus();},60000);
    },

    checkSessionStatus: function() {
        Ext.Ajax.request({
            url:'xhr-authentication/is-session-expiring',
            params:{

            },
            success:function(response){
                var currentStatus=Ext.JSON.decode(response.responseText);
                if (currentStatus.status) {
                    if ((currentStatus.time<=300)&&(Ext.isEmpty(Ext.getCmp("sessionWarningWindow")))){
                        Ext.widget("sessionWarningWindow").show();
                    } else if ((currentStatus.time<=300)&&(!Ext.isEmpty(Ext.getCmp("sessionWarningWindow")))){

                    }else if (!Ext.isEmpty(Ext.getCmp("sessionWarningWindow"))){
                        Ext.getCmp("sessionWarningWindow").close();
                    }
                } else {
                    if (!Ext.isEmpty(Ext.getCmp("sessionWarningWindow"))){
                        Ext.getCmp("sessionWarningWindow").close();
                    }
                    if (Ext.isEmpty(Ext.getCmp("sessionExpiredWindow"))){
                        Ext.widget("sessionExpiredWindow").show();
                    }

                }
            },
            failure:function(){
                console.log("sesson status recover error");
                clearInterval(ACL.sessionCheckIterator);
            }
        });
    }

});
