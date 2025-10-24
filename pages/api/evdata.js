export default async function handler(req, res) {
  try {
    const sheetCSV = 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/gviz/tq?tqx=out:csv';
    const r = await fetch(sheetCSV);
    const text = await r.text();
    const lines = text.trim().split('\n').map(l => l.split(','));
    const header = lines.shift();
    const data = lines.map(row => Object.fromEntries(row.map((c,i)=>[header[i], c])));
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch EV data' });
  }
}
