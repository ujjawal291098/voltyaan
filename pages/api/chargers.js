export default async function handler(req, res) {
  try {
    const url = 'https://api.openchargemap.io/v3/poi/?output=json&countrycode=IN&maxresults=50';
    const r = await fetch(url);
    const data = await r.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chargers' });
  }
}
