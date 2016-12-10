#include ../common/functions.jsx

// Exports maps for Real Virtuality 4
// Renames maps to expected RV4 standard
// Combines Specular and Glossiness Into SMDI
// Applies GradientMap To AmbientOcclusion
// Does Not Support Metalness
// Bumps Normal

function Calibrate()
{
    SetSaveAlpha(false);
    SetAOExport(false);
    SetIgnoreSuffixType(true);
    var mapType = GetMapType();

    switch(mapType)
    {
        case "Normal":
            SetMapType("nohq");
            var normal = GetBumpedNormal(mapType);
            FlipY();

            return normal;

         case "Albedo":
            SetMapType("co");
            return GetMergedMap();           
         
         case "AO":
			// It might be quicker to create the correct AO by adding it to the G channel and filling others with white.
			// Keep this note to investigate the times it takes for both.
			SetMapType("as");
			var ambientshadow = CreateAmbientShadow("AO");
			return ambientshadow;
            
           
        case "Specular":
            SetMapType("smdi");     
            var smdimap = GetMergedMap();            
            var channels = smdimap.channels;
            var whiteChannel = fillWhite();            
           
            StoreMapInChannel(smdimap, whiteChannel, channels, 0);
            StoreMapInChannel(smdimap, "Specular",channels, 1);
            StoreMapInChannelInverted(smdimap, "Gloss", channels, 2);
            
            return smdimap;	
                

        default:
            return null;
    }
}

function Finish()
{

}

// --- THE FUNCTIONS BELOW ARE SHARED AND ULTIMATLEY SHOULD BELONG IN THE COMMON.JSX 

cTID = function(s) { return app.charIDToTypeID(s); };
sTID = function(s) { return app.stringIDToTypeID(s); };

function fillWhite() 
 {
    var id50 = charIDToTypeID( "Fl  " );				//fill
    var desc7 = new ActionDescriptor();
    var id51 = charIDToTypeID( "Usng" );				//using
    var id52 = charIDToTypeID( "FlCn" );				//fillContents
    var id53 = charIDToTypeID( "Wht " );				//white
    desc7.putEnumerated( id51, id52, id53 );			//desc7.putEnumerated(using, fillContents, white )
    var id54 = charIDToTypeID( "Opct" );				//opacity
    var id55 = charIDToTypeID( "#Prc" );				//percentUnit
    desc7.putUnitDouble( id54, id55, 100.000000 );		//desc7.putUnitDouble( opacity, percentUnit, 100.000000 );
    var id56 = charIDToTypeID( "Md  " );				//mode
    var id57 = charIDToTypeID( "BlnM" );				//blendMode
    var id58 = charIDToTypeID( "Nrml" );				//normal
    desc7.putEnumerated( id56, id57, id58 );			//desc7.putEnumerated( mode, blendMode, normal );
    executeAction( id50, desc7, DialogModes.NO );
}

function StoreMapInChannelInverted(_map, _mapType, _channels, _channel)
{
	//This function takes a source texture and inverts it, then stores it in the output texture and channel.
    var map = GetMap(_mapType); // Find map
    if(map != null) // If map exists, do:
    {
        var mapDoc = app.open(new File(map[0])); // Open map
        activeDocument = _map; // Select main document
        _map.activeChannels = [_channels[_channel]]; // Select channel
        ApplyMergedFromName(mapDoc.name); // Apply map to channel       
        Invert(); // Inverts the Channel
    }
}

