var map, hirise;

$(document).ready(function() {

	$('#map').css('width', $(window).width() + 'px');
	$('#map').css('height', $(window).height() + 'px');

    
    map = new OpenLayers.Map({
        div: "map",
        zoom: 1,
        allOverlays: false,
        maxResolution: 0.703125,
/*        maxExtent: new OpenLayers.Bounds(
            //1549471.9221, 6403610.94, 1550001.32545, 6404015.8
        )*/
    });
    
    OpenLayers.IMAGE_RELOAD_ATTEMPTS = 5;
    
    var options = {numZoomLevels: 3};

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

	hirise = new OpenLayers.Layer.XYZ("Mars", 
	  "http://david.portabella.me/pds-hirise-mobile/ESP_011400_1680_RED.QLOOK/tiles/tile-${x}-${y}-${z}.png",
	 //  "http://209.236.123.24/images/test1/tiles/tile-${x}-${y}-${z}.png",
		 { sphericalMercator: false, attribution: "Mars", isBaseLayer:true } );

/*	var usa = new OpenLayers.Layer.WMS("USA",
                "http://gisdata.usgs.gov/wmsconnector/com.esri.wms.Esrimap?ServiceName=USGS_EDC_Elev_NED_3",
               { layers: "HR-NED.IMAGE", reaspect: "false", transparent: "true" },
               { isBaseLayer: false, opacity: 0.3 }); 
   
	var nyc = new OpenLayers.Layer.Image(
				'New York',
				'tiles/NYC.png',
				new OpenLayers.Bounds(-180, -88.759, 180, 88.759),
				new OpenLayers.Size(580, 288),
			   { isBaseLayer: false, opacity: 0.3 });
*/
   map.addLayers([hirise])

	map.zoomIn();

    //map.addControl(new OpenLayers.Control.LayerSwitcher());
    //map.zoomToMaxExtent();

});
