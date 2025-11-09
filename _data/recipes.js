require('dotenv').config();
// Using Node.js built-in fetch (available in Node 18+)

module.exports = async function() {
	const apiKey = process.env.AIRTABLE_API_KEY;
	const baseId = process.env.AIRTABLE_BASE_ID;
	const tableName = process.env.RECIPES_TABLE;
	
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
			slug: slugify(record.fields.Name || 'unnamed-recipe'),
			name: record.fields['Recipe Name'],
			description: record.fields.Description,
			ingredients: record.fields.Ingredients,
			estimatedTime: record.fields['Estimated Time (min)'],
			type: record.fields['Recipe Type'],
		}));
	} catch (error) {
		console.error("Error fetching data from Airtable:", error);
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

