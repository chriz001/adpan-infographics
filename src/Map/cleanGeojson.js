/**
 *  Remove unwanted geojson feature properties
 */

var fs = require("fs");

var inputFile = "./features.json",
  outputFile = "./output.json",
  keep = ["GEOUNIT"];

function editFunct(feature) {
  feature.TID = feature.properties.TID; // set the TID in the feature
  return feature;
}

removeGeojsonProps(inputFile, outputFile, keep, editFunct);

function removeGeojsonProps(inputFile, outputFile, keep, editFunct) {
  // import geojson
  var geojson = JSON.parse(fs.readFileSync(inputFile, "utf8"));

  // for each feature in geojson
  geojson.features.forEach(function (feature, i) {
    // edit any properties
    feature = editFunct(feature);

    // remove any you don't want
    for (var key in feature.properties) {
      // remove unwanted properties
      if (keep.indexOf(key) !== -1) {
      } else {
        delete feature.properties[key];
      }
    }
  });

  // write file
  fs.writeFile(outputFile, JSON.stringify(geojson), function (err) {
    if (err) return console.log(err);
    console.log("The file was saved!");
  });
}
