module.exports = function(eleventyConfig) {
  // Copy images and CSS to output
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("css");
  
  // Create plant detail pages from data
  eleventyConfig.addCollection("plants", function(collectionApi) {
    const plants = require('./_data/plants.js')();
    return plants.then(data => data);
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};
