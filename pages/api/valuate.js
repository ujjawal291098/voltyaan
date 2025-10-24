import data from '../../data/evModels.json';
export default function handler(req, res) {
  const q = req.query.model || '';
  const found = data.find(m => m.name.toLowerCase().includes(q.toLowerCase())) || data[0];
  const estimatedValue = Math.round((found.price * found.resale) / 100);
  res.status(200).json({
    model: found.name,
    estimatedValue,
    batteryHealth: found.battery,
    analysis: `Based on sample data, ${found.name} retains ~${found.resale}% of its original price.`
  });
}
