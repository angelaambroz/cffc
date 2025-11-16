module.exports = function(eleventyConfig) {
  // Copy images, CSS, and fonts to output
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("fonts");
  
  // Create plant detail pages from data
  eleventyConfig.addCollection("plants", function(collectionApi) {
    const plants = require('./_data/plants.js')();
    return plants.then(data => data);
  });

  // Food forest layers - these are in a specific order
  eleventyConfig.addCollection("layers", function() {
return ["Canopy", "Understory", "Shrub", "Herbaceous", "Groundcover", "Root", "Vines & Canes"];
  })

};
