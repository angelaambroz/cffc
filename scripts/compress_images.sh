#!/bin/bash

# Directory containing images
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
IMG_DIR="$SCRIPT_DIR/../images/plants"
OUTPUT_DIR="$IMG_DIR/compressed"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

echo "Compressing images..."
echo "Input directory: $IMG_DIR"
echo "Output directory: $OUTPUT_DIR"

# Iterate over common image formats
for img in "$IMG_DIR"/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
    # Skip if no files match
    [ -e "$img" ] || continue
    
    filename=$(basename "$img")
    
    # Use ImageMagick's convert to compress
    # Adjust quality (85 is a good balance) and strip metadata
    convert "$img" -quality 85 -strip "$OUTPUT_DIR/$filename"
    
    echo "Compressed: $filename"
done

echo "Done! Compressed images are in $OUTPUT_DIR"
