$themepallete = @{
"themePrimary" = "#FC5038"; #Strawberry
"themeLighterAlt" = "#888EA8"; #Dark Lavender
"themeLighter" = "#FBC0C3"; #Pink
"themeLight" = "#796722"; #Olive
"themeTertiary" = "#F4843E"; #Orange
"themeSecondary" = "#72BD54"; #Lime
"themeDarkAlt" = "#AD4361"; #Raspberry
"themeDark" = "#136D80"; #Teal
"themeDarker" = "#FFB29A"; #Light Salmon
"neutralLighterAlt" = "#FFF7D7"; #Beige
"neutralLighter" = "#DDEFF9"; #Light Blue
"neutralLight" = "#F2C976"; #Lemon
"neutralQuaternaryAlt" = "#8A5E72"; #Dark Plum
"neutralQuaternary" = "#308FBB"; #Steel Blue
"neutralTertiaryAlt" = "#BDA9C2"; #Lavender
"neutralTertiary" = "#994719"; #Sienna
"neutralSecondary" = "#80B88C"; #Dark Mint
"neutralPrimaryAlt" = "#9C000C"; #Maroon
"neutralPrimary" = "#52834C"; #Pine
"neutralDark" = "#B3AA9B"; #Gray
"black" = "#000000";
"white" = "#ffffff";
"primaryBackground" = "#ffffff";
"primaryText" = "#000000";
"bodyBackground" = "#ffffff";
"bodyText" = "#000000";
"disabledBackground" = "#CD9D7C"; #Tan
"disabledText" = "#765A4F"; #Coffee
}

Connect-SPOService -Url https://hernancompany-admin.sharepoint.com
Add-SPOTheme -Name "Multicolor" -Palette $themepallete -IsInverted $false