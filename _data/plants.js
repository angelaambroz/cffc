require('dotenv').config();
// Using Node.js built-in fetch (available in Node 18+)

module.exports = async function() {
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.PLANT_SPECIES_TABLE;
  const apiKey = process.env.AIRTABLE_API_KEY;
  
  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });

    console.log(url, apiKey, tableName);
    
    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Transform Airtable records into cleaner format
    return data.records.map(record => ({
      id: record.id,
      slug: slugify(record.fields['Name'] || 'unnamed-plant'),
      name: record.fields['Name'],
      scientificName: record.fields['Scientific Name'],
      overview: record.fields.Overview,
      appearance: record.fields.Appearance,
      taste: record.fields['Taste and flavor'],
      nutrition: record.fields['Nutritional value'],
      growingConditions: record.fields['Growing conditions'],
      cultivation: record.fields.Cultivation,
      availability: record.fields.Availability,
      culinaryUses: record.fields['Culinary Uses'],
      interestingFacts: record.fields['Interesting facts'],
      shelfLife: record.fields['Shelf life'],
      allergies: record.fields.Allergies,
      funTrivia: record.fields['Fun trivia'],
      tags: record.fields['Tags'],
    moreInfo: [record.fields['Interesting facts'], record.fields['Fun trivia']]
  .filter(Boolean)
  .join('\n\n'),
      layer: record.fields.Layer,
    }));
  } catch (error) {
    console.error('Error fetching from Airtable:', error);
    return [];
  }
};

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}
