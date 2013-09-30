/*
 * File: app/model/typesChampsDataModel.js
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

Ext.define('Rubedo.model.typesChampsDataModel', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'type',
            sortType: 'asText',
            type: 'string'
        },
        {
            name: 'cType',
            type: 'string'
        },
        {
            name: 'openWindow',
            type: 'string'
        },
        {
            name: 'description',
            type: 'string'
        },
        {
            name: 'config'
        },
        {
            mapping: 'configFields',
            name: 'configFields'
        },
        {
            name: 'store'
        },
        {
            name: 'id'
        },
        {
            defaultValue: 'Autre',
            name: 'category'
        },
        {
            name: 'protoId'
        }
    ]
});