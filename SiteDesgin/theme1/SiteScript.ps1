$site_script = @'
{
  "$schema": "schema.json",
  "actions": [
    {
        "verb": "addPrincipalToSPGroup",
        "principal": "hernan@hernancompany.onmicrosoft.com", /* user */
        "group": "Owners"
    }, 
    {
       "verb": "applyTheme",
       "themeName": "Multicolor"
    },
    {
      "verb": "setRegionalSettings",
      "timeZone": 1,
      "locale": 1033,
      "sortOrder": 6,
      "hourFormat": "24"
    },
    {
      "verb": "setSiteExternalSharingCapability",
      "capability": "Disabled"
    },
    {
      "verb": "installSolution",
      "id": "ddc6043c-7278-452f-964c-072edabe7e25"
    },
    {
      "verb": "createSPList",
      "listName": "Alert",
      "templateType": 100,
      "subactions": [
        {
          "displayName": "AlertMessage",
          "internalName": "PnPAlertMessage",
          "isRequired": true,
          "addToDefaultView": false,
          "fieldType": "Text",
          "enforceUnique": false,
          "verb": "addSPField"
        },
        {
          "displayName": "Start Date-Time",
          "internalName": "PnPAlertStartDateTime",
          "isRequired": false,
          "addToDefaultView": true,
          "fieldType": "DateTime",
          "enforceUnique": false,
          "verb": "addSPField"
        },
        {
          "displayName": "End Date-Time",
          "internalName": "PnPEndStartDateTime",
          "isRequired": false,
          "addToDefaultView": true,
          "fieldType": "DateTime",
          "enforceUnique": false,
          "verb": "addSPField"
        },
        {
          "verb": "setTitle",
          "title": "Alert"
        }
      ]
    }
  ],
  "bindata": {},
  "version": 1
}
'@

Add-SPOSiteScript -Title "Create alert app" -Content $site_script -Description "Create a app to publish alerts"

Add-SPOSiteDesign -Title "Custom Team Site" -WebTemplate "64" -SiteScripts "1e653d8d-4144-4c3e-b069-ba230baf2ea1" -Description "Create team site with alert app"