function CreateAmbientShadow(_mapType)
{
	// This function takes the ambient shadow and applys a gradient map to it and returns the result.
    var _map = GetMap(_mapType); 							// Find map
    if(_map != null) 										// If map exists, do:
    {
        var _asDoc = app.open(new File(_map[0]));			// Open map
        activeDocument = _asDoc;							// Select main document
		_asDoc.flatten();
		_asDoc.changeMode(ChangeMode.RGB);
		createGradientMap();
		setGradientMap();
		return _asDoc;
	}
	function createGradientMap() {
		var desc1 = new ActionDescriptor();
		var ref1 = new ActionReference();
		ref1.putClass(cTID('AdjL'));
		desc1.putReference(cTID('null'), ref1);
		var desc2 = new ActionDescriptor();
		var desc3 = new ActionDescriptor();
		var desc4 = new ActionDescriptor();
		desc4.putString(cTID('Nm  '), "Foreground to Background");
		desc4.putEnumerated(cTID('GrdF'), cTID('GrdF'), cTID('CstS'));
		desc4.putDouble(cTID('Intr'), 4096);
		var list1 = new ActionList();
		var desc5 = new ActionDescriptor();
		var desc6 = new ActionDescriptor();
		desc6.putDouble(cTID('Rd  '), 000);
		desc6.putDouble(cTID('Grn '), 000);
		desc6.putDouble(cTID('Bl  '), 000);
		desc5.putObject(cTID('Clr '), sTID("RGBColor"), desc6);
		desc5.putEnumerated(cTID('Type'), cTID('Clry'), cTID('UsrS'));
		desc5.putInteger(cTID('Lctn'), 0);
		desc5.putInteger(cTID('Mdpn'), 50);
		list1.putObject(cTID('Clrt'), desc5);
		var desc7 = new ActionDescriptor();
		var desc8 = new ActionDescriptor();
		desc8.putDouble(cTID('Rd  '), 255);
		desc8.putDouble(cTID('Grn '), 000);
		desc8.putDouble(cTID('Bl  '), 255);
		desc7.putObject(cTID('Clr '), sTID("RGBColor"), desc8);
		desc7.putEnumerated(cTID('Type'), cTID('Clry'), cTID('UsrS'));
		desc7.putInteger(cTID('Lctn'), 4096);
		desc7.putInteger(cTID('Mdpn'), 50);
		list1.putObject(cTID('Clrt'), desc7);
		desc4.putList(cTID('Clrs'), list1);
		var list2 = new ActionList();
		var desc9 = new ActionDescriptor();
		desc9.putUnitDouble(cTID('Opct'), cTID('#Prc'), 100);
		desc9.putInteger(cTID('Lctn'), 0);
		desc9.putInteger(cTID('Mdpn'), 50);
		list2.putObject(cTID('TrnS'), desc9);
		var desc10 = new ActionDescriptor();
		desc10.putUnitDouble(cTID('Opct'), cTID('#Prc'), 100);
		desc10.putInteger(cTID('Lctn'), 4096);
		desc10.putInteger(cTID('Mdpn'), 50);
		list2.putObject(cTID('TrnS'), desc10);
		desc4.putList(cTID('Trns'), list2);
		desc3.putObject(cTID('Grad'), cTID('Grdn'), desc4);
		desc2.putObject(cTID('Type'), cTID('GdMp'), desc3);
		desc1.putObject(cTID('Usng'), cTID('AdjL'), desc2);
		executeAction(cTID('Mk  '), desc1, DialogModes.NO);
	}

	function setGradientMap() {
		var desc1 = new ActionDescriptor();
		var ref1 = new ActionReference();
		ref1.putEnumerated(cTID('AdjL'), cTID('Ordn'), cTID('Trgt'));
		desc1.putReference(cTID('null'), ref1);
		var desc2 = new ActionDescriptor();
		var desc3 = new ActionDescriptor();
		desc3.putString(cTID('Nm  '), "Custom");
		desc3.putEnumerated(cTID('GrdF'), cTID('GrdF'), cTID('CstS'));
		desc3.putDouble(cTID('Intr'), 4096);
		var list1 = new ActionList();
		var desc4 = new ActionDescriptor();
		var desc5 = new ActionDescriptor();
		desc5.putDouble(cTID('Rd  '), 255);
		desc5.putDouble(cTID('Grn '), 0);
		desc5.putDouble(cTID('Bl  '), 255);
		desc4.putObject(cTID('Clr '), sTID("RGBColor"), desc5);
		desc4.putEnumerated(cTID('Type'), cTID('Clry'), cTID('UsrS'));
		desc4.putInteger(cTID('Lctn'), 0);
		desc4.putInteger(cTID('Mdpn'), 50);
		list1.putObject(cTID('Clrt'), desc4);
		var desc6 = new ActionDescriptor();
		var desc7 = new ActionDescriptor();
		desc7.putDouble(cTID('Rd  '), 255);
		desc7.putDouble(cTID('Grn '), 255);
		desc7.putDouble(cTID('Bl  '), 255);
		desc6.putObject(cTID('Clr '), sTID("RGBColor"), desc7);
		desc6.putEnumerated(cTID('Type'), cTID('Clry'), cTID('UsrS'));
		desc6.putInteger(cTID('Lctn'), 4096);
		desc6.putInteger(cTID('Mdpn'), 50);
		list1.putObject(cTID('Clrt'), desc6);
		desc3.putList(cTID('Clrs'), list1);
		var list2 = new ActionList();
		var desc8 = new ActionDescriptor();
		desc8.putUnitDouble(cTID('Opct'), cTID('#Prc'), 100);
		desc8.putInteger(cTID('Lctn'), 0);
		desc8.putInteger(cTID('Mdpn'), 50);
		list2.putObject(cTID('TrnS'), desc8);
		var desc9 = new ActionDescriptor();
		desc9.putUnitDouble(cTID('Opct'), cTID('#Prc'), 100);
		desc9.putInteger(cTID('Lctn'), 4096);
		desc9.putInteger(cTID('Mdpn'), 50);
		list2.putObject(cTID('TrnS'), desc9);
		desc3.putList(cTID('Trns'), list2);
		desc2.putObject(cTID('Grad'), cTID('Grdn'), desc3);
		desc1.putObject(cTID('T   '), cTID('GdMp'), desc2);
		executeAction(cTID('setd'), desc1, DialogModes.NO);
	}
}