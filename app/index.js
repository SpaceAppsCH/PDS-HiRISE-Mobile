var map, hirise, usa, graphic;

$(document).ready(function() {

	$('#map').css('width', $(window).width() + 'px');
	$('#map').css('height', $(window).height() + 'px');

    var width = 13684, height = 30928;

    map = new OpenLayers.Map({
        div: "map",
        zoom: 1,
        allOverlays: false,
        //maxResolution: 0.703125
        numZoomLevels: 6,
		maxExtent: new OpenLayers.Bounds(0,0,width,height),
		maxResolution: width / 256
    });
    
    OpenLayers.IMAGE_RELOAD_ATTEMPTS = 5;    
    
    var options = {	
		//sphericalMercator: false, 
		attribution: "Mars", 
		isBaseLayer:true 
	  };
    
    var baseUrl = "http://209.236.123.24/images/ESP_011400_1680_RED.QLOOK/";
    
/*
    var hirise = new OpenLayers.Layer.Image(
            'HiRISE',
            'http://hirise.lpl.arizona.edu/images/wallpaper/800/ESP_026303_1945.jpg',
            new OpenLayers.Bounds(-180, -88.759, 180, 88.759),
            new OpenLayers.Size(800, 600),
            options
        );
*/
/*
    var hirise = new OpenLayers.Layer.TileCache("HiRISE",
                "http://localhost:8080/1.0.0/",
                "hirise",
                options);
                
	map.addLayer(hirise);                
*/

	hirise = new OpenLayers.Layer.XYZ("HiRISE: Mars", 
	  baseUrl + "tiles/tile-${x}-${y}-${z}.png", options);

/*
	usa = new OpenLayers.Layer.WMS("USA",
                "http://gisdata.usgs.gov/wmsconnector/com.esri.wms.Esrimap?ServiceName=USGS_EDC_Elev_NED_3",
               { layers: "HR-NED.IMAGE", reaspect: "false", transparent: "true" },
               { isBaseLayer: false, opacity: 0.5 }); 
*/

	graphic = new OpenLayers.Layer.Image(
                "EPFL",
                "./tiles/EPFL.png",
                new OpenLayers.Bounds(0, 0, 1120, 910),
                new OpenLayers.Size(1120, 910),
                { isBaseLayer: false, opacity: 0.5 }
            );

   map.addLayers([hirise, graphic])

	//map.zoomIn();
	//map.moveByPx(-230, 0)

    map.addControl(new OpenLayers.Control.LayerSwitcher());
    //map.zoomToMaxExtent();

});
