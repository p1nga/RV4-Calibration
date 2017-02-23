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
            BlendMap(normal, "Normal", BlendMode.OVERLAY,0);

            return normal;

         case "Albedo":
            SetMapType("co");
            var map = GetMergedMap();
            BlendMap(map, "AO", BlendMode.MULTIPLY, 50);
            return map;          
         
         case "AO":           
            SetMapType("as");     
            var ambientshadow = GetMergedMap();
            ambientshadow.changeMode(ChangeMode.RGB);
            var channels = ambientshadow.channels;
            var whiteChannel = fillWhite();
            StoreMapInChannel(ambientshadow, whiteChannel, channels, 0);
            StoreMapInChannel(ambientshadow, "AO", channels, 1);
            StoreMapInChannel(ambientshadow, whiteChannel, channels, 2);

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
    fillBlack();
    Invert();
}


function BlendMap(_map, _blendMapType, _blendMode, _opacity)
{
    var blendMap = GetMap(_blendMapType);
    if(blendMap != null)
    {
        app.open(new File(blendMap[0]));
        DuplicateMerged(blendMap[1]);
        DuplicateToDocument(_map.name);
        Close("no", _map);
        _map.activeLayer.blendMode = _blendMode;
        _map.activeLayer.opacity = _opacity;
        _map.flatten();
    }
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