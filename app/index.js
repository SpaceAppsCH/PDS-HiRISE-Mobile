$(document).ready(function() {

	$('#map').css('width', $(window).width() + 'px');
	$('#map').css('height', $(window).height() + 'px');

    
    var map = new OpenLayers.Map({
        div: "map",
        allOverlays: true,
        maxExtent: new OpenLayers.Bounds(
            1549471.9221, 6403610.94, 1550001.32545, 6404015.8
        )
    });
    
    var options = {numZoomLevels: 3};

    var hirise = new OpenLayers.Layer.Image(
            'HiRISE',
            'http://hirise.lpl.arizona.edu/images/wallpaper/800/ESP_026303_1945.jpg',
            new OpenLayers.Bounds(-180, -88.759, 180, 88.759),
            new OpenLayers.Size(800, 600),
            options
        );

    map.addLayer(hirise);
    //map.addControl(new OpenLayers.Control.LayerSwitcher());
    map.zoomToMaxExtent();

});
