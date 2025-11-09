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

  // Recipes
  eleventyConfig.addCollection("recipes", function(collectionApi) {
    const recipes = require('./_data/recipes.js')();
    return recipes.then(data => data);
  });

};
