const axios = require('axios');

// Gemini Location Entity Extraction (dummy logic)
async function extractLocationName(rawLocationDescription) {
  return rawLocationDescription; // You can add Gemini call later
}

// Google Maps Geocoding API
async function getLatLngFromLocation(locationName) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const encoded = encodeURIComponent(locationName);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${apiKey}`;

  const response = await axios.get(url);
  const results = response.data.results;

  if (results.length === 0) throw new Error("Location not found");

  const { lat, lng } = results[0].geometry.location;
  return { lat, lng };
}

// Main function
exports.extractCoordinates = async (rawLocationDescription) => {
  const cleanLocation = await extractLocationName(rawLocationDescription);
  const { lat, lng } = await getLatLngFromLocation(cleanLocation);
  return { type: 'Point', coordinates: [lng, lat] }; // GeoJSON format
};
