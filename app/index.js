var map, hirise, usa, graphic;

$(document).ready(function() {

	$('#map').css('width', $(window).width() + 'px');
	$('#map').css('height', $(window).height() + 'px');

    
    map = new OpenLayers.Map({
        div: "map",
        zoom: 1,
        allOverlays: false,
        maxResolution: 0.703125
    });
    
    OpenLayers.IMAGE_RELOAD_ATTEMPTS = 5;
    
    var options = {numZoomLevels: 3};
    
    var baseUrl = "http://david.portabella.me/pds-hirise-mobile/ESP_011400_1680_RED.QLOOK/";
    
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
	  baseUrl + "tiles/tile-${x}-${y}-${z}.png",
	 //  "http://209.236.123.24/images/test1/tiles/tile-${x}-${y}-${z}.png",
		 { sphericalMercator: false, attribution: "Mars", isBaseLayer:true } );

/*
	usa = new OpenLayers.Layer.WMS("USA",
                "http://gisdata.usgs.gov/wmsconnector/com.esri.wms.Esrimap?ServiceName=USGS_EDC_Elev_NED_3",
               { layers: "HR-NED.IMAGE", reaspect: "false", transparent: "true" },
               { isBaseLayer: false, opacity: 0.5 }); 
*/

	graphic = new OpenLayers.Layer.Image(
                "EPFL",
                "./tiles/EPFL.png",
                new OpenLayers.Bounds(-100, -50, 12, 41),
                new OpenLayers.Size(112, 91),
                { isBaseLayer: false, opacity: 0.5 }
            );

   map.addLayers([hirise, graphic])

	map.zoomIn();
	map.moveByPx(-230, 0)

    map.addControl(new OpenLayers.Control.LayerSwitcher());
    //map.zoomToMaxExtent();

});
