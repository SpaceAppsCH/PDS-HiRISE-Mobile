$(document).ready(function() {

	$('#map').css('width', $(window).width() + 'px');
	$('#map').css('height', $(window).height() + 'px');

/*	
	var map;
    function init() {
        map = new OpenLayers.Map({
            div: "map",
            allOverlays: true,
            maxExtent: new OpenLayers.Bounds(
                1549471.9221, 6403610.94, 1550001.32545, 6404015.8
            )
        });

        // give the features some style
        var styles = new OpenLayers.StyleMap({
            "default": {
                strokeWidth: 2
            },
            "select": {
                strokeColor: "#0099cc",
                strokeWidth: 4
            }
        });
    
        // add rules from the above lookup table
        styles.addUniqueValueRules("default", "RP_TYPE", {
            10: {strokeColor: "#000000", strokeWidth: 2},
            12: {strokeColor: "#222222", strokeWidth: 2},
            14: {strokeColor: "#444444", strokeWidth: 2},
            16: {strokeColor: "#666666", strokeWidth: 2},
            18: {strokeColor: "#888888", strokeWidth: 2},
            19: {strokeColor: "#666666", strokeWidth: 1}
        });

        var vectors = new OpenLayers.Layer.Vector("Lines", {
            strategies: [new OpenLayers.Strategy.Fixed()],                
            protocol: new OpenLayers.Protocol.HTTP({
                url: "data/roads.json",
                format: new OpenLayers.Format.GeoJSON()
            }),
            styleMap: styles
        });
    
        map.addLayer(vectors);
        map.addControl(new OpenLayers.Control.LayerSwitcher());
        map.zoomToMaxExtent();

	}
*/
var map = null;
        var shade = null;
        var maxOpacity = 0.9;
        var minOpacity = 0.1;
        function changeOpacity(byOpacity) {
            var newOpacity = (parseFloat(OpenLayers.Util.getElement('opacity').value) + byOpacity).toFixed(1);
            newOpacity = Math.min(maxOpacity,
                                  Math.max(minOpacity, newOpacity));
            OpenLayers.Util.getElement('opacity').value = newOpacity;
            shade.setOpacity(newOpacity);
        }
        function init(){
            var options = {
                maxExtent: new OpenLayers.Bounds(-110.994, 45.885, -110.950, 45.929),
                maxResolution: "auto"
            };
            map = new OpenLayers.Map('map', options);
            var drg = new OpenLayers.Layer.WMS("Topo Maps",
                "http://terraservice.net/ogcmap.ashx",
                {layers: "DRG"});
            shade = new OpenLayers.Layer.WMS("Shaded Relief",
                "http://gisdata.usgs.gov/wmsconnector/com.esri.wms.Esrimap?ServiceName=USGS_EDC_Elev_NED_3",
                {layers: "HR-NED.IMAGE", reaspect: "false", transparent: 'true'},
                {isBaseLayer: false, opacity: 0.3});
            map.addLayers([drg, shade]);
            map.addControl(new OpenLayers.Control.LayerSwitcher());
            map.zoomToMaxExtent();
        }
});
