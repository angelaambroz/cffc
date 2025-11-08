# Community Food Forest Collective - Plant Catalog

A static site catalog of plants in the community food forest, powered by Eleventy and Airtable.

## 🌱 Features

- Dynamic plant catalog from Airtable
- Plant detail pages with photos, descriptions, and health status
- Client-side search functionality
- Responsive design

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (for built-in fetch support)
- An Airtable account with a base containing plant data

### Installation

1. Clone the repository:
```bash
git clone https://github.com/angelaambroz/cffc-plant-catalog
cd cffc-plant-catalog
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Airtable credentials:
```bash
AIRTABLE_API_KEY=your_personal_access_token
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_TABLE_NAME=Plant Species
```

### Development

Start the development server:
```bash
npm start
```

Visit `http://localhost:8080` (or `:8081` if `:8080` is occupied) to view the site.

### Build

Build the static site:
```bash
npm run build
```

The output will be in the `_site/` directory.

## 📦 Deployment

This site is configured for deployment on [Vercel](https://vercel.com/).

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add your environment variables in Vercel dashboard:
   - `AIRTABLE_API_KEY`
   - `AIRTABLE_BASE_ID`
   - `AIRTABLE_TABLE_NAME`
4. Deploy!

Vercel will automatically rebuild and deploy when you push to your main branch.

### Updating Plant Data

Since this is a static site, plant data from Airtable is fetched at build time. To update the site with new data:
- Push a commit to trigger a rebuild, or
- Use Vercel's "Redeploy" button in the dashboard, or
- Set up a webhook from Airtable to trigger automatic rebuilds

## 📁 Project Structure

```
cffc-plant-catalog/
├── _data/
│   └── plants.js          # Airtable data fetching
├── _includes/
│   └── layout.njk         # Base layout template
├── css/
│   └── style.css          # Styles
├── images/
│   └── plants/            # Local plant images (if any)
├── index.njk              # Homepage with plant grid
├── plants.njk             # Plant detail page template
├── .eleventy.js           # Eleventy configuration
└── package.json           # Dependencies and scripts
```

## 🔧 Technologies

- [Eleventy](https://www.11ty.dev/) - Static site generator
- [Airtable](https://airtable.com/) - Database and CMS
- [Nunjucks](https://mozilla.github.io/nunjucks/) - Templating engine
- [Vercel](https://vercel.com/) - Hosting platform

## 📝 License

To be determined...
