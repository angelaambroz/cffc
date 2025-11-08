require('dotenv').config();
// Using Node.js built-in fetch (available in Node 18+)

module.exports = async function() {
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME;
  const apiKey = process.env.AIRTABLE_API_KEY;
  
  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Transform Airtable records into cleaner format
    return data.records.map(record => ({
      id: record.id,
      slug: slugify(record.fields['Species Name'] || 'unnamed-plant'),
      name: record.fields['Species Name'],
      scientificName: record.fields['Scientific Name'],
      family: record.fields.Family,
      description: record.fields.Description,
      edibleParts: record.fields['Edible Parts'],
      growthHabit: record.fields['Growth Habit'],
      sunRequirements: record.fields['Sun Requirements'],
      waterNeeds: record.fields['Water Needs'],
      location: record.fields['Location in Forest'],
      healthStatus: record.fields['Last Health Status'],
      summary: record.fields['Plant Summary (AI)']?.value
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
