/**
 * User: dportabe
 * Date: 4/21/12
 * Time: 7:35 PM
 */

/*
  Creates tiles for the input image to use with http://wiki.openstreetmap.org/wiki/OpenLayers

  To run:
  > scalac Test3.scala && scala -J-Xms512M -J-Xmx1500M Test3 full.png tiles/tile-#{x}-#{y}-#{z}.png
  > scala -cp "Tile/out/production/Tile" -J-Xms512M -J-Xmx1500M Test3 test1/full.jpg "test1/tiles4/tile-#{x}-#{y}-#{z}.png"


  Cygwin:
  Install: http://download.java.net/media/jai-imageio/builds/release/1.1/ -> jai_imageio-1_1-lib-windows-i586.exe
  > cd /cygdrive/u/test/
  > CLASSPATH="C:\Program Files\Sun Microsystems\JAI Image IO Tools 1.1\lib\clibwrapper_jiio.jar;C:\Program Files\Sun Microsystems\JAI Image IO Tools 1.1\lib\jai_imageio.jar"
  > scala -cp "Tile/out/production/Tile;$CLASSPATH" -J-Xms512M -J-Xmx1500M Test3 test1/full.jpg "test1/tiles3/tile-#{x}-#{y}-#{z}.png"
  > scala -cp "Tile/out/production/Tile;$CLASSPATH" -J-Xms512M -J-Xmx1500M Test3 ESP_011400_1680_RED.QLOOK/full.png "ESP_011400_1680_RED.QLOOK/tiles4/tile-#{x}-#{y}-#{z}.png"
  > scala -cp "Tile/out/production/Tile;$CLASSPATH" -J-Xms1000M -J-Xmx4000M -J-mx1000m Test3 ESP_011400_1680_RED.QLOOK/full.jp2 "ESP_011400_1680_RED.QLOOK/tiles4/tile-#{x}-#{y}-#{z}.png"
*/

import java.awt.image.BufferedImage
import java.awt.RenderingHints
import java.io.File
import javax.imageio.ImageIO
//import org.testng.annotations.Test


object Test3 {
  case class Size(width: Int, height: Int) {}

  implicit def RichFormatter(string: String) = new {
    def richFormat(replacement: Map[String, Any]) =
      (string /: replacement) {(res, entry) => res.replaceAll("#\\{%s\\}".format(entry._1), entry._2.toString)}
  }

//  def main3(args: Array[String]) {
//    computeTiles(
//      input = readImage("/david/Desktop/test/ESP_011400_1680_RED.QLOOK/full.png"),
//      outputTemplateFilename = "/david/Desktop/test/ESP_011400_1680_RED.QLOOK/tiles/tile-#{x}-#{y}-#{z}.png",
//      tileSize = new Size(256, 256),
//      imageInFullZoomOutWidth = 600,
//      zoomOutIncrement = 2.0);
//  }

  def main(args: Array[String]) {
    computeTiles(
      input = readImage(args(0)),
      outputTemplateFilename = args(1),
      tileSize = new Size(256, 256),
      imageInFullZoomOutWidth = 256,
      zoomOutIncrement = 2.0);
  }



  def computeTiles(input: BufferedImage, outputTemplateFilename: String, tileSize: Size, imageInFullZoomOutWidth: Int, zoomOutIncrement: Double) {
    val imageSize = new Size(input.getWidth, input.getHeight);
//    val maxZoomOutFactor = imageSize.width / 600.0;
    val maxZoomOutFactor = imageSize.width / 256.0;
    computeTiles(input, outputTemplateFilename, tileSize, imageInFullZoomOutWidth, zoomOutIncrement, maxZoomOutFactor);
  }

  def computeTiles(input: BufferedImage, outputTemplateFilename: String, tileSize: Size, imageInFullZoomOutWidth: Int, zoomOutIncrement: Double, maxZoomOutFactor: Double) {
    var zoomIndex = 0;
    var zoom = 1.0;
    while (zoom <= maxZoomOutFactor) {
      computeTiles(input, outputTemplateFilename richFormat Map("z" -> zoomIndex), tileSize, zoom);
      zoomIndex = zoomIndex + 1;
      zoom *= zoomOutIncrement;
    }
  }

  def computeTiles(input: BufferedImage, outputTemplateFilename: String, zoomedOutTileSize: Size, zoom: Double) {
    val srcImageSize = new Size(input.getWidth, input.getHeight);

    val srcImageTileSize = new Size((zoomedOutTileSize.width * zoom).toInt, (zoomedOutTileSize.height * zoom).toInt);

//    val widthOffsets = Range(0, srcImageSize.width, srcImageTileSize.width);
//    val heightOffsets = Range(0, srcImageSize.height, srcImageTileSize.height);
    val widthOffsets = Range(0, srcImageSize.width-(srcImageTileSize.width-1), srcImageTileSize.width);     // the last tile might not be of size srcImageTileSize.width. in this case, we don't take this tile; we could just draw the empty space in white.
    val heightOffsets = Range(0, srcImageSize.height-(srcImageTileSize.height-1), srcImageTileSize.height);

    heightOffsets.indices.foreach(heightOffsetIndex => {
      widthOffsets.indices.foreach(widthOffsetIndex => {
        val outputImg = cropAndScaleImage(input, widthOffsets(widthOffsetIndex), heightOffsets(heightOffsetIndex), srcImageTileSize.width, srcImageTileSize.height, zoomedOutTileSize.width, zoomedOutTileSize.height);
        val outputFilename = outputTemplateFilename.richFormat(Map("x" -> widthOffsetIndex, "y" -> heightOffsetIndex));
        writeImage(outputImg, outputFilename);
      })
    })
  }


  def readImage(filename: String) : BufferedImage = {
    println("read image: " + filename);
    val img = ImageIO.read(new File(filename));
    if (img == null)
      throw new Exception("could not read img");
    img;
  }

  def writeImage(img: BufferedImage, filename: String) {
    println("write image: " + filename);
    if (!filename.toLowerCase.endsWith(".png"))
      throw new Exception("PNG fomart only supported for writing image.");
    ImageIO.write(img, "PNG", new File(filename));
  }

  // for some reason, it cannot be saved in jpg nor bmp; png works fine.
  def cropAndScaleImage(srcImg: BufferedImage, tileOffsetX: Int, tileOffsetY: Int, tileWidth: Int, tileHeight: Int, outWidth: Int, outHeight: Int) : BufferedImage = {
    val croppedImg = srcImg.getSubimage(tileOffsetX, tileOffsetY, tileWidth, tileHeight);

    val scaledImage = new BufferedImage(outWidth, outHeight, BufferedImage.TYPE_INT_ARGB);
    val graphics2D = scaledImage.createGraphics();
    graphics2D.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
    graphics2D.drawImage(croppedImg, 0, 0, outWidth, outHeight, null);
    graphics2D.dispose();

    scaledImage
  }
}

