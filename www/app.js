/*
 * File: app.js
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

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        Ext: '.',
        'Ext.ux': 'extjs-4.1.0/examples/ux'
    }
});

Ext.application({
    models: [
        'sitesDataModel',
        'panierDataModel',
        'versionsDataModel',
        'blocDataModel',
        'typesChampsDataModel',
        'taxonomieDataModel',
        'iconDataModel',
        'mediaDataModel',
        'mediaViewModel',
        'wallpaperDataModel',
        'themeDataModel',
        'personalPrefsDataModel',
        'groupDataModel',
        'userDataModel',
        'reusableElementModel',
        'delegationDataModel',
        'nestedContentModel',
        'pageDataModel',
        'imageDataModel'
    ],
    stores: [
        'SitesJson',
        'BlocsDataStore',
        'TypesChampsDataStore',
        'TaxonomieDataJson',
        'champsTCARStore',
        'TypesContenusDepDataJson',
        'TypesContenusNDepDataJson',
        'IconesDataJson',
        'MediasDataStore',
        'MediaViewStore',
        'WallpapersDataJson',
        'ThemesDataJson',
        'PersonalPrefsStore',
        'GroupsDataStore',
        'UsersDataStore',
        'UsersGroupStore',
        'UsersAdminDataStore',
        'ReusableElementsDataStore',
        'countryStore',
        'languageStore',
        'DelegationsDataStore',
        'UsersComboStore',
        'CurrentUserDataStore',
        'DepContentsCombo',
        'NestedContentsStore',
        'searchResultsStore',
        'PagesDataStore',
        'MasksComboStore',
        'contentTypesCombo',
        'taxoTermsCombo',
        'ContentSelectorStore',
        'SitesComboPages',
        'SitesComboMasks',
        'MasquesDataJson',
        'TaxonomyForCT',
        'TaxonomyForC',
        'VersionsDataJson',
        'ContenusDataJson',
        'DepTypesForContents',
        'TCNDepCombo',
        'CurrentContent',
        'ContentTypesForContent',
        'DepContentsCombo2',
        'TaxonomyForC2',
        'TCDepForQA',
        'ImagePickerStore',
        'TaxonomyForQA',
        'SitesComboPreview',
        'PagesPreviewStore'
    ],
    views: [
        'MyContainer',
        'MyGridPanel3',
        'ViewportPrimaire',
        'EnteteV',
        'iconeBureau',
        'contributionContenus',
        'adminFTDC',
        'adminFMDP',
        'contributionPages',
        'contributionMedias',
        'mediaWindowsView',
        'ImagePreviewWindow',
        'PDFPreviewWindow',
        'mediaImageEditor',
        'settingsContextMenu',
        'DesktopCustomizeWindow',
        'wallpaperPicker',
        'themePicker',
        'accessibilityPicker',
        'adminFUtilisateurs',
        'GroupAddWindow',
        'UserAddWindow',
        'UserAdminWindow',
        'MyGridPanel16',
        'testingGround',
        'CKEField',
        'ReusableElementPicker',
        'ExportElementWindow',
        'iconsContextMenu',
        'AdminPasswordChange',
        'userSettings',
        'menuContenusContext',
        'termContextMenu',
        'NestedContentsGrid',
        'NestedContentAddWindow',
        'MyWindow31',
        'esResponseWindow',
        'searchResultsWindow',
        'MyGridPanel20',
        'sitesInterface',
        'MyWindow35',
        'CTCField',
        'TTField',
        'FCCField',
        'FOShowWindow',
        'assistantRequetage',
        'ImagePickerWindow',
        'ImageFieldComponent',
        'ImagePickerField',
        'monitoringTools',
        'SystemStatusPanel',
        'MyTool16',
        'MyTool17',
        'MyWindow39',
        'MainToolsContextMenu'
    ],
    autoCreateViewport: true,
    name: 'Rubedo',
    controllers: [
        'ContributionSitesController',
        'PanierController',
        'ContributionContenusController',
        'MasqueController',
        'TypesContenusController',
        'TaxonomieController',
        'assistantRequetageController',
        'InterfaceController',
        'MediathequeController',
        'UsersController',
        'MainStoresController',
        'ACLController',
        'SearchController',
        'SitesController',
        'PagesController'
    ]
});
