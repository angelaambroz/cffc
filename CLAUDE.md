# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static plant catalog website for the Community Food Forest Collective (CFFC), built with Eleventy. The site displays detailed information about plants in the community food forest, with data fetched from Airtable at build time.

## Key Commands

### Development
```bash
npm start                    # Start dev server with hot reload (localhost:8080 or :8081)
npm run build                # Build static site to _site/ directory
```

### Python Scripts (in scripts/ directory)
```bash
python extract_from_pdf.py   # Extract plant data from PDF to CSV format
bash compress_images.sh      # Compress plant images for web
```

## Architecture

### Data Flow
1. **Build-time data fetch**: `_data/plants.js` fetches plant data from Airtable API using environment variables
2. **Static generation**: Eleventy creates static HTML pages for all plants
3. **Pagination**: Each plant gets its own detail page at `/plants/{slug}/`
4. **Auto-deploy**: GitHub Actions workflow triggers daily Vercel rebuild at 5 AM UTC

### Environment Variables Required
- `AIRTABLE_API_KEY` - Personal access token for Airtable API
- `AIRTABLE_BASE_ID` - Airtable base ID (format: `appXXXXXXXXXXXXXX`)
- `PLANT_SPECIES_TABLE` - Name of the Airtable table (e.g., "Plant Species")

### Key Files and Their Roles

**_data/plants.js**: Async data file that:
- Fetches plant data from Airtable API at build time
- Transforms Airtable records into clean plant objects
- Generates slugs from plant names for URLs
- Combines "Interesting facts" and "Fun trivia" fields into single `moreInfo` property

**plants.njk**: Paginated template that:
- Uses Eleventy pagination to create individual pages for each plant
- Generates permalinks at `/plants/{slug}/`
- Displays botanical info (left column) and culinary info (right column)
- Layer badge and tags are clickable links that filter the homepage
- Includes client-side search overlay for browsing all plants

**index.njk**: Homepage that:
- Groups plants by food forest layer (Canopy, Understory, Shrub, Herbaceous, Groundcover, Root, Vines & Canes)
- Displays plant grid cards with images and names
- Includes client-side search filtering by plant name
- Supports URL-based filtering via `?layer=` or `?tag=` query parameters
- Shows filter UI with "Show All" button when a filter is active
- Plant cards include `data-tags` attribute for tag-based filtering

**.eleventy.js**: Configures:
- Passthrough copying for images, css, fonts
- Custom "plants" collection from async Airtable data
- Custom "layers" collection with specific ordering

### Food Forest Layers
Plants are categorized into 7 layers in this specific order:
1. Canopy
2. Understory
3. Shrub
4. Herbaceous
5. Groundcover
6. Root
7. Vines & Canes

This ordering is defined in `.eleventy.js` and used for display grouping on the homepage.

### Filtering System

The site supports two types of filtering on the homepage:

**Layer Filtering** (`?layer=LayerName`):
- Clicking a plant's layer badge on a detail page links to `/?layer={LayerName}`
- Hides all sections except the specified layer
- Scrolls smoothly to the filtered section
- Example: `/?layer=Canopy` shows only canopy plants

**Tag Filtering** (`?tag=TagName`):
- Clicking a plant's tag badge on a detail page links to `/?tag={TagName}`
- Shows all sections but hides plant cards without the specified tag
- Automatically hides empty sections (layers with no matching plants)
- Example: `/?tag=Native` shows only native plants across all layers

Both filters:
- Display "Filtered by: {FilterValue}" with a "Show All" button
- Use a single `filterByGroup(filterType, filterValue)` JavaScript function
- Can be cleared by clicking "Show All" or navigating to `/` without parameters

### Plant Data Structure
Each plant object includes:
- `name`, `scientificName`, `slug`
- Botanical: `overview`, `appearance`, `growingConditions`, `cultivation`, `layer`
- Culinary: `taste`, `nutrition`, `culinaryUses`, `availability`, `shelfLife`, `allergies`
- Additional: `interestingFacts`, `funTrivia`, `moreInfo` (combined facts+trivia), `tags`

### Scripts Directory
Contains Python utilities for plant data management:
- **extract_from_pdf.py**: Parses PDF with plant info, extracts structured sections using regex, outputs to CSV
- **plant_data.pdf/csv**: Source data (29 plants) used before Airtable migration
- **compress_images.sh**: Optimizes plant images for web

## Deployment

Site is deployed on Vercel with:
- Build command: `npm run build`
- Output directory: `_site`
- Auto-deploy: Daily at 5 AM UTC via GitHub Actions webhook trigger
- Manual trigger: GitHub Actions workflow_dispatch

To update plant data: Trigger a rebuild since data is fetched at build time, not runtime.

## Image Handling

Plant images should be:
- Named exactly as the plant's `Name` field from Airtable (e.g., "Apple.jpg", "Black Raspberry.jpg")
- Placed in `images/plants/` directory
- Referenced in templates as `/images/plants/{{ plant.name }}.jpg`
